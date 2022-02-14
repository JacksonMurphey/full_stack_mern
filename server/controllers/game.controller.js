const Game = require('../models/game.model');

module.exports = {

    createNewGame:
        (req, res) => {
            Game.create(req.body)
                .then((newGame) => {
                    console.log(newGame);
                    res.json(newGame);
                })
                .catch(err => {
                    console.log('Creating a New Game Failed');
                    res.status(400).json({ message: 'Something went wrong in createGame()', error: err });
                    //See bottom of file for notes on possible errors..
                })
        },

    findAllGames:
        (req, res) => {
            Game.find()
                .then((allGames) => {
                    console.log(allGames);
                    res.json(allGames);
                })
                .catch(err => {
                    console.log('Find All Games Failed');
                    res.json({ message: 'Something went wrong in findAll()', error: err });
                });
        },

    findOneGame:
        (req, res) => {
            Game.findOne({ _id: req.params.id })
                .then((oneGame) => {
                    console.log(oneGame);
                    res.json(oneGame);
                })
                .catch(err => {
                    console.log('Find One Game Failed');
                    res.json({ message: 'Something went wrong in findOneGame()', error: err });
                })
        },

    updateOneGame:
        (req, res) => {
            Game.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
                .then((updatedGame) => {
                    console.log(updatedGame);
                    res.json(updatedGame);
                })
                .catch(err => {
                    console.log('Updating One Game Failed');
                    res.status(400).json({ message: 'Something went wrong in updateOneGame()', error: err });
                })
        },

    deleteOneGame:
        (req, res) => {
            Game.deleteOne({ _id: req.params.id })
                .then((deletedGame) => {
                    console.log(deletedGame);
                    res.json(deletedGame);
                })
                .catch(err => {
                    console.log('Deleting One Game Failed');
                    res.json({ message: 'Something went wrong in deleteOneGame()', error: err });
                })
        }
}


//--- Error Notes: ---
//We get the response status of 400 to display our err, which is the rejection of our promise.

// A '400' status error means our client is talking to our server just fine, but the client isnt sending good information 
// such as: (client isnt meeting the validations we setup in our model)
//  NOTE: --> This is how we will eventually display our validations from the server in REACT 

// A '404' status error means you are not making your calls to the correct place 'or' your server is not set up properly

// A '200' status returned means we are looking good/everything is working 