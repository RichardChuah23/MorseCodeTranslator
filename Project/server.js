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
var refmotion = db.ref("/motionData"); // for motion
var refreset = db.ref("/resetData"); // for motion
var refled = db.ref("/ledData"); // channel name



var express = require('express');  
var app = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var board = new five.Board();
var port = 3000; 


motioncounter = 0 ;
longmotioncounter = 0; 
shortmotioncounter = 0; 
intrudercounter = 0 ; 

/** 
ref.push({

        motion: motioncounter,  
        longmotion: longmotioncounter,
        shortmotion: shortmotioncounter,
        intrudermotion: intrudercounter,

    });
refmotion.update({
    motion:"off",
})*/

refmotion.update({
    motion:"off",
})

refled.update({
    led:"off",
})



ref.on('child_added', function(snapshot) {
      motioncounter = snapshot.val().motion; 
      longmotioncounter = snapshot.val().longmotion; 
      shortmotion = snapshot.val().shortmotion; 
      intrudercounter = snapshot.val().intrudermotion; 
});

refmotion.on("value", function(snapshot) {   //this callback will be invoked with each new object
    var key  = snapshot.val().motion;
    toggle = key; 
    }, function (errorObject) {             // if error
    console.log("The read failed: " + errorObject.code);
});

b = []  //array to store the list of motion. to find intruder

refreset.update({
    reset:"false",
});

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

        if(toggle==1){ 
            motioncounter++;
        
        };
    
        if(sec > 7) {
            console.log("This is a long motion"); 

            if(toggle==1){ 
                longmotioncounter++;

                b.push("long"); 
                b = checkintruder(b); 

                if(b=="intruder"){ 
                    intrudercounter++; 
                    console.log("INTRUDER!")
                    b=[] ; 
                }
                
                ref.push({
                    motion: motioncounter,  
                    longmotion: longmotioncounter,
                    shortmotion: shortmotioncounter,
                    intrudermotion: intrudercounter,
            });
            }
        } else {
            console.log("This is a short motion");

            if(toggle == 1) { 
                b.push("short"); 
                b = checkintruder(b); 
                shortmotioncounter++;
                ref.push({
                    motion: motioncounter,  
                    longmotion: longmotioncounter,
                    shortmotion: shortmotioncounter,
                    intrudermotion: intrudercounter,
                });
            };
        }
    });

    // Led On/Off 
    refled.on("value", function(snapshot) {   //this callback will be invoked with each new object
        var key  = snapshot.val().led;
        if(key == "on") { 
            led.on(); 
        }else{ 
            led.off();
        }; 
    }, function (errorObject) {             // if error
        console.log("The read failed: " + errorObject.code);
    });

    //motion On/Off 
    refmotion.on("value", function(snapshot) {   //this callback will be invoked with each new object
        var key  = snapshot.val().motion;
        if(key == "on") { 
            toggle = 1;
            console.log("change toogle to 1");
        }else{
            toggle = 0;
        }; 
    }, function (errorObject) {             // if error
        console.log("The read failed: " + errorObject.code);
    });

    // Reset clicked 
    refreset.on("value", function(snapshot) {   //this callback will be invoked with each new object
        var key  = snapshot.val().reset;
        if(key == "true") { 
            ref.remove();
            ref.push({
                motion: motioncounter=0,  
                longmotion: longmotioncounter=0,
                shortmotion: shortmotioncounter=0,
                intrudermotion: intrudercounter=0,
            });
        };
        refreset.update({
            reset: "false" ,
        });
    }, function (errorObject) {             // if error
        console.log("The read failed: " + errorObject.code);
    });
}); 

// Function to find  the intruder 
function checkintruder(b) {
    var a = ["long", "short", "long", "long"] ; 
    var counter = 0; 
    while (counter < b.length) {
        //When the array is full, shows that there is an intruder
        if(a[counter] == b[counter]) { 
            if (counter == 3 ) {
                b = []; 
                return "intruder" ;
            }
            counter ++ ; 
        }else{ 
            //Place the long at the first of the array. 
            if(b[counter] != "long"){
            b = []; 
            return b; 
            }else {
                b = []; 
                b.push("long") ; 
                return b; 
            }
        }
    }
    return b;
};
 