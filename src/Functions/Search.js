import React,{useState, useEffect} from 'react';
import {generateId} from './Miscfuncs'
import MinimizeText from './MinimizeText'

const Search = ({
    inputstyle,
    renderstyle,
    output,
    BTN,
    callback,
    BTNStyle,
    BTNTitle,
    placeholder,
    variable,
    longRender
}) => {
    const [map, setMap] = useState({
        map: []
    })
    const [longrender, setLongRender] = useState({
      longRender: ""
    })
    const [columncard, setColumnCard] = useState({
      columncard: ""
    })

    useEffect(() => {
        setMap({
            map: variable
        })
        if (longRender === false ||longRender === null) {
          setLongRender({
            longRender: "row"
          })
          setColumnCard({
            columncard: "columncard"
          })
        } else if (longRender === true) {
          setLongRender({
            longRender: "null"
          })
          setColumnCard({
            columncard: ""
          })
        }
    }, [longRender, variable])


    const Render = () => {
      const [suggestions, setSuggestions] = useState({
        suggestions: []
    })
    

    const CreatedSuggestions = ({currentrender}) => {
      if (output.length === 1) {
        return (
          <div className="card-spacing">
            <div className={renderstyle} onClick={() => {
                callback(currentrender)
            }}>
             <h6 className="text-center">{MinimizeText(currentrender[output[0]] , 14)}</h6>
            </div>
          </div>
        )
      } else if (output.length === 2) {
        if(longRender === true) {
          return (
            <div className="card-spacing">
            <div className={renderstyle + " " + columncard.columncard} onClick={() => {
                callback(currentrender)
            }}>
             <div className="row">
               <div className="col-md-6">
               <h5>{MinimizeText(currentrender[output[0]] , 14)}</h5>
               </div>
               <div className="col-md-6">
               <h6>{MinimizeText(currentrender[output[1]] , 30)}</h6>
               </div>
             </div>
            </div>
           </div>
          )
        } else {
          return (
            <div className="card-spacing">
            <div className={renderstyle} onClick={() => {
                callback(currentrender)
            }}>
             <h5>{MinimizeText(currentrender[output[0]] , 14)}</h5>
             <div className="text-padding">
               <h6>{MinimizeText(currentrender[output[1]] , 30)}</h6>
             </div>
            </div>
           </div>
          )
        }
      } else if (output.length === 3) {
        if (longRender === true) {
          return (
            <div className="card-spacing">
            <div className={renderstyle + " " + columncard.columncard} onClick={() => {
                callback(currentrender)
            }}>
            <div className="float-right">
              <h6>{currentrender[output[2]]}</h6>
            </div>
            <div className="text-padding">
               <h6>{MinimizeText(currentrender[output[1]] , 30)}</h6>
            </div>
             <h5>{currentrender[output[0]]}</h5>
            </div>
          </div>
          )
        } else {
          return (
            <div className="card-spacing">
            <div className={renderstyle} onClick={() => {
                callback(currentrender)
            }}>
            <div className="float-right">
              <h6>{currentrender[output[2]]}</h6>
            </div>
            <h5>{currentrender[output[0]]}</h5>
            <div className="text-padding">
               <h6>{MinimizeText(currentrender[output[1]] , 30)}</h6>
            </div>
            </div>
          </div>
          )
        }
      } else {
        console.log("You have more than one search for comp")
      }
    }

        if (suggestions.suggestions.length < 0) {
            return null;
        } else {
          return (
            <div>
               <div>
               <input type="text" className={inputstyle} placeholder={placeholder} onChange={(e) => {
                let suggestionsmade = [];
                const regex = new RegExp(`^${e.target.value}` , 'i');
                suggestionsmade = map.map.sort().filter(v => {
                for (let i = 0; i < output.length; i++) {
                  if (regex.test(v[output[i]])) {
                    return true
                  }
                }
                  return false
                } )
                if (e.target.value.length !== 0) {
                  setSuggestions({
                    suggestions: suggestionsmade
                })
                } else {
                  setSuggestions({
                    suggestions: []
                  })
                }
                }} />
               </div>
               <div className={longrender.longRender}>
                  {
                    suggestions.suggestions.map((item) => (
                        <div key={generateId(100)}>
                          <div className="card-spacing">
                          <CreatedSuggestions currentrender={item}/>
                          </div>
                        </div>
                    ))
                }
               </div>
            </div>
          )
        }

/*
        function ShowBtnInRender({showBtn}) {
            if (showBtn === true) {
                return (
                    <div>
                      <div className="button-padding">
                        <button className={BTNStyle}>{MinimizeText(BTNTitle, 12)}</button>
                      </div>
                    </div>
                )
            } else {
                return null
            }
        }
*/
    }

    return (
        <div>
              <Render/>
        </div>
    )
}

export default Search