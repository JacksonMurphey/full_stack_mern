import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router'
import axios from 'axios';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const loginHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login', { email, password }, { withCredentials: true })
            //W/Credentials - will force the sending of the credentials / cookies so they can be updated
            //XMLHttpRequest from a different domain cannot set cookie values for their own domain, unless w/credentials is set to true before making the request
            .then(res => {
                console.log(res.data)
                navigate('/home')
                //Another way to send userId forward is with 'Local Storage' 
                //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
                //LOCAL STORAGE: will allow us to store this current user's ID in storage. This way, we can use it on a button for the current user to get
                //to their profile page. 
                //--> localStorage.setItem("userId", res.data.userId)
                //--> utilizing navigate's second argument to pass our userId forward
                //Docs: https://reach.tech/router/api/navigate
            })
            .catch(err => {
                console.log(err.response.data)
                setErrorMessage(err.response.data.message)
            })
    }


    return (
        <div>
            <h1>Login</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={loginHandler} >
                <div>
                    <label htmlFor="">Email: </label>
                    <input type="text" name='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                    <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button>Sign In</button>
                </div>
            </form>
        </div>
    )
}
export default Login;