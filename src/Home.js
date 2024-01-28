import Webcam from "react-webcam";
// import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./Navbar";

const Home = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch("/data").then(
    //         res => res.json().then(
    //             data => {
    //                 setData(data)
    //                 console.log(data)
    //             }
    //         )
    //     )
    // }, []);

    const [openedWebcam, setOpenedWebcam] = useState(false);
    const [img, setImg] = useState(null);


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

    function WebcamOpen() {
        if (openedWebcam === false) {
            return (
                <div></div>
            );
        } else {
            return (
                <div >

                    <Webcam
                        screenshotFormat="image/png"
                        ref={webcamRef}

                    />
                    <button
                        onClick={photoCapture}
                    >Capture photo</button>
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


    return (
        <div>
            <Navbar />
            <div className="align-middle items-center justify-items-center flex justify-center h-screen flex-col">
                <button
                onClick={
                    () => {
                        fetch("/test", {
                            method: "POST",

                        })
                    }
                }
                >Post test</button>
                <WebcamOpen />
                <button
                    className="rounded-full border-solid w-40 h-12 bg-blue-500 text-white"

                    onClick={
                        () => {
                            if (openedWebcam === true) {
                                setOpenedWebcam(false);
                            } else {
                                setOpenedWebcam(true);
                            }
                        }
                    }>Toggle Webcam</button>
                {/* <input type='file' id="image" /> */}
            </div>
        </div>

    );


}

export default Home;