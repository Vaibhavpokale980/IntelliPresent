const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that no two users can have the same email
        trim: true,
        lowercase: true, // Converts email to lowercase
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
