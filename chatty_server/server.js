// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log('Transmitting Data');
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function (ws) {

  console.log('WSS CLIENTS: ', wss.clients.size);
  wss.broadcast(wss.clients.size);
  ws.on('error', (error) => {
    console.log('error');
  })

  let cliendId = uuid();
  console.log('Client connected ', cliendId);

  let color = ['red', 'blue', 'green', 'purple'];
  let randColor = color[Math.floor(Math.random() * color.length)];
  wss.clients.forEach(function each(client) {
    console.log('Sending Color', color);
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(color));
    }
  });

  ws.on('message', function incoming(message) {
    let object = JSON.parse(message)
    console.log(object);
    object.id = uuid();
    if (object.type === 'postMessage') {
      object.type = 'incomingMessage'
    } else if (object.type === 'postNotification') {
      object.type = 'incomingNotification'
    }
    console.log(object);
    wss.broadcast(JSON.stringify(object));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', function() {
    console.log('Client disconnected');
    console.log('WSS CLIENTS: ', wss.clients.size);
    wss.broadcast(wss.clients.size);
  });

});