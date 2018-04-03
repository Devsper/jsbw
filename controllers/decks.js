const express = require('express');
const router = express.Router();
const Deck = require('../models/deck');

//GET HTTP method to /flashcard
router.get('/', function(req,res, next){

    Deck.getAllPublicDecks(function(err, decks){
        if(err){

            res.json({success:false, message: 'Failed to load decks'});
        }else{

            res.write(JSON.stringify({success: true, decks:decks},null,2));
            res.end();  
        }

    });
});

router.get('/:id', function(req, res){

    var id = req.params.id; 

    Deck.getDeck(id, function(err, deck){

        if(err){
            res.json({success:false, message: 'Failed to load deck'})
        }else{
            res.write(JSON.stringify({success: true, decks: deck},null,2));
            res.end();  
        }

    });
});

router.get('/user/:id', function(req, res){
    
    var id = req.params.id;

    Deck.getAllUserDecks(id, function(err, decks){

        if(err){
            res.json({success:false, message: 'Failed to load decks'});
        }else{

            res.write(JSON.stringify({success: true, decks:decks},null,2));
            res.end();  
        }

    });

});

//POST HTTP method to /flashcard
router.post('/', function(req,res,next) {

    var newDeck = new Deck({
        name:       req.body.name,
        isPublic:   req.body.isPublic,
        cards:      req.body.cards,
        createdBy:  req.body.createdBy
    });

    Deck.addDeck(newDeck, function(err, deck){

        if(err){
            res.json({success: false, message: "Failed to create a new deck."});
        }else{
            res.json({success:true, message: "Deck added successfully.", id: deck._id});
        } 
    });
});

router.put('/:id', function(req, res){

    let id = req.params.id;
    let sentDeck = req.body;

    var updateDeck = new Deck({
        name:       sentDeck.name,
        isPublic:   sentDeck.isPublic,
        cards:      sentDeck.cards
    });

    Deck.updateDeckById(id, updateDeck, function(err, deck){

        if(err){
            res.json({success:false, message: "Failed to update list."})
        }else{
            res.json({success: true, message: "Deck updated successfully", id: deck._id});
            res.end();   
        }
    });
});


//DELETE HTTP method to /flashcard. Here, we pass in a params which is the object id.
router.delete('/:id', function(req,res,next) {
    
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    
    //Call the model method deleteListById
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