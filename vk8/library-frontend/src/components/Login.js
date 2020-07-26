import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'


const Login = ({ show, setUserToken }) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [getMe] = useLazyQuery(ME, {
        fetchPolicy: 'network-only'
    })

    const [login, result] = useMutation(LOGIN, {
        onError: e => {
            // error stuff
        },
        onCompleted: data => {
            getMe()
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setUserToken(token)
            localStorage.setItem('current-user-token', token)
        }
    }, [result.data, setUserToken])

    const submitHandler = (e) => {
        e.preventDefault()
        login({ variables: { username: name, password } })
        setName('')
        setPassword('')
    }

    if (!show) return null

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='i_name'>
                    name: 
                </label>
                <input id='i_name' value={name} type='text'
                    onChange={({ target }) => setName(target.value) } />
            </div>
            <div>
                <label htmlFor='i_password'>
                    password: 
                </label>
                <input id='i_password' value={password} type='password'
                    onChange={({ target }) => setPassword(target.value) } />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default Login
