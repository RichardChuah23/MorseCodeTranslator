var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assignment-2-d4946.firebaseio.com/"  // IMPORTANT: repalce the url with yours 
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/motionSensorData"); // channel name
ref.on("value", function(snapshot) {   //this callback will be invoked with each new object
  console.log(snapshot.val());         // How to retrive the new added object
}, function (errorObject) {             // if error
  console.log("The read failed: " + errorObject.code);
});




var express = require('express');  
var app = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var board = new five.Board();
var port = 3000; 
longmotioncounter = 0;
shortmotioncounter = 0;
motioncounter = 0;
motionid = 0; 



ref.push({
    id:motionid,
    type:'motion',
    motion: motioncounter,  
    longmotion: longmotioncounter,
    shortmotion: shortmotioncounter,

})


app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);  
console.log('Set up completed !. Server hosted @ http://localhost:' + port);

// Create a instance for led and motion
var led;
var motion; 


board.on("ready", function() {
    console.log('Arduino connected');
    led = new five.Led(13);
    console.log('LED connected');

    motion = new five.Motion(2);
    console.log('Motion connected');


motion.on("motionstart", function() {
        console.log("Motion start");
        start = new Date();
        });
        

motion.on("motionend", function(){
    console.log("Motion ended");
    end = new Date();    
    sec = (end-start)*(0.001);
    sec = Math.round(sec*10)/10 ;
    console.log(sec);
    motioncounter++;

    if(sec > 7) {
        console.log("This is a long motion"); 
        longmotioncounter++;
        
        ref.push({
            id:motionid,
            type:'motion',
            motion: motioncounter,  
            longmotion: longmotioncounter,
            shortmotion: shortmotioncounter,
        
    });
        
        
    }else {
        console.log("This is a short motion");
        shortmotioncounter++;

        ref.push({
            id:motionid,
            type:'motion',
            motion: motioncounter,  
            longmotion: longmotioncounter,
            shortmotion: shortmotioncounter,
        
    });
        
    }
});

}); 

