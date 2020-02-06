import React, {useState} from 'react';
import axios from 'axios';
const TableData = ({tabledata, data, array, projectapi, tableapi }) => {
    const [currentItem, setCurrentItem] = useState({
        currentItem: {}
    })
    const [itemModal, setItemModal] = useState({
        itemModal: false
    })
    const [datatable, setDataTable] = useState({
        data: []
    })
    const [credentialModal, setCredentialModal] = useState({
        credentialModal: false
    })

   const NullifiedData = (current) => {
    if (current === null || current === undefined) {
        return "null"
    } else {
        return current
    }
  }


   const CurrentItemModal = ({currentModal, item, arrayItem}) => {
       let itemedits = {};
       if (currentModal === true) {
           return (
               <div>
                 <div className="modal-page">
                  <div className="container">
                   <div className="modal-padding">
                    <div className="modal-box">
                     <span className="closebtndark" onClick={() => {
                         setItemModal({
                             itemModal: false
                         })
                     }}>&times;</span>
                     <h4>Current Table Item</h4>
                     <div className="input-container">
                      <table className="table-data">
                        <tbody>
                          <tr className="table-data-headers">
                            {
                                arrayItem.map((indice) => (
                                    <th className="table-header" key={arrayItem.indexOf(indice)}>{indice}</th>
                                ))
                            }
                          </tr>
                          <tr className="table-row">
                            {
                                arrayItem.map((index) => (
                                    <td className="table-item" key={arrayItem.indexOf(index)}>{NullifiedData(item.response[index])}</td>
                                ))
                            }
                          </tr>
                        </tbody>
                      </table>
                     </div>
                     <div className="input-container">
                      <div className="row">
                       {
                           arrayItem.map((item) => (
                             <div className="comp-container" key={arrayItem.indexOf(item)}>
                                <input type="text" className="input-bar" placeholder={item} onChange={(e) => {
                                    itemedits[item] = e.target.value
                                }} />
                             </div>
                           ))
                       }
                      </div>
                     </div>
                     <div className="float-right">
                       <button className="button-red" onClick={() => {
                           axios.post('https://jpi-backend.herokuapp.com/analytics/table/deletetableitem/' + projectapi + '/' + tableapi, item,{
                               headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                               },
                          }).then((body) => {
                             console.log(body);
                             setDataTable({
                                 data: body.data
                             })
                          }).catch((error) => {
                               console.log(error)
                           })
                       }}>DELETE TABLE ITEM</button>
                     </div>
                     <button className="button-purple" onClick={() => {                             
                         axios.post('https://jpi-backend.herokuapp.com/analytics/table/editTableData/' + projectapi + '/' + tableapi + '/' + item.reponseid, itemedits,{
                             headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                             },
                         }).then((body) => {
                             let checker = null;
                             for (const index of datatable.data) {
                                 if (index.reponseid === body.data.reponseid) {
                                    checker = datatable.data.indexOf(index);
                                 }
                             }
                             if (~checker) {
                                 datatable.data[checker] = body.data
                             }

                             setDataTable({
                                 data: datatable.data
                             })
                             setItemModal({
                                 itemModal: false
                             })
                         }).catch((error) => {
                             console.log(error);
                         })
                     }}>EDIT TABLE ITEM</button>
                    </div>
                   </div>
                  </div>
                 </div>  
               </div>
           )
       } else {
           return null;
       }
   }

   const Data = () => {
    const [datamodal, setDataModal] = useState({
        datamodal: false
    })
    const DataModal = ({datamodal}) => {
        const items = {};
        if (datamodal === true) {
            return (
               <div>
                 <div className="modal-page">
                  <div className="container">
                    <div className="modal-padding">
                     <div className="modal-box">
                      <span className="closebtndark" onClick={() => {
                          setDataModal({
                              datamodal: false
                          })
                      }}>&times;</span>
                      <h3>ADD DATA</h3>
                      {
                          array.map((item) => (
                              <div key={array.indexOf(item)}>
                                <div className="input-container">
                                 <input type="text" className="input-bar" placeholder={item} onChange={(e) => {
                                     items[item] = e.target.value
                                 }} /> 
                                </div>
                              </div>
                          ))
                      }
                      <div className="button-padding">
                       <button className="button-purple" onClick={() => {
                           axios.post('https://jpi-backend.herokuapp.com/analytics/table/addentry/' + projectapi + '/' + tableapi , items,{
                               headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                               },
                           }).then((body) => {
                              console.log(body)
                              datatable.data.push(body.data);
                              setDataTable({
                                  data: datatable.data
                              })
                           }).catch((error) => {
                               console.log(error);
                           })

                       }}>ADD DATA</button>
                      </div>
                     </div>
                    </div>
                  </div>
                 </div>
               </div>
            )
        } else {
            return null;
        }
    }

    const DataFiles = () => {
        if (data.length === 0) {
            return (
                <div>
                 <div className="empty-table-container">
                  <h2>You have no data just yet</h2>
                 </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="table-container">
                    <table className="table-data">
                        <tbody>
                            <tr className="table-data-headers">
                                {
                                array.map((item) => (
                                    <th className="table-header" key={array.indexOf(item)}>{item}</th>
                                ))
                                }
                            </tr>
                            {
                                data.map((item) => (
                                    <tr className="table-row" key={data.indexOf(item)} onClick={() => {
                                        setCurrentItem({
                                            currentItem: item
                                        })
                                        setItemModal({
                                            itemModal: true
                                        })
                                    }}>
                                    {
                                        array.map((index) => (
                                            <td className="table-item" key={array.indexOf(index)}>{NullifiedData(NullifiedData(item.response)[index])}</td>
                                        ))
                                    }
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }

    const SetCredentials = ({setCreds}) => {
        const [addedLabels, setLabels] = useState({
            addedLabels: []
        })
        if (setCreds === true) {
            return (
                <div>
                 <div className="modal-page">
                  <div className="container">
                    <div className="modal-padding">
                     <div className="modal-box">
                     <span className="closebtndark" onClick={() => {
                         setCredentialModal({
                             credentialModal: false
                         })
                     }}>&times;</span>
                     <h3>SET DATA CREDENTIALS</h3>
                     <h5>Embedded Labels</h5>
                     <h6>JPI sets labels for your such as.</h6>
                     <div className="input-container">
                      <input type="text" className="input-bar" onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            addedLabels.addedLabels.push(e.target.value)
                            setLabels({
                                addedLabels: addedLabels.addedLabels
                            })
                            e.target.value = ""
                          }
                      }} />
                     </div>
                      {
                          addedLabels.addedLabels.map((item) => (
                          <li key={addedLabels.addedLabels.indexOf(item)}>{item}</li>
                          ))
                      }
                      <div className="button-padding">
                        <button className="button-purple" onClick={() => {
                            const data = {labels: addedLabels.addedLabels}
                            axios.post('https://jpi-backend.herokuapp.com/analytics/table/setcredlabels/' + projectapi + '/' + tableapi, data,{
                                headers:{ 
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json' 
                                },
                            }).then((body) => {
                                array = body.data;
                                setCredentialModal({
                                    credentialModal: false
                                })
                            }).catch((error) => {
                                console.log(error);
                            })
                        }}>SET CREDENTIALS</button>
                      </div>
                     </div>
                    </div>
                  </div>
                 </div>
                </div>
            )
        } else {
            return null;
        }
    }

    const StatusBtn = () => {
        if (array.length === 0) {
            return (
                <div>
                 <button className="button-white" onClick={() => {
                     setCredentialModal({
                         credentialModal: true
                     })
                 }}>SET CREDENTIALS</button>
                </div>
            )
        } else {
            return (
                <div>
                <button className="button-purple" onClick={() => {
                    setDataModal({
                        datamodal: true
                    })
                }}>ADD DATA</button>
                </div>
            )
        }
    }

    return (
         <div>
          <div className="float-right">
           <StatusBtn/>
          </div>
          <div className="text-padding">
            <h2>Table Data</h2>
          </div>
          <SetCredentials setCreds={credentialModal.credentialModal}/>
          <DataFiles/>
          <DataModal datamodal={datamodal.datamodal} />
         </div>
        )
    }

    if (tabledata === true) {
        return (
            <div>
             <div className="data-page">
              <Data />
              <CurrentItemModal currentModal={itemModal.itemModal} item={currentItem.currentItem} arrayItem={array} />
             </div>
            </div>
        )
    } else {
        return null;
    }
}

export default TableData;