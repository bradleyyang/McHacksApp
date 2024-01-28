from flask import Flask, request
from flask_restful import Resource, Api, reqparse, abort

import base64

import numpy as np
import pytesseract
import cv2


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
        # lines = detectedText.split('\n')
        # words = detectedText.split(' ')
        receipts.append(detectedText)
        
        return ""
    
    return ""

    

@app.route("/data")
def data():
    return receipts

if __name__ == "__main__":
    app.run(debug=True)
