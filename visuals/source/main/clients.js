//==============================================//
//========== Communication to Clients ==========//
//==============================================//

// TODO: Create your own 'on connection' callback here
// This is to make sure to know what page (and who) is connected
// This will enable us to not send every message to everybody who is connected

function Clients(server)
{
    this.io = require('socket.io')(server);
    this.events = [];

    this.io.on('connection', (socket) =>
    {
        console.log('[Clients] A client connected with socket ID: ', socket.id);

        this.events.forEach((e) =>
        {
            socket.on(e.eventID, e.callback);
        });
    });
}

Clients.prototype.on = function(eventID, callback)
{
    this.events.push(
    {
        eventID,
        callback
    });
};

Clients.prototype.send = function(eventID, data)
{
    this.io.sockets.emit(eventID, data);
};

Clients.prototype.onConnected = function(callback)
{
    this.io.on('connection', callback);
};

Clients.prototype.changePage = function(pageID)
{
    this.send('change-page', pageID);
};


//===================================//
//========== Export Module ==========//
//===================================//

module.exports = function(server)
{
    return new Clients(server);
};
