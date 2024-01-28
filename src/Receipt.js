const Receipt = ({key, receipt}) => {
    
    return ( 
        <div className="receipt overflow-visible">
            <p>{receipt[1]}</p>
            <p>{receipt[2]}</p>
            <p>{receipt[3]}</p>
            <p>{receipt[4]}</p>
        </div>
     );
}
 
export default Receipt;