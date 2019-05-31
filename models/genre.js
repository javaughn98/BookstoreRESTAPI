const mongoose = require('mongoose');

//create schemas for genres

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

// get genres

module.exports.getGenres = (callback, limit) => {
    Genre.find(callback).limit(limit);
};

// add genre to API
module.exports.addGenre = (genre, callback) => {
    Genre.create(genre, callback);
};

//update genre
module.exports.updateGenre = (id, genre, options, callback) => {
    var query = { _id: id };
    var update = {
        name: genre.name
    };

    Genre.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteGenre = (id, callback) => {
    var query = { _id: id};
    Genre.remove(query, callback);
};