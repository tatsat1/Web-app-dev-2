let mongoose = require("mongoose");

//mdoel class
let contactsModel = new mongoose.Schema({
        username: String,
        password: String,
        name: String,
        number: String,
        email: String

    },

    {
        collection: "contacts"

    });

module.exports = mongoose.model('Contact', contactsModel);