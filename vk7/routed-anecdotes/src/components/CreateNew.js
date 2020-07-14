import React from 'react'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'

let lastNotification = null

const CreateNew = (props) => {

    const {reset: reset1, ...content} = useField('content')
    const {reset: reset2, ...author} = useField('author')
    const {reset: reset3, ...info} = useField('info')

    const resetAll = () => {
      reset1()
      reset2()
      reset3()
    }
  
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push('/')
      props.setNotification(`a new anecdote ${content.value} created!`)
      if (lastNotification) clearTimeout(lastNotification)
      lastNotification = setTimeout(() => {
        props.setNotification('')
        lastNotification = null
      }, 10000);
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type='submit'>create</button>
          <button type='button' onClick={resetAll}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew
