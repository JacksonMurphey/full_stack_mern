const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {

    app.get('/api/allusers', UserController.findAllUsers);
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout); //even though we dont need authenticate for logging out, we will still have to send an empty object back on frontend when using {withcredentials: true}
    app.get('/api/users/secure', authenticate, UserController.getLoggedInUser);

}