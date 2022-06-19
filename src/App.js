import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const GOOGLE_SHEET_API = 'https://sheet.best/api/sheets/147adff6-9ff7-4271-985b-8909eec4bb26'

export const App = () => {
  const [dataSource, setDataSource] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    axios.get(GOOGLE_SHEET_API).then(response => setDataSource(response?.data))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();

    const newItemData = {
      title: title,
      description: description,
      tags: tags
    }

    axios.post(GOOGLE_SHEET_API, newItemData)
    .then(() => {
      const newDataSource = [
        ...dataSource,
        newItemData
      ]
      setDataSource(newDataSource)
    })
  }
  
  return (
    <div className="container">
      <div>React app using Google Sheets as api</div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <label>TITLE</label>
          <input 
            placeholder='Enter a title' 
            type="title" name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label>Description</label>
          <input 
            placeholder='Enter a description' 
            type="description" name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div>
          <label>Tags</label>
          <input 
            placeholder='Enter your tags' 
            type="tags" 
            name="tags" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div className="data-list">
        <ul>
          {dataSource?.map(({title, description, tags}, index) => {
            return (
              <li key={index}>
                {title} - {description} - {tags}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default App