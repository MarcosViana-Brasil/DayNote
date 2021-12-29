import React, { useState } from 'react'
import { AiTwotoneDelete, AiOutlineExclamationCircle } from 'react-icons/ai'

import './styles.css'
import './styles-priority.css'
import api from '../../services/api'

function Notes({ data, handleDelete, handleChangePriority }) {
    const [changedNote, setChangedNote] = useState('')

    async function handleSave(e, notes) {
        if (changedNote && changedNote !== notes) {
            await api.post(`/contents/${data._id}`, { notes: changedNote })
        }
        e.style.cursor = 'default'
        e.style.boxShadow = 'none'
    }

    async function handleEdit(e, priority) {
        e.style.cursor = 'text'
        e.style.boxShadow = '0 0 10px white'
        if (!priority) {
            e.style.boxShadow = '0 0 10px gray'
        }
    }

    return (
        <>
            <li
                className={
                    data.priority ? 'notepad-infos-priority' : 'notepad-infos'
                }
            >
                <div>
                    <strong>{data.title}</strong>
                    <div>
                        <AiTwotoneDelete
                            size={20}
                            onClick={() => handleDelete(data._id)}
                        />
                    </div>
                </div>
                <textarea
                    defaultValue={data.notes}
                    onClick={(e) => handleEdit(e.target, data.priority)}
                    onChange={(e) => setChangedNote(e.target.value)}
                    onBlur={(e) => handleSave(e.target, data.notes)}
                />
                <div>
                    <span>
                        <AiOutlineExclamationCircle
                            size={20}
                            onClick={() => handleChangePriority(data._id)}
                        />
                    </span>
                </div>
            </li>
        </>
    )
}

export default Notes
