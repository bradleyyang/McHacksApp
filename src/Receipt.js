import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

import { useState } from "react";


const Receipt = ({key, receipt}) => {

    const [remove, setRemove] = useState(false);

    function deleteReceipt() {
        fetch(`/delete/${receipt[0]}`, {
            method: 'DELETE'
        })
        setRemove(true)

    }

    if (remove) {
        return(
            <div>

            </div>
        );
    } else {
        return ( 
            <div className="receipt overflow-visible relative h-screen">
                <p>{receipt[1]}</p>
                <p>{receipt[2]}</p>
                <br />
                <p>${receipt[3]}</p>
                <p>{receipt[4]}</p>
                <LuPencil size={42} className=" bottom-3 right-16 mr-1 absolute hover:scale-105 transition-all duration-150 cursor-pointer" />
                <FaRegTrashAlt size={40} className="bottom-4 right-4 absolute hover:scale-105 transition-all duration-150 cursor-pointer" onClick={deleteReceipt}/>
            </div>
         );
    }
    
    
}
 
export default Receipt;