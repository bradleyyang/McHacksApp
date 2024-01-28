import { useState, useEffect } from "react";

const ReceiptInputs = () => {
    const [index, setIndex] = useState();
    const [latest, setLatest] = useState();
    

    useEffect(() => {
        fetch("/get-latest").then(
            res => res.json().then(
                data => {
                    setIndex(data)
                    console.log(data)
                }
            )
        )
        fetch("/get-receipt/" + String(index)).then(
            res => res.json().then(
                data => {
                    setLatest(data)
                    console.log(data)
                }
            )
        )
    });


    return ( 
        <div>
            <p>Here's what we got:</p>
            <label htmlFor="price">
                <input type="text" name="price" id="price" placeholder={latest[3]}/>
            </label>
            <label htmlFor="name">
                <input type="text" name="name" id="name" placeholder={latest[1]}/>
            </label>
            <label htmlFor="location">
                <input type="text" name="location" id="location" placeholder={latest[2]}/>
            </label>
            <label htmlFor="date">
                <input type="text" name="date" id="date" placeholder={latest[5]}/>
            </label>
            <button className="rounded-full border-solid w-40 h-12 text-blue-500 bg-white">
                Submit Expense
            </button>
            <button className="rounded-full border-solid w-40 h-12 bg-blue-500 text-white">
                Retake Photo
            </button>
        </div>
     );
}

export default ReceiptInputs;