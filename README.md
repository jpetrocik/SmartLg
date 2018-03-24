# SmartLg
Controls LG TV using the RS232 serial control interface as part of a home automation network based on MQTT.  Messages arrive on a mqtt topic are forwarded to the TV via serial port.  I'm currently using a bluetooth serial adaptor to send serial command to the LG TV. Many LG TV support RS232 controls, see manuals/ for full details.  

This project is part of a larger SmartHome suite of applications to seamlessly bridge disparate and proprietary products into an integrated solution.  Rather then integrating every product into a monolithic solution or develop another proprietary solution, SmartHome suite applications uses the IoT standard MQTT based messages.  Focusing SmartLg on MQTT messages to control the TV this solution can be integrated with other home automation solution beside SmartHome and mobile apps that already support MQTT for controlling devices.

## Setup
Since most do not have a computer connected to there TV to send the serial command I use a Bluetooth-to-Serial adaptor, that costs about $10 on ebay.  With that plugged in I can send commands from anywhere within bluetooth range.  There are many good tutorials on configuration bluetooth and setting up the serial adaptor for Linux.  Since the Bluetooth-to-Serial adaptor is nothign more then a virtual serial port, this project should works with any serial contection to the TV.

## Configuration
Edit the config.json file to point the mqtt server, topic to listen on for commands, and serial port creating during setup.

## Running ##
nodejs lib/server.js

## Example Message ##
While the documentation for LG serial interfaace is will documented in the manuals I'll include a few notes.

* Everything is transfered in ASIIC.  So for example the change number is tarnsfered in HEX representation but using ASIIC.  So a message to swtich to channel 13 would look like: ma 01 0D 00 0D 00 01 22.  Notice the 0D is the hex representation but the message is a 0 and D asiic character

* The topic message does not need to contain the "\r" at the end of the message, the server will append it.

Random Examples:
Switch Input To Hdmi: kb 01 08
Switch input to TV: kb 01 00
Swithc to channel ATSC 2.1: ma 01 02 00 02 00 01 22

