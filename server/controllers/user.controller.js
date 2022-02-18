const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

    register:
        (req, res) => {
            //use the req data and User model constructor to create a user object.
            const user = new User(req.body);

            //info is already in the instance of THIS object. No need to pass anything in. 
            //'save' is an instance method. It doesnt require anything to be passed in.
            //'create' is static and takes the object as the parameter 

            user.save()
                .then((newUser) => {
                    console.log(newUser)
                    console.log("Successfully Registered")
                    res.json({
                        successMessage: "Thank you for Registering",
                        user: newUser
                    })
                })
                .catch((err) => {
                    console.log("Registering was not Successful")
                    res.status(400).json(err)
                })
        },

    login:
        (req, res) => {
            //Check to make sure the user exists. 
            User.findOne({ email: req.body.email })
                .then((userRecord) => {
                    //check if this returned object is null. 
                    if (userRecord === null) {
                        //email not found
                        req.status(400).json({ message: "Invalid Email or Password" })
                    } else {
                        //email is found 
                        bcrypt.compare(req.body.password, userRecord.password) //this returns a boolean
                            .then((isPasswordValid) => {
                                if (isPasswordValid) {
                                    console.log('password is valid')
                                    res.cookie(
                                        'usertoken',
                                        jwt.sign({
                                            //the payload is data we want to save
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                            //We need a key to sign and hash the cookie's data
                                            //Our payload needs a secret key. We will use the one we made in our .env file
                                            process.env.JWT_SECRET
                                        ), {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 6000000) //6000000 mil-sec
                                    },
                                    ).json({
                                        message: "Successfully Logged In",
                                        userLoggedIn: userRecord.username,
                                        userId: userRecord._id //Will update with a better way to handle this
                                    })
                                } else {
                                    res.status(400).json({
                                        message: "Invalid Login or Email"
                                    })
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(400).json({ message: "Invalid Login or Email" })
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).json({ message: "Invalid Attempt" })
                })
        },

    logout:
        (req, res) => {
            console.log("Logging Out")
            res.clearCookie("usertoken")
            res.json({
                message: "You have successfully logged out"
            })
        },


    getOneUser:
        (req, res) => {
            User.findOne({ _id: req.params.id })
                .then((oneUser) => {
                    console.log(oneUser)
                    res.json(oneUser)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).json(err)
                })
        },



}