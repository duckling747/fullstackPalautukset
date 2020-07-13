import React from 'react'

const Notification = ({ text }) => {

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: text === '' ? 'none' : ''
      }
    
    return (
        <p style={style}>
            {text}
        </p>
    )
}

export default Notification
