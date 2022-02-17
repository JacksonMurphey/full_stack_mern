import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const FormGame = (props) => {

    const { submitHandler, game, setGame, buttonText, errors } = props


    const changeHandler = e => {
        let newGameObject = { ...game }
        console.log(e.target)
        console.log("e.target.name", e.target.name)

        newGameObject[e.target.name] = e.target.value
        setGame(newGameObject)
    }


    return (

        <form onSubmit={submitHandler}>
            <div>
                {errors.name && <p style={{ color: "red" }}> {errors.name.message}</p>}
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={changeHandler} value={game.name} />
            </div>
            <div>
                {errors.yearReleased && <p style={{ color: "red" }}> {errors.yearReleased.message}</p>}
                <label htmlFor="yearReleased">Year Released: </label>
                <input type="text" name="yearReleased" onChange={changeHandler} value={game.yearReleased} />
            </div>
            <div>
                {errors.genre && <p style={{ color: "red" }}> {errors.genre.message}</p>}
                <label htmlFor="genre">Genre: </label>
                <select value={game.genre} name="genre" onChange={changeHandler}>
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
                <label htmlFor="image">Image: </label>
                <input type="text" name="image" value={game.image} onChange={changeHandler} />
            </div>
            <div>
                {errors.rating && <p style={{ color: "red" }}> {errors.rating.message}</p>}
                <label htmlFor="rating">Rating: </label>
                <select value={game.rating} name="rating" onChange={changeHandler}>
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
                {/* No restrictions were made for company */}
                <label htmlFor="company">Maker: </label>
                <input type="text" value={game.company} name="company" onChange={changeHandler} />
            </div>
            <button type='submit'>{buttonText}</button>
        </form>
    )
}
export default FormGame;