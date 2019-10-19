import React, {useState} from 'react';
import MinimizeText from '../../Functions/MinimizeText';

const ProjectNotes = ({projectNotes}) => {
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

    const CurrentModalNote = ({currentnote , item}) => {
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
                      <div className="row">
                       <div className="col-md-8">
                        <div className="code-container">
                         <pre>
                             {item.code}
                         </pre>
                        </div>
                       </div>
                       <div className="col-md-4">
                        <h6>{item.message}</h6>
                        <div className="input-container">
                         <input type="text" className="input-comment" placeholder="Comment here" />
                        </div>
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
                                <h6>{item.displayname}</h6>
                                <div className="text-padding">
                                <h5>{MinimizeText(item.message , 20)}</h5>
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
                                    displayname: 'Jaffer',
                                    displaydate: '10-19-2019',
                                    message: noteinput.noteinput,
                                    code: notecode.notecode
                                }

                                noteres.noteres.push(data);
                                setNoteResponse({
                                    noteres: noteres.noteres
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