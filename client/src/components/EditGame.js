import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';



const EditGame = (props) => {

    const { id } = props;

    const [name, setName] = useState('');
    const [yearReleased, setYearReleased] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState('');
    const [rating, setRating] = useState('');
    const [company, setCompany] = useState('');

    const [errors, setErrors] = useState('');

    //I will need to do an axios.get() call. Then, inside my submitHandler, I would do an axios.put() call.  
    useEffect(() => {
        axios.get(`http://localhost:8000/api/games/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setName(res.data.name)
                setYearReleased(res.data.yearReleased)
                setGenre(res.data.genre)
                setImage(res.data.image)
                setRating(res.data.rating)
                setCompany(res.data.company)
            })
            .catch(err => console.log(err))
    }, [id])


    const editHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/games/${id}`, { name, yearReleased, genre, image, rating, company })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                console.log("err.response.data.error.errors", err.response.data.error.errors);
                setErrors(err.response.data.error.errors)
            })
    }


    return (
        <div>
            <header>
                <h1>Edit the Game</h1>
                <Link to='/'><button>Home</button></Link>
            </header>
            <form onSubmit={editHandler}>
                <div>
                    {errors.name && <p style={{ color: "red" }}> {errors.name.message}</p>}
                    <label htmlFor="">Name: </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    {/* Technically we do not need to add value={} to any of our inputs, because once they submit, we will navigate to a new page. */}
                </div>

                <div>
                    {errors.yearReleased && <p style={{ color: "red" }}> {errors.yearReleased.message}</p>}
                    <label htmlFor="">Year Released: </label>
                    <input type="text" value={yearReleased} onChange={e => setYearReleased(e.target.value)} />
                </div>

                <div>
                    {errors.genre && <p style={{ color: "red" }}> {errors.genre.message}</p>}
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
                    {errors.image && <p style={{ color: "red" }}> {errors.image.message}</p>}
                    <label htmlFor="">Image: </label>
                    <input type="text" value={image} onChange={e => setImage(e.target.value)} />
                </div>

                <div>
                    {errors.rating && <p style={{ color: "red" }}> {errors.rating.message}</p>}
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
                <button type='submit'>Edit Game</button>
            </form>
        </div>
    )
}
export default EditGame;

