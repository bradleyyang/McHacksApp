from flask import Flask, request
from flask_restful import Resource, Api, reqparse, abort

import base64

import numpy as np
import pytesseract
import cv2

from flask import render_template
import sqlite3
from flask import request

import mysql.connector
from mysql.connector import Error




app = Flask(__name__)

parser = reqparse.RequestParser()
parser.add_argument('imgSrc', required=True)

receipts = []

class Receipt:
    def __init__(self, name, date, location, price):
        self.name = name
        self.date = date
        self.location = location
        self.price = price

@app.route('/test', methods=['POST'])
def write():
    db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Dermott23!",
    database="mcHacksDB"
)
    
    try:
        cursor = db.cursor()

        query = 'INSERT INTO receipts (name, location, price, date) VALUES (%s, %s, %s, %s)'
        values = ('name', 'location', 'price', 'data')


        cursor.execute(query, values)
        db.commit()
        return("data added successfully")    
    except Error as e:
        db.rollback()
        return("Error")
    finally:
        if db.is_connected():
            cursor.close()
            db.close()


# @app.route('/list')
# def list():
#     # Connect to the SQLite3 database and 
#     # SELECT rowid and all Rows from the receipts table.
    
#     con = sqlite3.connect("database.db")
#     con.row_factory = sqlite3.Row

#     cur = con.cursor()
#     cur.execute("SELECT rowid, * FROM receipts")

#     rows = cur.fetchall()
#     con.close()
#     # Send the results of the SELECT to the result.html page
#     return render_template("result.html",rows=rows)

# @app.route("/addrec", methods = ['POST', 'GET'])
# def addrec():
#     # Data will be available from POST submitted by the form
#     if request.method == 'POST':
#         try:
            
#             # Connect to SQLite3 database and execute the INSERT
#             with sqlite3.connect('database.db') as con:
#                 cur = con.cursor()
#                 cur.execute("INSERT INTO receipts (name TEXT, location TEXT, price TEXT, date TEXT) VALUES (?,?,?,?)",("1", "2", "3", "4"))

#                 con.commit()
#                 msg = "Record successfully added to database"
#         except:
#             con.rollback()
#             msg = "Error in the INSERT"

#         finally:
#             con.close()
#             # Send the transaction message to result.html
#             return render_template('result.html',msg=msg)

@app.route("/get-receipts")
def getReceipts():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Dermott23!",
        database="mcHacksDB"
        )
    
    cursor = db.cursor()

        
        
    cursor.execute("SELECT * FROM receipts") 
    data = cursor.fetchall() 
    cursor.close()
    return data


@app.route("/upload", methods=['POST'])
def uploadSnapshot():
    data = request.json

    if data:
        imgData = data['imgData']

        decodedImg = base64.b64decode(imgData.split(',')[1])
        filename = 'temp.png'  
        with open(filename, 'wb') as f:
            f.write(decodedImg)
        
        image = cv2.imread('temp.png', cv2.IMREAD_GRAYSCALE) 
        image = cv2.resize(image, None, fx=1.2, fy=1.2, interpolation=cv2.INTER_CUBIC)
        kernel = np.ones((1, 1), np.uint8)
        image = cv2.dilate(image, kernel, iterations=1)
        image = cv2.erode(image, kernel, iterations=1)    
        cv2.threshold(cv2.bilateralFilter(image, 5, 75, 75), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
      
        detectedText = pytesseract.image_to_string(image)
        print(detectedText)

        def word_list(detectedText):
            cleaned_text = detectedText.replace('\n', '')
            word_list = cleaned_text.split(' ')
            return word_list 
        
        print(word_list(detectedText))

        def find_prices(word_list):
            list_prices = []
            for i in range(len(word_list)):
                if word_list[i][0] == '$':
                    if len(word_list[i]) == 1:
                        if i > 0 and word_list[i - 1][0].isdigit():
                            list_prices.append(word_list[i - 1])
                        elif i < len(word_list) - 1 and word_list[i + 1][0].isdigit():
                            list_prices.append(word_list[i + 1])
                    else:
                        list_prices.append(word_list[i][1:])
                elif word_list[i][-1] == '$':
                    list_prices.append(word_list[i][:-1])
            return list_prices

        def total_price(list_prices):
            try:
                return max(list_prices)
            except:
                return None

        def find_date(word_list):
            for i in range(len(word_list)):
                print(word_list[i])
                if len(word_list[i]) == 4 and word_list[i][0:3] == "202":
                    return word_list[i - 2] + ' ' + word_list[i - 1] + ' ' + word_list[i]
                    break
            return ''
        
        def line_list(detectedText):
            line_list = detectedText.split('\n')
            return line_list

        print(line_list(detectedText))
        
        def find_location(line_list):
            for i in range(len(line_list)):
                if line_list[i] == '':
                    continue
                else:
                    if line_list[i][0].isdigit():
                        return line_list[i]
                        break
                
        total = total_price(find_prices(word_list(detectedText)))
        location = find_location(line_list(detectedText))
        name = 'placeholder'
        date = find_date(word_list(detectedText))

        if total is None:
            total = 'No match'
        if location is None:
            location = 'No match'
        if date is None:
            date = 'no match'


        print(total)

        print(date)
        print(location)
        newReceipt = Receipt(name, date, location, total)

        db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Dermott23!",
        database="mcHacksDB"
            )
    
        try:
            cursor = db.cursor()

            query = 'INSERT INTO receipts (name, location, price, date) VALUES (%s, %s, %s, %s)'
            values = (name, location, total, date)


            cursor.execute(query, values)
            db.commit()
            return("data added successfully")    
        except Error as e:
            db.rollback()
            return("Error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()

        return ''
    
    else:
        return ''


    
        
            
    
    
        



        

        



        # lines = detectedText.split('\n')
        # words = detectedText.split(' ')
        # receipts.append(detectedText)
        
    #     return ""
    
    # return ""

    

@app.route("/data")
def data():
    return receipts

if __name__ == "__main__":
    app.run(debug=True)
