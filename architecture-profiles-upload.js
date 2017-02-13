var csv = require('csv-parser');
var fs = require('fs');
var firebase = require('./toFirebase');
var jsonfile = require('jsonfile')

jsonfile.spaces = 2

var output = {};
var outputFile = 'architectures-firebase.json'; 

fs.createReadStream('architectures-input.csv')
  .pipe(csv())
  .on('data', function (data) {

    var assets = data.assets_photos.split('\n');
    data.assets_photos = {};
    for (var i = assets.length - 1; i >= 0; i--) {
      var asset = assets[i];
      if (asset.length !== 0) {
        data.assets_photos[asset] = true;
      }
    }

    var isLive = (data.is_live == 'true');
    data.is_live = isLive;

    // var ref = Math.random().toString(36).replace(/[^a-z]+/g, '') ;
    if (!data.firebase_id) {
      delete data.firebase_id;
      ref = firebase.createUnder('architecture_profiles', data)  
    } else {
      var firebase_id = data.firebase_id
      delete data.firebase_id;
      ref = firebase.setAt('architecture_profiles/'+firebase_id, data)
    }

    var clone = Object.assign({}, data);
    delete clone.firebase_id;
    output[ref] = clone;
    console.log(ref);
  })
  .on('end', function () {
  	jsonfile.writeFile(outputFile, output, function (err) {
  		console.error(err)
	})
  });