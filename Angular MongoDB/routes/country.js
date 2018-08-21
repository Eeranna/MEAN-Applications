var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Country = require('../models/country');

router.get('/', function (req, res, next) {
    Country.find()
         .exec(function (err, countries) {
             if (err) {
                  return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
               country: 'Success',
                obj: countries
             });
         });
});
module.exports = router;

/*
function getCountries(){
    const result = Country.find();
    console.log('countreis is '+result);
}
getCountries();*/
