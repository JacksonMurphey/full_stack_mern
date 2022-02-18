const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'A Username is Required']
    },

    email: {
        type: String,
        required: [true, 'An Email Address is Required']
    },

    password: {
        type: String,
        required: [true, 'A Password is Required'],
        minLength: [8, 'Passwords Must be at least 8 characters']
    },

}, { timestamps: true })

//When Registering, We want to have them confirm their password. 
//To do this we will create a virtual field for this. 

//Virtual Fields:
//Stores information from our request, but will not save it to our collections/db 
//Virtual Fields need a getter and setter: (see syntax below)

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)

//Documents to review:
//https://mongoosejs.com/docs/middleware.html#pre
//https://mongoosejs.com/docs/middleware.html

//Middleware affects/aides-in the middle of a process (crazy good explanation!)
//'pre' validate automatically runs before any save middleware
// next() allows us to move from one piece of middleware to another

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords Must Match") //.invalidate(<the field it applies to>, "the message to display if validation not met")
        console.log('Passwords do not match')
    }
    next()
})

UserSchema.pre("save", function (next) {
    console.log("In the pre save now")
    //Hash the Password before it is saved to the DB
    bcrypt.hash(this.password, 10) //10 rounds of salting the password value.
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next()
        })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;