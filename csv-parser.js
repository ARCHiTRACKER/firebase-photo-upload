var csv = require('csv-parser')
var fs = require('fs')
var jsonfile = require('jsonfile')

jsonfile.spaces = 2
var output = {};
var outputFile = 'photo-firebase.json'; 

fs.createReadStream('photo-input.csv')
  .pipe(csv())
  .on('data', function (data) {

  	output[data.firebase_id] = {
  		'project_code': data.project_code,
  		'url': data.url,
  		'credit': data.credit
  	}
    console.log(data.firebase_id)
  })
  .on('end', function () {
  	jsonfile.writeFile(outputFile, output, function (err) {
  		console.error(err)
	})
  });