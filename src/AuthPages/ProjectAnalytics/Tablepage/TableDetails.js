import React from 'react';

const TableDetails = ({tabledetails, details}) => {
    const StringLabels = () => {
        let result = '';
        for (const item of details.tablelabels) {
            if (details.tablelabels.indexOf(item) === details.tablelabels.length - 1) {
                result += item
            }
             
            result += item + ", "
        }
        return result
    }
    if (tabledetails === true) {
        return (
            <div>
             <div className="data-page">
              <div className="text-padding">
                <h2>Table Details</h2>
              </div>
              <div className="row">
                <div className="col-md-4">
                    <div className="details-container">
                        <h4><b>Data Labels</b></h4>
                        <StringLabels/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="details-container">
                        <h4><b>Data Size</b></h4>
                        <h6>{details.tabledata.length}</h6>
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

export default TableDetails;