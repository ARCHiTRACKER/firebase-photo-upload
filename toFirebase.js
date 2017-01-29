var admin = require("firebase-admin");

var serviceAccount = require("./ARCHiTRACKER-e877c8b07a42.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://architracker-1484317434204.firebaseio.com"
});

var db = admin.database();

function createUnder(parentRef, data) {
  var parentRef = db.ref(parentRef);
  var itemRef = parentRef.push(data);
  return itemRef.key;
}

function setAt(location, data) {
	var itemRef = db.ref(location).set(data);
	return itemRef.key;
}

module.exports = {
	'createUnder': createUnder,
	'setAt': setAt
}
