var Queue = require('firebase-queue'),
    Firebase = require('firebase'),
    Filter = require('bad-words');

var filter = new Filter();
var ref = new Firebase('https://sanichat.firebaseio.com/');
ref.authWithCustomToken('<your-token-here>', function(err, authData){
    if (err) {
      console.log("Login failed with error: ", error);
    } else {
      console.log("Authenticated successfully with payload: ", authData);
    }
});
var queue = new Queue(ref, function(data, progress, resolve, reject) {
  data.message = filter.clean(data.message);
  ref.child('messages').push(data, function(err){
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
  });
});
