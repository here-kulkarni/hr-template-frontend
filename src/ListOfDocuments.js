import React, { useEffect, useState } from 'react';
import { BASE_URL } from './App'

const ListOfDocuments = () => {
    const [listOfDoc, setListOfDoc] = useState([])
    useEffect(() => {
        fetch(`${BASE_URL}/list`).then(async (res) => {
            const response = await res.json()
            console.log(response)
            setListOfDoc([...response,...response])
        })
    }, [])
    return <div></div>
    // return <div className='doclist'>{listOfDoc ? listOfDoc.map(doc => {
    //         return <div className='docs' onClick={()=>{
    //             window.open(`${BASE_URL}/files/${doc}`);
    //         }}>{doc}</div>
    //     }): null}
    //     </div>
   
}
export default ListOfDocuments