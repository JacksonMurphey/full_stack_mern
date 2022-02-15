import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';


const AllGames = (props) => {

    //Intializing my list of games using state. Default Value of useState is an empty array
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                console.log(res);
                console.log(res.data);
                setGameList(res.data);
            })
            .catch(err => console.log(err))
    }, []);



    return (
        <div>
            <header>
                <h1 style={{ fontSize: "50px", marginLeft: "450px", marginRight: "450px" }}>Game-On</h1>
                <Link to='/new'><button>Add New Game</button></Link>
            </header>
            {
                gameList.map((game, index) => (
                    <div key={index}>
                        <Link to={`/game/${game._id}`}>
                            <p>Game: {game.name}</p>
                        </Link>

                        <img src={game.image} alt="Image of this Game" style={{ width: "250px", height: "150px" }} />
                        <hr />
                    </div>
                ))
            }
        </div>
    );
}
export default AllGames;