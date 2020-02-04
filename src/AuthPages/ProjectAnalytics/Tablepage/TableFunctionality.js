import React from 'react';

const TableFunctionality = ({tablefunctionality}) => {
    if (tablefunctionality === true) {
        return (
            <div>
             <div className="data-page">
              <div className="text-padding">
               <h2>Table Functionality</h2>
              </div>
             </div>
            </div>
        )
    } else {
        return null;
    }
}

export default TableFunctionality;