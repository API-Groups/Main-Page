import React from 'react';

const TableUsuage = ({tableusuage}) => {
    if (tableusuage === true) {
        return (
            <div>
             <div className="data-page">
              <div className="text-padding">
               <h2>Table Usuage</h2>
              </div>
             </div>
            </div>
        )
    } else {
        return null
    }
}

export default TableUsuage;