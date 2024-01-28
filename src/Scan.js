import Webcam from "react-webcam";
// import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./Navbar";
import { VscLoading } from "react-icons/vsc";

const Scan = () => {

    const [openedWebcam, setOpenedWebcam] = useState(false);
    const [img, setImg] = useState(null);

    const [buttonMsg, setButtonMsg] = useState('Scan Receipt');
    const [receiptInputs, setReceiptInputs] = useState(false);


    const webcamRef = useRef(null);
    // const reader = new FileReader();



    const photoCapture = useCallback(() => {
        if (webcamRef.current) {
            const imgSrc = webcamRef.current.getScreenshot();
            setImg(imgSrc);
            // console.log(img);
            // const base64Data = img.split("base64, ")[1];
            console.log(imgSrc);
            console.log(imgSrc.split(','));

            fetch("/upload", {
                method: "POST",
                body: JSON.stringify({
                    'imgData': imgSrc
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // setReceiptInputs(true);
        }
        // reader.addEventListener("load", () => {
        //     console.log(reader.result);
        // })
        // reader.readAsDataURL(img);




    }, [webcamRef]);

    function WebcamOpen() {  

        if (openedWebcam === false) {
            return (
                <div className="flex-col flex align-middle items-center">
           
                </div>
            );
        } else {
            return (
                <div className="flex flex-col justify-center gap-4 items-center">

                    <Webcam
                        className="rounded-3xl"
                        screenshotFormat="image/png"
                        ref={webcamRef}

                    />
                    <button
                        className="rounded-full border-solid w-40 h-12 text-purple-400 bg-white"
                        onClick={photoCapture}
                    >Take Snapshot</button>
                </div>


            );
        }
    }



    // const ReceiptValues = () => {
    //     const [index, setIndex] = useState();
    //     const [latest, setLatest] = useState();
    //     const [loading, setLoading] = useState(true);


    //     const [price, setPrice] = useState();
    //     const [name, setName] = useState();
    //     const [location, setLocation] = useState();
    //     const [date, setDate] = useState();

    //     function handleRetake() {
    //         setReceiptInputs(false);
    //         setOpenedWebcam(false);
    //         setButtonMsg("Scan Receipt");
    //         fetch("/delete/" + String(index), {
    //             method: "DELETE"

    //         })
    //     }

    //     // useEffect(() => {
    //     //     async function fetchData() {
    //     //         try {
    //     //             const latestResponse = await fetch("/get-latest");
    //     //             const latestData = await latestResponse.json();
    //     //             console.log("latest: " + latestData);
    //     //             setIndex(String(latestData));
                    
    //     //             const receiptResponse = await fetch(`/get-receipt/${latestData}`);
    //     //             const receiptData = await receiptResponse.json();
    //     //             setLatest(receiptData);
    //     //             setLoading(false);
    //     //             console.log("DATA:");
    //     //             console.log(receiptData);
        
    //     //             if (receiptData != null && receiptData !== undefined) {
    //     //                 setPrice(receiptData[3]);
    //     //                 setDate(receiptData[4]);
    //     //                 setLocation(receiptData[2]);
    //     //                 setName(receiptData[1]);
    //     //             }
    //     //         } catch (error) {
    //     //             console.error('Error fetching data:', error);
    //     //             setLoading(false);
    //     //         }
    //     //     }
        
    //     //     fetchData();
    //     // }, []);
            

    //     function handleSubmit() {
    //         fetch("/update-receipt/" + String(index), {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 'id': index,
    //                 'name': name,
    //                 'location': location,
    //                 'price': price,
    //                 'date': date
    //             }),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //     }

    //     if (loading) {
    //         return <VscLoading className="animate-spin h-5 w-5 mr-3" />;
    //     }

    //     if (latest) {
    //         <div>
    //                 <p>Here's what we got:</p>
    //                 <label htmlFor="price">
    //                     <input type="text" name="price" id="price" placeholder={latest[3]} onChange={val => {
    //                         setPrice(val)
    //                     }} />
    //                 </label>
    //                 <label htmlFor="name">
    //                     <input type="text" name="name" id="name" placeholder={latest[1]} onChange={val => {
    //                         setName(val)
    //                     }} />
    //                 </label>
    //                 <label htmlFor="location">
    //                     <input type="text" name="location" id="location" placeholder={latest[2]} onChange={val => {
    //                         setLocation(val)
    //                     }} />
    //                 </label>
    //                 <label htmlFor="date">
    //                     <input type="text" name="date" id="date" placeholder={latest[5]} onChange={val => {
    //                         setDate(val)
    //                     }} />
    //                 </label>
    //                 <button className="rounded-full border-solid w-40 h-12 text-blue-500 bg-white" onClick={handleSubmit}>
    //                     Submit Expense
    //                 </button>
    //                 <button className="rounded-full border-solid w-40 h-12 bg-blue-500 text-white" onClick={handleRetake}>
    //                     Retake Photo
    //                 </button>
    //             </div>
    //     }
        
        
    // }

    // if (receiptInputs) {
    //     return (
    //         <div className="page-setup">
    //             <Navbar />
    //             <ReceiptValues />
    //         </div>
    //     );
    // } else {
        return (
            <div className="page-setup">
                <Navbar />
                <div className="align-middle items-center justify-items-center flex justify-center h-screen flex-col">
                    <WebcamOpen />
                    <button
                        className="rounded-full border-solid w-40 h-12 bg-purple-400 text-white"

                        onClick={
                            () => {
                                if (openedWebcam === true) {
                                    setOpenedWebcam(false);
                                    setButtonMsg("Scan Receipt")
                                } else {
                                    setOpenedWebcam(true);
                                    setButtonMsg("Exit");
                                }
                            }
                        }>{buttonMsg}</button>
                    {/* <input type='file' id="image" /> */}
                </div>
            </div>

        );
    }






export default Scan;