const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        user: String,
        title: String,
        author: String,
        genre: String,
        img: String
    }
);

var bookData = mongoose.model('bookdatas',bookSchema);

module.exports = bookData;