const GameController = require('../controllers/game.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {

    app.post('/api/games', authenticate, GameController.createNewGame);
    //authenticate requires that a user now be logged in, in order to create a game. 
    app.get('/api/games', GameController.findAllGames);

    //THIS IS NEW, Now that we have created a relationshop between Games and Users
    app.get('/api/usergames/:username', authenticate, GameController.findAllGamesByUser)

    app.get('/api/games/:id', GameController.findOneGame);
    app.put('/api/games/:id', GameController.updateOneGame);
    app.delete('/api/games/:id', GameController.deleteOneGame);

}
