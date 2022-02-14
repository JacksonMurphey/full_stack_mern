const GameController = require('../controllers/game.controller');


module.exports = (app) => {

    app.post('/api/games', GameController.createNewGame);
    app.get('/api/games', GameController.findAllGames);
    app.get('/api/games/:id', GameController.findOneGame);
    app.put('/api/games/:id', GameController.updateOneGame);
    app.delete('/api/games/:id', GameController.deleteOneGame);

}