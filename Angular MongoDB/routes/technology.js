var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Technology = require('../models/technology');

router.get('/', function (req, res, next) {
    Technology.find()
        .exec(function (err, technologies) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                Technology: 'Success',
                obj: technologies
            });
        });
});
module.exports = router;