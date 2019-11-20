import React,{useState , useEffect, useRef} from 'react';
import AnalyticNav from './Analyticcomps/Analyticnav';

const LoadingData = ({loading}) => {
    if (loading === true) {
        return (
            <div>
             <h5 className="text-center">LOADING</h5>
            </div>
        )
    } else {
        return null;
    }
}

const TableDetails = ({tabledetails}) => {
    if (tabledetails === true) {
        return (
            <div>
             <div className="data-page">
              <div className="text-padding">
                <h2>Data Analytics</h2>
              </div>
             </div>
            </div>
        )
    } else {
        return null;
    }
}

const Functionality = ({functionality}) => {
    if (functionality === true) {
        return (
            <div>
             <div className="data-page">
              <div className="text-padding">
                <h2>Functionality</h2>
              </div>
             </div>
            </div>
        )
    } else {
        return null
    }
}


const TablePage = (props) => {
    const [tableresponse, setTableResponse] = useState({
        tableresponse: {}
    })
    const [tabledata, setTableData] = useState({
        tabledata: true
    })
    const [functionality, setFunctionality] = useState({
        functionality: false
    })
    const [tabledetails, setTableDetails] = useState({
        tabledetails: false
    })
    const [loading, setLoading] = useState({
        loading: false
    })
    const [renderPage, setRenderPage] = useState({
        renderPage: true
    })

    useEffect(() => {
     if (renderPage.renderPage === true) {
        fetch(`/data/gettablepagedata/${props.match.params.projectapi}/${props.match.params.tableapi}`)
        .then((res) => {
            return res.json();
        }).then((body) => {
            console.log(body);
            setTableResponse({
                tableresponse: body
            })
        }).catch((error) => {
            console.error(error)
        })
     }
    }, [renderPage.renderPage ,props.match.params.projectapi, props.match.params.tableapi])

    const TableData = ({tabledata, data, array }) => {
        const [loading, setLoading] = useState({
            loading: true
        })
        const [dataRenders, setDataRenders] = useState({
            dataRenders: false
        })
        const [currentItem, setCurrentItem] = useState({
            currentItem: {}
        })
        const [itemModal, setItemModal] = useState({
            itemModal: false
        })
    
        const componentDidMount = useRef(null);
    
        useEffect(() => {
        componentDidMount.current = true;
        if (tabledata === true) {
         if (componentDidMount.current) {
            setTimeout(() => {
                setLoading({
                    loading: false
                })
                setDataRenders({
                    dataRenders: true
                })
                console.log(data);
            }, 500);
         }
        }
    
        return () => {componentDidMount.current = null}
       } , [tabledata, data])

       const NullifiedData = (current) => {
        if (current === null || current === undefined) {
            return "null"
        } else {
            return current
        }
    }
    
       const CurrentItemModal = ({currentModal, item, arrayItem}) => {
           let itemedits = {};
           console.log(item);
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
                           <button className="button-red">DELETE TABLE ITEM</button>
                         </div>
                         <button className="button-purple" onClick={() => {
                             console.log(itemedits)
                             
                             fetch('/analytics/table/editTableData/' + props.match.params.projectapi + '/' + props.match.params.tableapi + '/' + item.reponseid, {
                                 method: 'POST',
                                 headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                 },
                                 body: JSON.stringify(itemedits)
                             }).then((res) => {
                                return res.json();
                             }).then((body) => {
                                 console.log(body);
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
    
       const Data = ({showdata}) => {
        if (showdata === true) {
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
        } else {
            return null;
        }
       }
    
        if (tabledata === true) {
            return (
                <div>
                 <div className="data-page">
                  <div className="text-padding">
                   <h2>Table Data</h2>
                  </div>
                  <LoadingData loading={loading.loading} />
                  <Data showdata={dataRenders.dataRenders} />
                  <CurrentItemModal currentModal={itemModal.itemModal} item={currentItem.currentItem} arrayItem={array} />
                 </div>
                </div>
            )
        } else {
            return null;
        }
    }


    const RenderedPage = ({render}) => {
        if (render === true) {
            return (
                <div>
                <TableData tabledata={tabledata.tabledata} data={tableresponse.tableresponse.tabledata} array={tableresponse.tableresponse.tablelabels} />
                <Functionality functionality={functionality.functionality} />
                <TableDetails tabledetails={tabledetails.tabledetails} />
                </div>
            )
        } else {
            return null;
        }
    }

    return (
        <div>
         <AnalyticNav navtitle={tableresponse.tableresponse.projectname} projectapi={props.match.params.projectapi} />
         <div className="data-whole-page">
         <div className="data-nav">
         <div className="data-title">
          <div className="text-padding">
            <h3>{tableresponse.tableresponse.tablename}</h3>
            <div className="nav-comp-container">
             <h6 onClick={() => {
                setTableData({
                    tabledata: true
                })
                setFunctionality({
                    functionality: false
                })
                setTableDetails({
                    tabledetails: false
                })
             }}>DATA</h6>
            </div>
            <div className="nav-comp-container">
             <h6 onClick={() => {
                  setTableData({
                    tabledata: false
                })
                setFunctionality({
                    functionality: false
                })
                setTableDetails({
                    tabledetails: true
                })
             }}>DETAILS</h6>
            </div>
            <div className="nav-comp-container">
             <h6>USUAGE</h6>
            </div>
            <div className="nav-comp-container">
             <h6 onClick={() => {
                 setTableData({
                    tabledata: false
                })
                setFunctionality({
                    functionality: true
                })
                setTableDetails({
                    tabledetails: false
                })
             }}>FUNCTIONALITY</h6>
            </div>
          </div>
          </div>
         </div>
         <div className="data-page">
          <div>
            <div className="float-right">
              <button className="button-purple" onClick={() => {
                  setLoading({
                      loading: true
                  })
                  setRenderPage({
                      renderPage: false
                  })
                  setTimeout(() => {
                    setLoading({
                        loading: false
                    })
                    setRenderPage({
                        renderPage: true
                    })
                  }, 1000);
              }}>REFRESH</button>
            </div>
            <LoadingData loading={loading.loading} />
            <RenderedPage render={renderPage.renderPage} />
          </div>
         </div>
         </div>
        </div>
    )
}

export default TablePage