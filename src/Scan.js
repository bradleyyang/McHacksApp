import Webcam from "react-webcam";
// import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./Navbar";

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
        }
        // reader.addEventListener("load", () => {
        //     console.log(reader.result);
        // })
        // reader.readAsDataURL(img);




    }, [webcamRef]);

    function handleUpload() {
        
    }

    function WebcamOpen() {
        if (openedWebcam === false) {
            return (
                <div className="flex-col flex align-middle items-center">
                    <input type="file" name="" id="" className="flex flex-col" onChange={handleUpload} accept="image/jpeg, image/jpg, image/png"/>
                    <p>Or</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col justify-center gap-4 items-center mb-4">

                    <Webcam
                        className="rounded-3xl"
                        screenshotFormat="image/png"
                        ref={webcamRef}

                    />
                    <button 
                    className="rounded-full border-solid w-40 h-12 text-blue-500 bg-white"
                    onClick={photoCapture}
                    >Take Snapshot</button>
                </div>


            );
        }
    }

    // const imageUpload = document.getElementById('image');

    // imageUpload.addEventListener('change', e => {
    //     const file = imageUpload.files[0];
    //     const reader = new FileReader();

    //     reader.addEventListener('load', ()=> {
    //         console.log(reader.result);
    //     });

    //     reader.readAsDataURL(file);
    // })

    if (receiptInputs) {
        return(
            <div className="page-setup">
                <Navbar />

            </div>
        );
    } else {
        return (
            <div className="page-setup">
                <Navbar />
                <div className="align-middle items-center justify-items-center flex justify-center h-screen flex-col">
                    <WebcamOpen />
                    <button
                        className="rounded-full border-solid w-40 h-12 bg-blue-500 text-white"
    
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

    


}

export default Scan;