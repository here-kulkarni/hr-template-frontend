import React, { useState } from 'react';
import FileSaver from 'file-saver'
import ReactLoading from "react-loading";
import './App.css';
import ListOfDocuments from './ListOfDocuments'
import Header from './  Header'

//export const BASE_URL = 'http://localhost:3001'
export const BASE_URL = 'https://hr-template-backend.herokuapp.com'
function App() {
  const [employeelist, setEmployeeList] = useState(null)
  const [offerTemplate, setOfferTemplate] = useState(null)
  const [showDownload, setShowDownload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showList, setShowList] = useState(false)

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
      }).then(async (resp) => {
        if (resp.status === 200) {
          setShowDownload(true)
          setLoading(false)
        }
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

  return <div className="App">
    {!showList ?
      <>
        <Header />
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
          Convert
          {loading ? <ReactLoading type="spinningBubbles" color="#ADD8E6" width={30} height={30} className='loading' />
            : null}
        </button>
        {showDownload ?
          <>  ========>
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
