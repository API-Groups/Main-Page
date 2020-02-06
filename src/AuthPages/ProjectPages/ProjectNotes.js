import React, {useState, useEffect, useRef} from 'react';
import MinimizeText from '../../Functions/MinimizeText';
import { JPIAuth } from '../../Authentication/Auth';
import axios from 'axios';
const ProjectNotes = ({projectNotes, api}) => {
    const [notemodal, setNoteModal] = useState({
        notemodal: false
    })

    const [noteres, setNoteResponse] = useState({
        noteres: []
    })
    const [currentNote, setCurrentNote] = useState({
        currentNote: {}
    })
    const [currentModalNote, setCurrentModalNote] = useState({
        currentModalNote: false
    })

    const componentMounted = useRef(null);
    useEffect(() => {
     componentMounted.current = true;
     if (componentMounted.current) {
         if (projectNotes === true) {
             axios.get('https://jpi-backend.herokuapp.com/api/project/getprojectnotes/' + api)
             .then((body) => {
                 console.log(body);
                 setNoteResponse({
                     noteres: body.data
                 })
             }).catch((error) => {
                 console.log(error);
             })
         }
     }
    }, [api, projectNotes])

    const CurrentModalNote = ({currentnote , item}) => {
        const [currentcomments , setCurrentComments] = useState({
            currentcomments: []
        })
        const [originalCodeContainer, setOGCodeContainer] = useState({
            originalCodeContainer: true
        })
        const [codeEditor, setCodeEditor] = useState({
            codeEditor: false
        })
        const [editCodes, setEditCodes] = useState({
            editCodes: false
        })
        useEffect(() => {
         setCurrentComments({
             currentcomments: item.comments
         })
        }, [item.comments])

        const Comments = () => {
            return (
                <div>
                    {
                        currentcomments.currentcomments.map((index) => (
                            <div key={currentcomments.currentcomments.indexOf(index)}>
                                 <div className="comment-container">
                                  <h6 className="comment d-inline-flex p-2">{index.username + ': ' + index.message}</h6>
                                 </div>
                                </div>
                        ))
                    }
                </div>
            )
        }

        const CodeEditorInput = ({codeEditorInput}) => {
            const [code, setCode] = useState({
                code: ''
            })
            if (codeEditorInput === true) {
                return (
                    <div>
                     <div className="button-padding">
                      <button className="button-black" onClick={() => {
                          const data = {
                              model: code.code,
                              author: JPIAuth.currentUser.username
                          }
                          axios.post('https://jpi-backend.herokuapp.com/api/project/addedits/' + api + '/' + item.noteid, data ,{
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              }
                          }).then((body) => {
                             console.log(body);
                          }).catch((error) => {
                              console.log(error);
                          })

                      }}>SAVE EDITS</button>
                     </div>
                     <div className="code-container">
                       <textarea className="code-editor" onChange={(e) => {
                           setCode({
                               code: e.target.value
                           })
                       }} />
                     </div>
                    </div>
                )
            } else {
                return null;
            }
        }

        const CodeContainer = ({codecontainer}) => {
            if (codecontainer === true) {
              return (
                  <div>
                    <div className="code-container">
                     <pre>
                        {item.model}
                     </pre>
                    </div>
                  </div>
              )
            } else {
                return null;
            }
        }

        const EditCodes = ({editcodes}) => {
            if (editcodes === true) {
                return (
                    <div>
                      <h4 className="text-center">CURRENTLY THERE ARE NO EDITS</h4>
                    </div>
                )
            } else {
                return null;
            }
        }

        if (currentnote === true) {
            return (
                <div>
                 <div className="modal-page">
                  <div className="container">
                   <div className="modal-padding">
                    <div className="modal-box">
                      <span className="closebtndark" onClick={() => {
                          setCurrentModalNote({
                              currentModalNote: false
                          })
                      }}>&times;</span>
                      <div className="button-padding">
                      <div className="float-left">
                       <div className="button-spacing">
                       <button className="button-purple" onClick={() =>{
                          setOGCodeContainer({
                              originalCodeContainer: false
                          })
                          setCodeEditor({
                              codeEditor: true
                          })
                          setEditCodes({
                            editCodes: false
                        })
                      }}>
                       EDIT CODE
                      </button>
                       </div>
                      </div>
                      <div className="float-left">
                       <div className="button-spacing">
                       <button className="button-black " onClick={() =>{
                          setOGCodeContainer({
                              originalCodeContainer: false
                          })
                          setCodeEditor({
                              codeEditor: false
                          })
                          setEditCodes({
                              editCodes: true
                          })
                      }}>
                       EDITS
                      </button>
                       </div>
                      </div>
                      <button className="button-white" onClick={() =>{
                          setOGCodeContainer({
                              originalCodeContainer: true
                          })
                          setCodeEditor({
                              codeEditor: false
                          })
                          setEditCodes({
                            editCodes: false
                        })
                      }}>
                       ORIGINAL CODE
                      </button>
                      </div>
                      <div className="row">
                       <div className="col-md-8">
                        <CodeContainer codecontainer={originalCodeContainer.originalCodeContainer}/>
                        <CodeEditorInput codeEditorInput={codeEditor.codeEditor}/>
                        <EditCodes editcodes={editCodes.editCodes}/> 
                       </div>
                       <div className="col-md-4">
                        <h6>{item.note}</h6>
                        <div className="input-container">
                         <input type="text" className="input-comment" placeholder="Comment here" onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                const data = {
                                    username: JPIAuth.currentUser.username,
                                    message: e.target.value
                                }

                                axios.post('https://jpi-backend.herokuapp.com/api/project/commentonnotes/' + api + '/' + item.noteid, data ,{
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }, 
                                }).then((body) => {
                                    currentcomments.currentcomments.push(body.data);
                                    setCurrentComments({
                                        currentcomments: currentcomments.currentcomments
                                    })
                                }).catch((error) => {
                                    console.log(error);
                                })
                            }
                         }} />
                        </div>
                        <Comments/>
                       </div>
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

    const NoteResponse = () => {
       if (noteres.noteres.length === 0) {
         return (
             <div>
              <div className="empty-padding">
                <div className="empty-notes-container">
                 <h2>There are no Notes in this project</h2>
                 <div className="button-padding">
                 <button className="button-all-white" onClick={() => {
                     setNoteModal({
                         notemodal: true
                     })
                 }}>CREATE NOTE</button>
                </div>
                </div>
              </div>
             </div>
         )
       } else {
        return (
            <div>
                <div className="row" >
                    {
                        noteres.noteres.map((item) => (
                            <div key={noteres.noteres.indexOf(item)}>
                            <div className="note-container">
                            <div className="project-note" onClick={() => {
                                setCurrentNote({
                                    currentNote: item
                                })
                                setCurrentModalNote({
                                    currentModalNote: true
                                })
                            }}>
                                <div className="float-right">
                                <h6>{item.displaydate}</h6>
                                </div>
                                <h6>{item.creator}</h6>
                                <div className="text-padding">
                                <h5 className="text-center">{MinimizeText(item.note , 20)}</h5>
                                </div>
                            </div>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
       }
    }

    const ModalNote = ({modalnote}) => {
        const [noteinput, setNoteInput] = useState({
            noteinput: ''
        })
        const [notecode, setNoteCode] = useState({
            notecode: ''
        })
        if (modalnote === true) {
            return (
                <div>
                    <div className="modal-page">
                      <div className="container">
                        <div className="modal-padding">
                         <div className="modal-box">
                          <span className="closebtndark" onClick={() => {
                              setNoteModal({
                                  notemodal: false
                              })
                          }} >&times;</span>
                          <h3>CREATE NOTE</h3>
                          <div className="input-container">
                            <input type="text" className="input-bar" placeholder="Write Note" onChange={(e) => {
                                setNoteInput({
                                    noteinput: e.target.value
                                })
                            }} />
                          </div>
                          <div className="input-container">
                            <textarea type="text-area-input" className="input-bar" placeholder="Write Code Here" onChange={(e) => {
                                setNoteCode({
                                    notecode: e.target.value
                                })
                            }} />
                          </div>
                          <div className="code-container">
                            <pre>
                                {notecode.notecode}
                            </pre>
                          </div>
                          <div className="button-padding">
                            <button className="button-purple" onClick={() =>{
                                const data = {
                                    creator: JPIAuth.currentUser.username,
                                    displaydate: '10-19-2019',
                                    note: noteinput.noteinput,
                                    model: notecode.notecode
                                }

                                axios.post('https://jpi-backend.herokuapp.com/api/project/createnote/' + api, data,{
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                }).then((body) => {
                                    noteres.noteres.push(body.data);
                                    setNoteResponse({
                                        noteres: noteres.noteres
                                    })
                                    setNoteModal({
                                        notemodal: false
                                    })
                                }).catch((error) => {
                                    console.log(error);
                                })
                                
                            }}>SUBMIT NOTE</button>
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
    if (projectNotes === true) {
        return (
            <div>
                <div className="non-nav-page">
                 <div className="project-notes">
                  <div className="container">
                    <div className="float-right">
                      <button className="button-purple" onClick={() => {
                          setNoteModal({
                              notemodal: true
                          })
                      }}>MAKE A NOTE</button>
                    </div>
                    <h3>PROJECT NOTES</h3>
                    <div className="input-container">
                      <NoteResponse/>
                    </div>
                  </div>
                 </div>
                </div>
                <ModalNote modalnote={notemodal.notemodal} />
                <CurrentModalNote currentnote={currentModalNote.currentModalNote} item={currentNote.currentNote} />
            </div>
        )
    } else {
        return null;
    }
}

export default ProjectNotes;