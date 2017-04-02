# Arduino/PIR Motion Sesnor. IOT Control Panel

### About the project
The web page application is develop to control the Arduino board and clients' request. The web page has the following functions: 
1) Switch LED on/off 
2) Switch motion on/off
3) Total number of motion detected by motion sensor
4) Total number of long motion detected by motion sensor
5) Total number of short motion detected by motion sensor
6) Total number of intruders detected by motion sensor
7) Reset all total numbers

### Structures
The structure of this project consist of the following components: 
1) __Johnny five__
Johnny-Five is the JavaScript Robotics & IoT Platform. Released by Bocoup in 2012. It communicaets with the board in whatver language that the platform speaks. In this project, it is implemented using Node.js. 
2) __HTML/CSS__
The GUI on the client side is created by using HTML and CSS. The HTML communicate with node.js file when actions apply on the page
3) __node.js__
A file that consist all the actions of the board. By receiving information from the HTML, it triggers the action of the board then send informations back to html. 
4) __Google Firebase__
uses the Google Firebase real time DB as a communication platform. The firebase allows the developer to store data and synchronize data across several clients.

## Get Started
#### Setting up the board
Step 1 
Connect motion sensor (PIR) to Arduino board
 - Out (PIR) -> Port 2 of Digital I/O Pins
 - VCC (PIR) -> Power supply 5V
 - GND (PIR) -> Power supply GND

Step 2
Connect LED
- Positve (LED) -> Port 13 of Digital I/O Pins
- Negative (LED) -> GND of DIgital I/O Pins

Step 3 
Plug in USB to computer/laptop

Step 4 
Open two terminal 
Create directory to the located file 

Step 5
In the first terminal, run:
```sh
$ firebase serve
```

In the second terminal, run:
```sh
$ node server.js
```

The server is available at this URL: locahost:5000
Open a browser and paste this URL. 

### Installation
Open Arduino IDE
Open __file__ -> __Examples__ -> __Firmata__ -> __StanadardFirmata__
Click on "__Upload__"
_Note: Make sure the upload is successful._

Use LXTerminal and open the directory where the folder is located. 
Install...

```sh
$ npm install express --save
$ npm install johnny-five --save
$ npm install socket.io --save
```

### To host the server 
1. After the installation. Use LXTerminal and open the directory where the folder is located. 
2. Type in the following code:
    ```s
    $ node server.js
    ```
3. Open this URL: http://localhost:3000 in a browser after "Motion connected" is printed out in the terminal.

### Using the control panel 
The control panel is built in a table form which consist of seven rows. Each rows has it's own functionality. 
1. __LED on/off switch__
By switching on the toggle switch, it lights up the LED on the board. 
By switching off the toggle switch, it lights off the LED on the board. 
2. __Motion Sensor on/off switch__
By switching on the toggle switch, it starts reading motion. 
By switching off the toggle switch, it stops reading motion. 
3. __Motion detected counter__
Counts the number of motion detected by the sensor. 
4. __Long motion counter__
Counts the long motion detected by the sensor for any movement that is longer than 7 seconds.
5. __Short motion counter__
Counts the short motion detected by the sensor for any movement is shorter or equals to 7 seconds.
6. __Intruders counter__
It is consider as an intrusion movement when four consecutive motion of _"Long Short Long Long"_ is detected by motion. Therefore, it wlll counts intruders when there is an intrusion movement.
7. __Reset button__
Reset all the counters to zero and delete all the data in the database.

## Reference 
1.Johhny-five
URL: http://johnny-five.io
2.Fit3140 wiki from moodle
URL: https://sites.google.com/a/monash.edu/fit3140/socket-io-and-iot


