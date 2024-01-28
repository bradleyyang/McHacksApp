import { useState, useEffect } from "react";
import Receipt from "./Receipt";
import Navbar from "./Navbar";

const Home = () => {
    const [receiptList, setReceiptList] = useState([]);

    useEffect(() => {
        fetch("/get-receipts").then(
            res => res.json().then(
                data => {
                    setReceiptList(data)
                    console.log(data)
                }
            )
        )
    }, []);

    const Receipts = () => {
        return (
            <div className="overflow-y-scroll  h-screen snap-y flex flex-col gap-8 p-4">
                {receiptList.map((r) => (
                    <Receipt key={r.id} receipt={r} />
                ))}
            </div>
        );
    }

    return (
        <div className="page-setup">
            <Navbar />
            <div>
                <Receipts />
            </div>
            
        </div>
    );
}

export default Home;