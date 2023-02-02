import React, { useState } from 'react';
import FileSaver from 'file-saver'
import ReactLoading from "react-loading";
import './App.css';
import ListOfDocuments from './ListOfDocuments'
import Header from './  Header'
import axios from 'axios';


 export const BASE_URL = 'http://localhost:3001/uploadDownload'
//export const BASE_URL = 'https://hr-template-backend.herokuapp.com'
function App() {
  const [employeelist, setEmployeeList] = useState(null)
  const [offerTemplate, setOfferTemplate] = useState(null)
  const [showDownload, setShowDownload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showList, setShowList] = useState(false)


  const onUpload = async () => {
    if (!employeelist) {
      return alert('Please upload employee list')
    } else if (!offerTemplate) {
      return alert('Please upload offer template')
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append('xmlInput', employeelist);
      formData.append('docTemplate', offerTemplate);
      const resp=  await axios.post(`${BASE_URL}`,formData,{responseType:"arraybuffer"})
    
      const blob = new Blob([resp.data], {  type: "application/octet-stream", });
      saveAs(blob, `letter.zip`);
      setLoading(false)
     
     }
  }

  const onDownload = () => {
    setLoading(true)
    fetch(`${BASE_URL}/files`).then(arrayBuffer => {
      arrayBuffer.blob().then(blob => {
        FileSaver.saveAs(blob, `candidate-offers.zip`)
        setLoading(false)
      }
      )
    })
  }

  return <div className="App">
    {!showList ?
      <>
        <Header />
        <div className='wrapper'>

          <div>
            <h4>List to upload(Xlsx format only)</h4>
            <input type="file" className="hidden"
              multiple={false}
              accept=".xlsx"
              onChange={evt => {
                setShowDownload(false)
                setEmployeeList(evt.target.files ? evt.target.files[0] : null)
              }}
            />
          </div>
          <div>
            <h4>Template to convert(Docx format only)</h4>
            <input type="file" className="hidden"
              multiple={false}
              accept=".docx"
              onChange={
                evt => {
                  setShowDownload(false)
                  setOfferTemplate(evt.target.files ? evt.target.files[0] : null)
                }}
            />
          </div>
        </div>

        <button onClick={() => onUpload()}>
          Convert
          {loading ? <ReactLoading type="spinningBubbles" color="#ADD8E6" width={30} height={30} className='loading' />
            : null}
        </button>
        {showDownload ?
          <>  {"========>"}
            <button onClick={() => onDownload()}>Download
              {loading ? <ReactLoading type="spinningBubbles" color="#ADD8E6" width={30} height={30} className='loading' />
                : null}
            </button>
            {/* <div className='anchor' onClick={() => setShowList(true)}>Click here to see list of Documents</div> */}
          </> : null
        }
      </> : <ListOfDocuments />
    }
  </div>
}

export default App
