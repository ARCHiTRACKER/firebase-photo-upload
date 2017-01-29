var admin = require("firebase-admin");

var serviceAccount = require("./ARCHiTRACKER-e877c8b07a42.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://architracker-1484317434204.firebaseio.com"
});

var db = admin.database();
var photosRef = db.ref("photos");

function uploadToFirebase(photo) {
  var photoRef = photosRef.push(photo);
  return photoRef.key;
}

module.exports = uploadToFirebase;
