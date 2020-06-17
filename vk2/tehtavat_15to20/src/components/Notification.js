import React from 'react'

const Notification = ({ message }) => {
    if (message === null) return null

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        borderStyle: 'solid',
        padding: 10
    }

    return (
        <div style={notificationStyle} className="error">
            {message}
        </div>
    )
}

export default Notification
