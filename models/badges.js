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

//Trim down the redis listen
exports.trim = function(){
  redis.ltrim('badges', 0, 9);
};

/* Send out badges to the broadcaster
 * @param {Array} badges
 * @param {Function} callback
 */

 exports.send = function(badges, callback){
   badges.forEach(broadcast.send);
   /* same as
   * badges.forEach(function(badge){ broadcast.send(badge); });
   */
   callback(null, null);
   //we're not calling the callback, but maybe in the future we'll
   //want to, and for now the method is ready
 };
