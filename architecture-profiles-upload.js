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
    var ref;
    if (!data.firebase_id) {
      ref = firebase.createUnder('architecture_profiles', data)  
    } else {
      ref = firebase.setAt('architecture_profiles/'+data.firebase_id, data)
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