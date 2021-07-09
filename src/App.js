import React, { useState } from 'react';
import FileSaver from 'file-saver'
import ReactLoading from "react-loading";
import './App.css';

const BASE_URL = 'https://hr-template-backend.herokuapp.com'
function App() {
  const [employeelist, setEmployeeList] = useState(null)
  const [offerTemplate, setOfferTemplate] = useState(null)
  const [showDownload, setShowDownload] = useState(false)
  const [loading,setLoading] =useState(false)

  const onUpload = () => {
    if (!employeelist) {
      return alert('Please upload employee list')
    } else if (!offerTemplate) {
      return alert('Please upload offer template')
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append('employeelist', employeelist);
      formData.append('offerTemplate', offerTemplate);
      fetch(`${BASE_URL}/import`, {
        method: 'POST',
        body: formData,
        'Content-Type': 'multipart/form-data'
      }).then(()=>{
        setShowDownload(true)
        setLoading(false)
      })
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

  return (
    <div className="App">
      <div className='wrapper'>
        <div>
          <h4>Employee List(Xlsx format only)</h4>
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
          <h4>Offer Template(Docx format only)</h4>
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
     
      {loading ?  <ReactLoading type="spinningBubbles" color="#ADD8E6" width={30} height={30} className='loading'/>
        :'Convert'}
        </button>
      {showDownload ? <>  ========>
        <button onClick={() => onDownload()}>
        {loading ?  <ReactLoading type="spinningBubbles" color="#ADD8E6" width={30} height={30} className='loading'/>
         : 'Download' }
          </button></> : null}


    </div>
  );
}

export default App;
