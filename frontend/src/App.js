import React, { useState, useEffect } from 'react'

import api from './services/api'

import './app.css'
import Notes from './components/Notes'
import './global.css'
import './main.css'
import './sidebar.css'
import RadioButton from './components/RadioButton'

function App() {
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [allNotes, setAllNotes] = useState([])
    const [selectedValue, setSelectedValue] = useState('all')

    async function loadNotes(option) {
        const params = { priority: option }
        const res = await api.get('/priorities', { params })

        if (res) {
            setAllNotes(res.data)
        }
    }

    function handleChange(e) {
        setSelectedValue(e.value)

        if (e.value !== 'all') {
            loadNotes(e.value)
        } else {
            getAllNotes()
        }
    }

    useEffect(() => {
        getAllNotes()
    }, [])

    async function getAllNotes() {
        const res = await api.get('/annotations')
        setAllNotes(res.data)
    }

    useEffect(() => {
        function enableSubmitButton() {
            var btn = document.getElementById('btn_submit')
            btn.style.background = '#FFD3CA'
            if (title && notes) {
                btn.style.background = '#EB8F7A'
            }
        }
        enableSubmitButton()
    }, [title, notes])

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await api.post('/annotations', {
            title,
            notes,
            priority: false,
        })

        setTitle('')
        setNotes('')

        if (selectedValue !== 'all') {
            getAllNotes()
        } else {
            setAllNotes([...allNotes, res.data])
        }
        setSelectedValue('all')
    }

    async function handleDelete(id) {
        const deletedNote = await api.delete(`/annotations/${id}`)

        if (deletedNote) {
            setAllNotes(allNotes.filter((note) => note._id !== id))
        }
    }

    async function handleChangePriority(id) {
        const changedPriority = await api.post(`/priorities/${id}`)

        if (changedPriority && selectedValue !== 'all') {
            loadNotes(selectedValue)
        } else {
            getAllNotes()
        }
    }

    return (
        <div id="app">
            <aside>
                <strong>Caderno de Notas</strong>
                <form onSubmit={handleSubmit}>
                    <div className="input-block">
                        <label htmlFor="title">Título da Anotação</label>
                        <input
                            type="text"
                            value={title}
                            maxLength={40}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="nota">Anotações</label>
                        <textarea
                            value={notes}
                            required
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn b" id="btn_submit">
                        Salvar
                    </button>
                </form>

                <RadioButton
                    selectedValue={selectedValue}
                    handleChange={handleChange}
                />
            </aside>

            <main>
                <ul>
                    {allNotes.map((data) => (
                        <Notes
                            key={data._id}
                            data={data}
                            handleDelete={handleDelete}
                            handleChangePriority={handleChangePriority}
                        />
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default App
