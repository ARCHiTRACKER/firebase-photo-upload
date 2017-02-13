// node component import
const gcloud = require('google-cloud');
var recursive = require('recursive-readdir');
var toFirebase = require('./toFirebase');

const storage = gcloud.storage({
    projectId: 'architracker-1484317434204',
    keyFilename: './ARCHiTRACKER-e877c8b07a42.json',
});

const bucket = storage.bucket('architracker-1484317434204.appspot.com');

// make sure that the bucket is exists
bucket.exists(function(err, exists) {

    if(exists) {
        recursive('photos',['.DS_Store'],function (err, files) {
            var currentPath = [];

            files.map(function (filePath) {
                var fileName = filePath.split('/');
                fileName = fileName[fileName.length-1];
                var projectCode = filePath.split('/')[1];

                    // upload file
                bucket.upload(filePath, {destination: filePath, public: true}, function (err, file) {
                    if (!err) {
                        var public_path = 'https://storage.googleapis.com/architracker-1484317434204.appspot.com/' + filePath;

                        var photo = {
                            'projectCode': projectCode,
                            'url': public_path,
                            'credit': ''
                        }

                        var firebaseId = toFirebase.createUnder('photos', photo);
                        console.log('"'+firebaseId+'","'+projectCode+'","'+public_path+'",""')
                    }
                });
            });
        });
    }
});
