import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = (props) => {

    const [confReg, setConfReg] = useState('')
    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/register', user, { withCredentials: true }) //withCredentials needs to come last. 
            .then(res => {
                console.log(res.data)
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                setConfReg('Thank you for Registering. You may now Log in.')
                setErrors({})
            })
            .catch(err => {
                console.log(err.response)
                setErrors(err.response.data.errors)
            })
    }


    return (
        <div>
            {confReg && <h4 style={{ color: "blue" }}>{confReg}</h4>}

            <h1>Registration</h1>
            <form onSubmit={register}>
                <div>
                    <label htmlFor="">Username: </label>
                    {errors.username &&
                        <span style={{ color: "red" }}>{errors.username.message}</span>
                    }
                    <input
                        type="text"
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="">Email: </label>
                    {errors.email &&
                        <span style={{ color: "red" }}>{errors.email.message}</span>
                    }
                    <input type="text" name='email' value={user.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                    {errors.password &&
                        <span style={{ color: "red" }}>{errors.password.message}</span>
                    }
                    <input type="password" name='password' value={user.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Confirm Password: </label>
                    {errors.confirmPassword &&
                        <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
                    }
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                </div>
                <div className='center'>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}
export default Register;