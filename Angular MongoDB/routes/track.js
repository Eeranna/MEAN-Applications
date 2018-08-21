var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Track = require('../models/track');

router.post('/', function (req, res, next) {
    var track = new Track({
        name: req.body.name,
        id: req.body.id
    });
    track.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            track: 'Track Inserted',
            obj: result
        });
    });
});

router.get('/', function (req, res, next) {
    Track.find()
        .exec(function (err, tracks) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                track: 'Success',
                obj: tracks
            });
        });
});

router.patch('/:id', function (req, res, next) {
    Track.findById(req.params.id, function (err, track) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!track) {
            return res.status(500).json({
                title: 'No Track Found!',
                error: {track: 'Track not found'}
            });
        }
        track.name = req.body.name;
        track.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                track: 'Updated track',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Track.findById(req.params.id, function (err, track) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!track) {
            return res.status(500).json({
                title: 'No Track Found!',
                error: {track: 'Track not found'}
            });
        }
        track.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                track: 'Deleted track',
                obj: result
            });
        });
    });
});

module.exports = router;