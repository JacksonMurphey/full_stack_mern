const mongoose = require('mongoose');

//-- Create your Schema and its Structure -- 
const GameSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'A name for the game is required'],
        minlength: [3, 'The game name must be at least 3 characters']
    },

    yearReleased: {
        type: Number,
        required: [true, "You must provide the game's release year"],
        min: [1960, 'The release year must be 4 digits. ex: 1999 or 2022']
    },

    genre: {
        type: String,
        required: [true, 'A Genre is required'],
        enum: [
            'Action',
            'Platformer',
            'RPG',
            'FPS',
            'RTS',
            'MMO',
            'Sports',
            'Adventure',
            'Simulation'
        ]
    },

    image: {
        type: String,
        required: [true, 'An image/picture is required']
    },

    rating: {
        type: String,
        enum: [
            'E',
            'E10',
            'T',
            'M',
            'AO',
            'No ESRB'
        ],
        required: [true, 'Please Select the ERSB rating']
    },

    company: {
        type: String
    },



}, { timestamps: true })


//-- Create an our Model -- 
const Game = mongoose.model('Game', GameSchema);

//-- Export --
module.exports = Game;