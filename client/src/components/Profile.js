import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderGame from './HeaderGame';
import { Link } from '@reach/router';

const Profile = props => {

    const { username } = props
    const [userGameList, setUserGameList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/usergames/${username}`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setUserGameList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Welcome {username}</h1>
            { //Make this a component
                userGameList.map((game, index) => (
                    <div key={index}>
                        <p>{game.name}</p>
                        <p>{game.genre}</p>
                        <p>{game.yearReleased}</p>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}
export default Profile;