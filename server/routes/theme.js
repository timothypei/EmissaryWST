'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Theme = require('../models/Theme');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Intializing.....');
    next();
});


//For client access
router.route('/:user_id/theme')

//post with default values
.post(function(req, res) {

    var theme = new Theme();
    theme.user_id = req.params.user_id; //company or user id
    theme.form_color = "default";
    theme.background_img = "default";
    theme.displayPhone = false;
    theme.displayClock = false;
    theme.displaySignature = false;
    theme.additionalComments = false;

    theme.save(function(err) {
        if (err)
            res.send(err);

        res.json(theme);
    });

})

//get the theme correspond to the user
.get(function(req, res) {
    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err)
            res.send(err);

        res.json(theme);
    });
})

//Edit, when the user save new settings
.put(function(req, res) {

    Theme.findOne({
        user_id: req.params.user_id
    }, function(err, theme) {

        if (err)
            res.send(err);

        theme.user_id = req.params.user_id; //company or user id
        if (req.body.form_color)
            theme.form_color = req.body.form_color;
        if (req.body.background_img)
            theme.background_img = req.body.background_img;
        if (req.body.displayPhone)
            theme.displayPhone = req.body.displayPhone;
        if (req.body.displayClock)
            theme.displayClock = req.body.displayClock;
        if (req.body.displaySignature)
            theme.displaySignature = req.body.displaySignature;
        if (req.body.additionalComments)
            theme.additionalComments = req.body.additionalComments;

        theme.save(function(err) {
            if (err)
                res.send(err);

            res.json(theme);
        });

    });
})

//Delete, when a user unsuscribed from the service
.delete(function(req, res) {

    Theme.remove({
        user_id: req.params.user_id
    }, function(err, theme) {
        if (err)
            res.send(err);

        res.json(theme);
    });


});

module.exports = router;
