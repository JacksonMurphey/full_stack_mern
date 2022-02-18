import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import FormGame from './FormGame';
import HeaderGame from './HeaderGame';

const NewGame = (props) => {


    //Setting state for everything from our model. There is a easier way to do this. This is the long-form way.
    // const [name, setName] = useState('');
    // const [yearReleased, setYearReleased] = useState(''); // On our model, the year is set to Number, not String, this is in order to deal with falsy values
    // const [genre, setGenre] = useState('');
    // const [image, setImage] = useState('');
    // const [rating, setRating] = useState('');
    // const [company, setCompany] = useState('');
    // const [errors, setErrors] = useState('');



    //Creating a State Object to Utilize instead of Individually setting state for each item from my Game Model
    const [newGame, setNewGame] = useState({
        //Note: Empty Strings will not show in a database, if dealing with a boolean, set is to true or false here. 
        // -> also, helps prevent the uncontrolled input warning from the front end. 
        name: "",
        yearReleased: "",
        genre: "",
        image: "",
        rating: "",
        compnay: "",
        //errors: "" Commented out for now. 
    })

    // NOTE: Did not have to include each key from my model
    const [errors, setErrors] = useState({
        // name: "",
        // yearReleased: "",
        // genre: "",
        // image: "",
        // rating: "",
        // compnay: "",
    })

    //REMINDER:: different inputs (text, checkbox, radio, etc) require the use of different attributes.
    //--> (e.g. "checed, value, valueAsNumber, etc")
    //--> If I had a checkbox input that I was using in order to set a boolean value, if I tried to use 'e.target.value': it would not return me the boolean value I am looking for. 
    //--> Use console.log() to use and find the right attrubut needed, for the right situation. 

    //Example:
    // const changeHandler = e => {
    //     let newObject = {...newGame}

    //     if(e.target.type === "checkbox"){
    //         console.log(e.target.name, e.target.checked)
    //         newObject[e.target.name] = e.target.checked
    //     } else {
    //         console.log(e.target.name, e.target.value)
    //         newObject[e.target.name] = e.target.value
    //     }
    //     console.log(e.target)
    //     setNewGame(newObject)
    // }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:8000/api/games', { name, yearReleased, genre, image, rating, company })
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             navigate('/');
    //         })
    //         .catch(err => {
    //             //Validations from our controller/model would go here.
    //             console.log(err)
    //             console.log("err.response", err.response)
    //             console.log("err.response.data", err.response.data)
    //             console.log("err.response.data.error", err.response.data.error)
    //             console.log("err.response.data.error.errors", err.response.data.error.errors);
    //             setErrors(err.response.data.error.errors);
    //         })
    // }

    const newSubmitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/games', newGame)
            //Since I will now be creating an Object in useState({}), I no longer need to pass back the individual values of state as it was previously done above {name, yearRelease, genre, etc ...}
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => {
                console.log(err.response.data)
                setErrors(err.response.data.error.errors);
                // newGame.errors = err.response.data.error.errors
                // newGame[errors] = err.response.data.error.errors ?? : Not sure how to do this just yet. 
            })
    }

    return (
        <div>
            {/* <header>
                <h1>Add a New Game</h1>
                <Link to='/'><button>Home</button></Link>
            </header> */}
            <HeaderGame title='Add a New Game' linkRoute='/' linkName='Home' />

            <FormGame
                submitHandler={newSubmitHandler}
                game={newGame}
                setGame={setNewGame}
                buttonText='Add New Game'
                errors={errors}
            />

        </div>
    );
}
export default NewGame;


// OLD FORM USED, PRIOR TO CREATING A FORM COMPONENT 

// {/* <form onSubmit={submitHandler}>
// <div>
//     {errors.name && <p style={{ color: "red" }}> {errors.name.message}</p>}
//     <label htmlFor="">Name: </label>
//     <input type="text" value={name} onChange={e => setName(e.target.value)} />
//     {/* Technically we do not need to add value={} to any of our inputs, because once they submit, we will navigate to a new page. */}
// </div>

// <div>
//     {errors.yearReleased && <p style={{ color: "red" }}> {errors.yearReleased.message}</p>}
//     <label htmlFor="">Year Released: </label>
//     <input type="text" value={yearReleased} onChange={e => setYearReleased(e.target.value)} />
// </div>

// <div>
//     {errors.genre && <p style={{ color: "red" }}> {errors.genre.message}</p>}
//     <label htmlFor="">Genre: </label>
//     <select value={genre} name='genre' onChange={e => setGenre(e.target.value)}>
//         <option value='none' defaultValue hidden>Select a Genre</option>
//         <option value="Action">Action</option>
//         <option value="Platformer">Platformer</option>
//         <option value="RPG">RPG</option>
//         <option value="FPS">FPS</option>
//         <option value="RTS">RTS</option>
//         <option value="MMO">MMO</option>
//         <option value="Sports">Sports</option>
//         <option value="Adventure">Adventure</option>
//         <option value="Simulation">Simulation</option>
//     </select>
// </div>

// <div>
//     {errors.image && <p style={{ color: "red" }}> {errors.image.message}</p>}
//     <label htmlFor="">Image: </label>
//     <input type="text" value={image} onChange={e => setImage(e.target.value)} />
// </div>

// <div>
//     {errors.rating && <p style={{ color: "red" }}> {errors.rating.message}</p>}
//     <label htmlFor="">Rating: </label>
//     <select value={rating} name='rating' onChange={e => setRating(e.target.value)}>
//         <option value='none' defaultValue hidden>Select a Rating</option>
//         <option value="E">E : For Everyone</option>
//         <option value="E10">E10 : For 10 and up</option>
//         <option value="T">T : For Teen</option>
//         <option value="M">M : For Mature</option>
//         <option value="AO">AO : Adult Only</option>
//         <option value="No ESRB">No ESRB Rating</option>
//     </select>
// </div>

// <div>
//     <label htmlFor="">Maker: </label>
//     <input type="text" value={company} onChange={e => setCompany(e.target.value)} /> */}
// </div >
//     <button type='submit'>Add Game</button>
// </form >

