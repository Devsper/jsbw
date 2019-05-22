const express = require('express');
const router = express.Router();
const Deck = require('../models/deck');

// Code runs on GET-requests on url '/decks'
// fetches all public decks
router.get('/', function(req,res, next){

    // Calls mongoose model method
    Deck.getAllPublicDecks(function(err, decks){

        if(err){
            res.json({success:false, message: 'Failed to load decks'});
        }else{

            // Sends back all decks that are public
            res.write(JSON.stringify({success: true, decks:decks},null,2));
            res.end();  
        }
    });
});

// Code runs on GET-requests on url '/decks/{deck id}'
// A single deck from ID
router.get('/:id', function(req, res){

    // ID from url
    var id = req.params.id; 

    // Calls mongoose model method
    Deck.getDeck(id, function(err, deck){

        if(err){
            res.json({success:false, message: 'Failed to load deck'})
        }else{
            // Sends back single deck from database
            res.write(JSON.stringify({success: true, decks: deck},null,2));
            res.end();  
        }
    });
});

// Code runs on GET-requests on url '/decks/user/{deck id}'
// fetches all decks from specifik user
router.get('/user/:id', function(req, res){
    
    // ID from url
    var id = req.params.id;

    // Calls mongoose model method
    Deck.getAllUserDecks(id, function(err, decks){

        if(err){
            res.json({success:false, message: 'Failed to load decks'});
        }else{
            // Sends back all user decks
            res.write(JSON.stringify({success: true, decks:decks},null,2));
            res.end();  
        }
    });
});

// Code runs on POST-request on url '/decks'
// Creates new deck
router.post('/', function(req,res,next) {

    // Creates a new deck from model with parameters sent
    var newDeck = new Deck({
        name:       req.body.name,
        isPublic:   req.body.isPublic,
        cards:      req.body.cards,
        createdBy:  req.body.createdBy
    });

    // Calls mongoose model method
    Deck.addDeck(newDeck, function(err, deck){

        if(err){
            res.json({success: false, message: "Failed to create a new deck."});
        }else{
            // Sends back success response and deck id
            res.json({success:true, message: "Deck added successfully.", id: deck._id});
        } 
    });
});

// Code runs on PUT-request on url '/decks/{deck id}'
// Updates existing deck
router.put('/:id', function(req, res){

    // Extracts sent parameters to variables
    let id = req.params.id;
    let sentDeck = req.body;

    // Creates a new deck from model with parameters sent
    var updateDeck = new Deck({
        name:       sentDeck.name,
        isPublic:   sentDeck.isPublic,
        cards:      sentDeck.cards
    });

    //Calls mongoose model method
    Deck.updateDeckById(id, updateDeck, function(err, deck){

        if(err){
            res.json({success:false, message: "Failed to update list."})
        }else{
            // Sends back success response and deck id
            res.json({success: true, message: "Deck updated successfully", id: deck._id});
            res.end();   
        }
    });
});


// Code runs on DELETE-request on url '/decks/{deck id}'
// Deletes existing deck
router.delete('/:id', function(req,res,next) {
    
    // Extracts sent parameters to variables
    let id = req.params.id;
    
    //Call the mongoose model method
    Deck.deleteDeckById(id, function(err, deck) {
        if(err) {
            res.json({success:false, message: "Failed to delete deck."});
        }
        else if(deck) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success: false});
    })

}); 

module.exports = router; 