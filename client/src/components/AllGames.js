import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import DeleteGame from './DeleteGame';
import HeaderGame from './HeaderGame';


const AllGames = (props) => {

    //Intializing my list of games using state. Default Value of useState is an empty array
    const [gameList, setGameList] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                console.log(res);
                console.log(res.data);
                setGameList(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/secure', { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //NOTE: Created a DeleteGame Component... thus this is no longer needed

    // const deleteGame = (idFromBelow) => {
    //     axios.delete(`http://localhost:8000/api/games/${idFromBelow}`)
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             setGameList(gameList.filter((game, index) => game._id != idFromBelow))
    //         })
    //         .catch(err => console.log(err))
    // }

    //async example:
    // useEffect( async () => {
    //     try{
    //         let res = await axios.get('http://localhost:8000/api/games')
    //         let res2 = await axios.get('http://localhost:8000/api/games/620acfb11b9116f2991e9495') //passing Id of one game
    //         setGameList(res.data)
    //         console.log(res2.data)
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }, [])
    const logout = (e) => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            //Since this is a post request, we must send something with the request. Since we have nothing to send, we can put an empty object in its place. 
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {/* <header>
                <h1 style={{ fontSize: "50px", marginLeft: "450px", marginRight: "450px" }}>Game-On</h1>
                <Link to='/new'><button>Add New Game</button></Link>
            </header> */}

            <HeaderGame title='Game-On' linkRoute='/new' linkName='Add New Game' />
            <Link to={`/users/profile/${user.username}`}><button>Profile</button></Link>
            <button onClick={logout}>Logout</button>
            <hr />
            {
                gameList.map((game, index) => (
                    <div key={index}>

                        <Link to={`/game/${game._id}`}>
                            <p>Game: {game.name}</p>
                            <img src={game.image} alt="Image of this Game" style={{ width: "250px", height: "150px" }} />
                        </Link>
                        {/* Line 68 is temporarily needed since some games do not have a createdBy field, since users were added later.  */}
                        {game.createdBy && <Link to={`/users/profile/${game.createdBy.username}`}> <p>Created By: {game.createdBy.username}</p> </Link>}
                        {/* Adding a link to edit our game */}
                        <Link to={`/game/edit/${game._id}`}>
                            <div>
                                <button>Edit</button>
                            </div>
                        </Link>


                        {/*NOTE: No longer needed.
                         <button onClick={() => deleteGame(game._id)}>Delete</button> */}

                        <DeleteGame id={game._id} gameList={gameList} setGameList={setGameList} />
                        <hr />
                    </div>
                ))
            }
        </div>
    );
}
export default AllGames;