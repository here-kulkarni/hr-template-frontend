import React, { useState } from 'react';
import FileSaver from 'file-saver'
import './App.css';

const BASE_URL = 'http://localhost:3001'
function App() {
  const [employeelist, setEmployeeList] = useState(null)
  const [offerTemplate, setOfferTemplate] = useState(null)
  const [showDownload, setShowDownload] = useState(false)

  const onUpload = () => {
    if (!employeelist) {
      return alert('Please upload employee list')
    } else if (!offerTemplate) {
      return alert('Please upload offer template')
    } else {
      setShowDownload(true)
      const formData = new FormData();
      formData.append('employeelist', employeelist);
      formData.append('offerTemplate', offerTemplate);
      fetch(`${BASE_URL}/import`, {
        method: 'POST',
        body: formData,
        'Content-Type': 'multipart/form-data'
      })
    }
  }

  const onDownload = () => {
    fetch(`${BASE_URL}/files`).then(arrayBuffer => {
      arrayBuffer.blob().then(blob => {
        FileSaver.saveAs(blob, `candidate-offers.zip`)
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

      <button onClick={() => onUpload()}>Convert</button>
      {showDownload ? <>  ========>
        <button onClick={() => onDownload()}>Download</button></> : null}


    </div>
  );
}

export default App;
