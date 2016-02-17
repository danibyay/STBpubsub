'use strict';

//require the database
var redis = require('../lib/redis');

//save badges to database
/*
 * @param {Array} badges
 * @param {Function} callback
 */
exports.save = function(badges, callback){
  //to finish if array is empty
  if(!badges.length) return callback(null, null);
  var badge = badges.pop();
  redis.lpush('badges', JSON.stringify(badge), function(err){
    if(err) return callback(err, null);
    //async recursion for multiple badges
    exports.save(badges, callback);
  });
};
