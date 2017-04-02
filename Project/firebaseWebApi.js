function Fit3140() {
  this.checkSetup();
  this.initFirebase();
  this.loadMessages();

}

Fit3140.prototype.initFirebase = function () {
    this.database = firebase.database();
    this.storage = firebase.storage();
};


Fit3140.prototype.loadMessages = function () {
    // Reference to the /messages/ database path.
    this.messagesRef = this.database.ref('motionSensorData');
    // Make sure we remove all previous listeners.
    this.messagesRef.off();

    // Loads the last 50 messages and listen for new ones.
    var setMessage = function (data) {
      var val = data.val();
      this.displayMessage( val.longmotion, val.motion, val.shortmotion, val.intrudermotion);
    }.bind(this);
    this.messagesRef.limitToLast(50).on('child_added', setMessage);
    this.messagesRef.limitToLast(50).on('child_changed', setMessage);
};
  

// Saves a new message on the Firebase DB.
Fit3140.prototype.saveMessage = function () {
    // Add a new message entry to the Firebasse Database.
    this.messagesRef.update({
      id: '2',
      longmotion: 10,
      motion: 10, // you can use Date.now()
      shortmotion: 10,
      led: "off"
    }).then(function () {
      console.log('Done')
    }.bind(this)).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });
};

Fit3140.prototype.displayMessage = function ( longmotion, motion, shortmotion, intrudermotion){ 
    document.getElementById('motionlabel').innerHTML = motion;
    document.getElementById('longmotionlabel').innerHTML = longmotion;
    document.getElementById('shortmotionlabel').innerHTML = shortmotion;
    document.getElementById('intrudersmotionlabel').innerHTML = intrudermotion;
};

// Checks that the Firebase SDK has been correctly setup and configured.
Fit3140.prototype.checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
    } else if (config.storageBucket === '') {
      window.alert('Your Firebase Storage bucket has not been enabled.');
    }
};


window.onload = function () {
  window.Fit3140 = new Fit3140();
};