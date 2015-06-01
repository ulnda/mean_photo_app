var mongoose = require('mongoose');
var path 		 = require('path');
var fs       = require('fs');

var Photo = mongoose.model('Photo');

exports.list = function(req, res, next) {
	Photo.find({}, function(err, photos) {
		if (err) return next(err);
		res.render('photos', {
			title: 'Photos',
			photos: photos
		});
	})
};

exports.form = function(req, res) {
	res.render('photos/upload', {
		title: 'Photo upload'
	});
};

exports.submit = function(dir) {
	return function(req, res, next) {
    var img = req.files.photoImage;
    var name = req.body.photoName || img.name;
    var newPath = path.join(dir, img.name);
    fs.rename(img.path, newPath, function(err) {
      if (err) return next(err);

      Photo.create({ name: name, path: img.name }, function (err) {
        if (err) return next(err);
        res.redirect('/');
			}); 
    });
	};
};

exports.download = function(dir) {
	return function(req, res, next) {
		var id = req.params.id;
		Photo.findById(id, function(err, photo) {
			if (err) return next(err);
			var filePath = path.join(dir, photo.path);
			var extension = filePath.substr(filePath.lastIndexOf("."));
			var newName = (photo.name.substr(photo.name.lastIndexOf(".")) == extension) ? photo.name : photo.name + extension;
			res.download(filePath, newName);
		});
	};
}