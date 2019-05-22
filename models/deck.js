const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose schema for decks 
// Creates a structure for a mongo-collection 
var DeckSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    cards: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            required: true,
            default: Date.now
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId, ref: "User", // Refer to a existing user
        required: true
    }
});

// Exports deck model
var Deck = module.exports = mongoose.model('Deck', DeckSchema, "decks");

// Fetches all public decks from database
module.exports.getAllPublicDecks = function(callback){
    
    let searchQuery = { isPublic: true }

    // Fetches decks and its creator
    Deck.find(searchQuery, callback)
        .populate('createdBy', 'username')
}

// Fetches all decks from a specifik user
module.exports.getAllUserDecks = function(id, callback){

    let searchQuery = {createdBy: id}

    // Fetches decks and its creator
    Deck.find(searchQuery, callback)
        .populate('createdBy', 'username');
}

// Fetches a single deck
module.exports.getDeck = function(id, callback){
    
    let searchQuery = {_id: id};
    Deck.find(searchQuery, callback);
}

// Saves a deck to database
module.exports.addDeck = function(newDeck, callback){

    newDeck.save(callback);
}

// Deletes deck from database
module.exports.deleteDeckById = function(id, callback){

    let searchQuery = {_id: id};
    Deck.remove(searchQuery, callback);
}

// Updates deck in database
module.exports.updateDeckById = function(id, updateData, callback){
    
    let query = {_id: id};
    
    // Finds deck and updates it with new values
    Deck.findOne(query, function(err, foundDeck){

        foundDeck.name = updateData.name;
        foundDeck.isPublic = updateData.isPublic;
        foundDeck.cards = updateData.cards;
        
        foundDeck.save(callback);
    })
}
