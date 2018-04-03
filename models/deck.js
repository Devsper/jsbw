const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Schema.Types.ObjectId, ref: "User",
        required: true
    }
});

var Deck = module.exports = mongoose.model('Deck', DeckSchema, "decks");

module.exports.getAllPublicDecks = function(callback){
    
    let searchQuery = { isPublic: true }

    Deck.find(searchQuery, callback)
        .populate('createdBy', 'username')
}

module.exports.getAllUserDecks = function(id, callback){

    let searchQuery = {createdBy: id}

    Deck.find(searchQuery, callback)
        .populate('createdBy', 'username');
}

module.exports.getDeck = function(id, callback){
    
    let searchQuery = {_id: id};
    Deck.find(searchQuery, callback);
}

module.exports.addDeck = function(newDeck, callback){

    newDeck.save(callback);
}

module.exports.deleteDeckById = function(id, callback){

    let searchQuery = {_id: id};
    Deck.remove(searchQuery, callback);
}

///// Behöver uppdateras
module.exports.updateDeckById = function(id, updateData, callback){
    
    let query = {_id: id};
    
    Deck.findOne(query, function(err, foundDeck){

        foundDeck.name = updateData.name;
        foundDeck.isPublic = updateData.isPublic;
        foundDeck.cards = updateData.cards;
        
        foundDeck.save(callback);
    })
}

module.exports.updateSingleCard = function(){

}