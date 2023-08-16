const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  longUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});
const urlModel = new mongoose.model("Url", urlSchema); //Creating a collection in the DB of name Urls.
module.exports = urlModel;
