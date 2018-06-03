var passport = require('passport');
var mongoose = require('mongoose');
var Tap = mongoose.model('Tap');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.saveScore = function(req, res) {
  if(!req.body.email || !req.body.points) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var tap = new Tap();

  console.log(req.body);

  tap.score = req.body.points;
  tap.user = req.body.email;
  tap.date = new Date();

  tap.save(function(err) {
    res.status(200);
    res.json({
      "tap" : tap
    });
  });

};

module.exports.getScores = function(req, res) {
  var allScores = [];
  Tap
    .find()
    //.sort([['date', -1]])
    .exec(function(err, scores) {
      scores.map((score) => {
        User.findOne({ email: score.user }, function (err, user) {
          allScores.push({
            date: score.date,
            score: score.score,
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email
            }
          });
          if(allScores.length == scores.length){
            res.status(200);
            res.json(allScores);
          }
        });
      });
  });
}
