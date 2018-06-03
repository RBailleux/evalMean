var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var tapSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

mongoose.model('Tap', tapSchema);
