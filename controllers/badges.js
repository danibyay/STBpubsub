'use strict';

var _ = require('underscore');
var model = require('../models/badges');

//send badges to model
exports.save = function(req, res, next){
  var badges = _.clone(req.body); //instead of referencing
  model.save(badges, function(err){
    if(err) {return res.json(503, {error : true });}
    next();
    model.trim();
  });
};


//send badges to put/sub socket in model
exports.send = function(req, res, next){
  var badges = _.clone(req.body);
  model.send(badges, function(err){
    if(err) {return res.json(503, {error : true });}
    res.json(200, { error: null });
  });
};
