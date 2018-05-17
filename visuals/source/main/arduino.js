//==============================================//
//========== Private Shared Constants ==========//
//==============================================//

const SerialPort = require('serialport');
const BAUD_RATE = 9600;
const DATA_DELIMITER = ',';
const DATA_ENDLINE = '\n';
const OPEN_TIMEOUT = 2000;


//=================================//
//========== Constructor ==========//
//=================================//

function Arduino(port)
{
    console.log('[Arduino] Initializing arduino serial communication on port ' + port + '.');

    this.port = port;

    this.serial = new SerialPort(this.port,
    {
        baudRate: BAUD_RATE,
        autoOpen: false
    });

    this.parser = this.serial.pipe(new SerialPort.parsers.Readline());

    this.serial.on('open', () =>
    {
        console.log('[Arduino] Serial port ' + this.port + ' opened!');
    });

    this.serial.on('close', () =>
    {
        console.log('[Arduino] Serial port ' + this.port + ' closed.');

        this.open();
    });

    this.open();
}


//==========================//
//========== Open ==========//
//==========================//

Arduino.prototype.open = function()
{
    //console.log('[Arduino] Trying to open arduino serial port ' + this.port + '.');

    this.serial.open((error) =>
    {
        if (error) setTimeout(() =>
        {
            this.open();
        }, OPEN_TIMEOUT);
    });
};


//=======================================//
//========== Send Control Data ==========//
//=======================================//

Arduino.prototype.sendControlData = function(controlData)
{
    var dataString = controlData.control.toString();

    controlData.data.forEach((value) =>
    {
        dataString += DATA_DELIMITER + value.toString();
    });

    dataString += DATA_ENDLINE;

    //console.log('[Arduino] Sending arduino control data on serial port ' + this.port + ' as string: ', dataString);

    this.serial.write(dataString);
};


//=========================================//
//========== Receive Sensor Data ==========//
//=========================================//

Arduino.prototype.receiveSensorData = function(onSensorData)
{
    this.parser.on('data', (dataString) =>
    {
        //console.log('[Arduino] Received arduino sensor data on serial port ' + this.port + ' as string: ', dataString);

        var stringArray = dataString.split(DATA_DELIMITER);

        var sensorData = {
            sensor: parseInt(stringArray[0]),
            data: []
        }

        stringArray.slice(1, stringArray.length).forEach((value) =>
        {
            sensorData.data.push(parseInt(value));
        });

        onSensorData(sensorData);
    });
};


//===================================//
//========== Export Module ==========//
//===================================//

module.exports = Arduino;
