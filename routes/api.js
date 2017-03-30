const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    res.send({
        type: 'get'
    });
});

// add a new ninja to the db
router.post('/ninjas', function(req, res, next){

    // create a new ninja instance then save to db
    Ninja.create(req.body).then(function(ninja){

        res.send(ninja);

        // res.send({
        //     type: 'post',
        //     name: req.body.name,
        //     rank: req.body.rank
        // });

        // error handling
    }).catch(next);
});

// update a ninja in the db
// :id is like a variable
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({ _id: req.params.id}, req.body).then(function(){

        // find updated value, otherwise it'll just return the old value
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        })
    });
    // res.send({
    //     type: 'put'
    // });
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){

    // req.params.id - access id

    Ninja.findByIdAndRemove({ _id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });

    // res.send({
    //     type: 'delete'
    // });
});

// export router object to be used elsewhere
module.exports = router;
