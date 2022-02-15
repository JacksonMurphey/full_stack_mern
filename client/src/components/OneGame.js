import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

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

    return (
        <div>
            <header>
                <h1 style={{ fontSize: "50px", marginLeft: "450px", marginRight: "450px" }}>{game.name}</h1>
                <Link to="/"><button>Home</button></Link>
                {/* <Link to={"/"}>Home</Link> : This would work as well */}
            </header>
            <img src={game.image} alt="Game Image" style={{ width: "1000px", width: "500px" }} />
            <p>Year Released: {game.yearReleased}</p>
            <p>Genre: {game.genre}</p>
            <p>Rating: {game.rating}</p>
            <p>Maker: {game.company}</p>
            <Link to={`/game/edit/${id}`}><button>Edit Game</button></Link>
        </div>
    );
}
export default OneGame;