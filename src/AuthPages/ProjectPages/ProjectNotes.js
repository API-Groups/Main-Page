import React, {useState, useEffect, useRef} from 'react';
import MinimizeText from '../../Functions/MinimizeText';
import { JPIAuth } from '../../Authentication/Auth';

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
             fetch('/api/project/getprojectnotes/' + api)
             .then((res) => {
                 return res.json();
             }).then((body) => {
                 console.log(body);
                 setNoteResponse({
                     noteres: body
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

        if (currentnote === true) {
            console.log(item.noteid)
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
                      <div className="row">
                       <div className="col-md-8">
                        <div className="code-container">
                         <pre>
                             {item.code}
                         </pre>
                        </div>
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

                                fetch('/api/project/commentonnotes/' + api + '/' + item.noteid, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }, 
                                    body: JSON.stringify(data)
                                }).then((res) => {
                                    return res.json()
                                }).then((body) => {
                                    currentcomments.currentcomments.push(body);
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
                                <h5>{MinimizeText(item.note , 20)}</h5>
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

                                fetch('/api/project/createnote/' + api, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                }).then((res) => {
                                    return res.json();
                                }).then((body) => {
                                    noteres.noteres.push(body);
                                    setNoteResponse({
                                        noteres: noteres.noteres
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