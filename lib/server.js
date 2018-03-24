var mqtt = require('mqtt');
var SerialPort = require('serialport');
const fs = require('fs');

var config = require('./config.json');


var port = new SerialPort(config.serialPort);
var mqttServerUrl = config.mqttServerUrl;
var commandTopic = config.commandTopic;

port.on('error', function(err) {
  console.log('Error: ', err.message);
})



var processCommand = function(command) {
	command += '\r';
	port.write(command, function(err) {
	  if (err) {
	    return console.log('Error sending coommand.', err.message);
	  }
	});
};

// setup mqtt
var mqttOptions;
if (mqttServerUrl.indexOf('mqtts') > -1) {
	mqttOptions = { key: fs.readFileSync(path.join(__dirname, 'mqttclient', '/client.key')),
		cert: fs.readFileSync(path.join(__dirname, 'mqttclient', '/client.cert')),
		ca: fs.readFileSync(path.join(__dirname, 'mqttclient', '/ca.cert')),
		checkServerIdentity: function() { return undefined }
	}
}

console.log("Connecting to " + mqttServerUrl);
var mqttClient = mqtt.connect(mqttServerUrl, mqttOptions);
mqttClient.on('connect', function() {
		console.log("Connected to " + mqttServerUrl);
		console.log("Subscribing to " + commandTopic);
		mqttClient.subscribe(commandTopic);
	});

mqttClient.on('message', function(topic, message) {
	console.log("Message recieved on " + topic);
		var command = message.toString();
		processCommand(command);
	});
