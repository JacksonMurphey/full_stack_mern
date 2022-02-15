import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const NewGame = (props) => {


    //Setting state for everything from our model. There is a easier way to do this. This is the long-form way.
    const [name, setName] = useState('');
    const [yearReleased, setYearReleased] = useState(''); // On our model, the year is set to Number, not String, this is in order to deal with falsy values
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [company, setCompany] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/games', { name, yearReleased, genre, image, rating, company })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate('/');
            })
            .catch(err => {
                //Validations from our controller/model would go here.
                console.log(err);
            })
    }

    return (
        <div>
            <header>
                <h1>Add a New Game</h1>
                <Link to='/'><button>Home</button></Link>
            </header>

            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    {/* Technically we do not need to add value={} to any of our inputs, because once they submit, we will navigate to a new page. */}
                </div>

                <div>
                    <label htmlFor="">Year Released: </label>
                    <input type="text" value={yearReleased} onChange={e => setYearReleased(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Genre: </label>
                    <select value={genre} name='genre' onChange={e => setGenre(e.target.value)}>
                        <option value='none' defaultValue hidden>Select a Genre</option>
                        <option value="Action">Action</option>
                        <option value="Platformer">Platformer</option>
                        <option value="RPG">RPG</option>
                        <option value="FPS">FPS</option>
                        <option value="RTS">RTS</option>
                        <option value="MMO">MMO</option>
                        <option value="Sports">Sports</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Simulation">Simulation</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="">Image: </label>
                    <input type="text" value={image} onChange={e => setImage(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">Rating: </label>
                    <select value={rating} name='rating' onChange={e => setRating(e.target.value)}>
                        <option value='none' defaultValue hidden>Select a Rating</option>
                        <option value="E">E : For Everyone</option>
                        <option value="E10">E10 : For 10 and up</option>
                        <option value="T">T : For Teen</option>
                        <option value="M">M : For Mature</option>
                        <option value="AO">AO : Adult Only</option>
                        <option value="No ESRB">No ESRB Rating</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="">Maker: </label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <button type='submit'>Add Game</button>
            </form>

        </div>
    );
}
export default NewGame;