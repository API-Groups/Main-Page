import React,{useState , useEffect, useRef} from 'react';
import AnalyticNav from './Analyticcomps/Analyticnav';
import TableData from './Tablepage/TableData';
import TableDetails from './Tablepage/TableDetails';
import TableFunctionality from './Tablepage/TableFunctionality';
import TableUsuage from './Tablepage/TableUsuage';
import LoadingWholePageLight from '../../MiscComps/Wholeloadinglightblue';
import LoadingData from './Analyticcomps/LoadingData';
import axios from 'axios';
const TablePage = (props) => {
    const [tableresponse, setTableResponse] = useState({
        tableresponse: {}
    })
    const [datatable, setDataTable] = useState({
        datatable: []
    })
    const [tabledata, setTableData] = useState({
        tabledata: true
    })
    const [functionality, setFunctionality] = useState({
        functionality: false
    })
    const [usuage, setUsage] = useState({
        usuage: false
    })
    const [tabledetails, setTableDetails] = useState({
        tabledetails: false
    })
    const [loading, setLoading] = useState({
        loading: true
    })
    const [componentLoading, setComponentLoading] = useState({
        componentLoading: false
    })
    const [renderPage, setRenderPage] = useState({
        renderPage: false
    })
    const mounted = useRef(null);
    useEffect(() => {
     mounted.current = true;
      if (mounted.current) {
            setTimeout(() => {
            axios.get(`https://jpi-backend.herokuapp.com/data/gettablepagedata/${props.match.params.projectapi}/${props.match.params.tableapi}`)
            .then((body) => {
                setTableResponse({
                    tableresponse: body.data
                })
                setDataTable({
                    data: body.data.tabledata
                })
                setLoading({
                    loading: false
                })
                setRenderPage({
                    renderPage: true
                })
            }).catch((error) => {
                console.error(error)
            })
            }, 1000);
     }

     return () => {mounted.current = false}
     
    }, [renderPage.renderPage ,props.match.params.projectapi, props.match.params.tableapi])

    const RenderedPage = ({render}) => {
        if (render === true) {
            return (
                <div>
                <TableData tabledata={tabledata.tabledata} data={datatable.data} array={tableresponse.tableresponse.tablelabels} projectapi={props.match.params.projectapi} tableapi={props.match.params.tableapi} />
                <TableDetails tabledetails={tabledetails.tabledetails} details={tableresponse.tableresponse} />
                <TableFunctionality tablefunctionality={functionality.functionality} />
                <TableUsuage tableusuage={usuage.usuage} />
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
            <button className="button-white" onClick={() => {
                  setComponentLoading({
                      componentLoading: true
                  })
                  setRenderPage({
                      renderPage: false
                  })
                  setTimeout(() => {
                    setComponentLoading({
                        componentLoading: false
                    })
                    setRenderPage({
                        renderPage: true
                    })
                  }, 1000);
              }}>REFRESH</button>
            </div>
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
                setUsage({
                    usuage: false
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
                setUsage({
                    usuage: false
                })
             }}>DETAILS</h6>
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
                    tabledetails: false
                })
                setUsage({
                    usuage: true
                })
             }}>USUAGE</h6>
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
                setUsage({
                    usuage: false
                })
             }}>FUNCTIONALITY</h6>
            </div>
          </div>
          </div>
         </div>
         <div className="data-page">
            <LoadingData loading={componentLoading.componentLoading} />
            <LoadingWholePageLight loadingprocess={loading.loading} title={"FETCHING TABLE DATA"} />
            <RenderedPage render={renderPage.renderPage} />
         </div>
         </div>
        </div>
    )
}

export default TablePage