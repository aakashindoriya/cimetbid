const mongoose = require('mongoose');

const blackList = new mongoose.Schema({
  token:String
});

module.exports = mongoose.model('blacklist', blackList);