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
		//return res.json({ title: req.files.photoImage })

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