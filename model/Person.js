const mongoose = require("mongoose")

const Person = mongoose.model("PERSON",{
    name:String,
    email:String,
    contact:String
})

module.exports = Person