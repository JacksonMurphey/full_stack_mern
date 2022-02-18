import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import DeleteGame from './DeleteGame';
import HeaderGame from './HeaderGame';

const OneGame = (props) => {

    // Destructuring from AllGames.js
    const { id } = props;
    //Intializing my list of games using state. Default Value of useState is an empty array
    const [game, setGame] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/games/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setGame(res.data);
            })
            .catch(err => console.log(err))
    }, [id])


    //NOTE: Created a DeleteGame Component... thus this is no longer needed

    // const deleteGame = () => {
    //     axios.delete(`http://localhost:8000/api/games/${id}`)
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             navigate('/')
    //         })
    //         .catch(err => console.log(err))
    // }


    return (
        <div>


            <HeaderGame title={game.name} linkRoute='/' linkName='Home' />


            <img src={game.image} alt="Game" style={{ width: "1000px", width: "500px" }} />
            <p>Year Released: {game.yearReleased}</p>
            <p>Genre: {game.genre}</p>
            <p>Rating: {game.rating}</p>
            <p>Maker: {game.company}</p>
            <Link to={`/game/edit/${id}`}><button>Edit Game</button></Link>
            {/* <button onClick={deleteGame}>Delete</button> */}
            <DeleteGame id={id} />
        </div>
    );
}
export default OneGame;