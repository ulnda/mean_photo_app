var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/mean_photo_app');
var schema = new mongoose.Schema({
  name: 		 String,
  path: 		 String,
  extension: String
});
module.exports = mongoose.model('Photo', schema);