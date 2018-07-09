//require dotenv
require('now-env')

const express = require('express'),
      app = require('express')(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
  mongo = require('mongodb').MongoClient
var urlMongo = process.env.DB_URL,
  numClient = 0

// engine setup
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// middleware
app.use(express.static(__dirname + '/static'));

mongo.connect(urlMongo,{useNewUrlParser: true}, function(err, database) {
  console.log("Connected successfully to server");
  let dbCore = database.db(process.env.DB_NAME)
  var messagesCollection = dbCore.collection('messages')

  io.on('connection', (socket) => {
    var addedClient = false
    var currentdate = new Date()
    numClient++
    socket.username = 'Anonymous ' + currentdate.getDay() + numClient + currentdate.getMilliseconds()
    socket.emit('get_data', {
      numClient: numClient
    })

    messagesCollection.find().limit(100).sort({_id:1}).toArray((err, res) =>{
      if(err){
        throw err
      }
      socket.emit('chat_history', res)
    })

    // BC globaly that some Boiiii connected to our server
    socket.broadcast.emit('user_joined', {
      username: socket.username,
      numClient: numClient,
      timeHour: currentdate.getHours().toLocaleString(),
      timeMin: currentdate.getMinutes().toLocaleString(),
      timeSec: currentdate.getSeconds().toLocaleString()
    })

    // chat behavior to self
    socket.on('chat_message', (data) => {
      messagesCollection.insertOne({
        text: data.message,
        user: socket.username
      }, function(err,res){
        console.log('inserted aS')
      })
      io.sockets.emit('chat_message', {
        message: data.message,
        username: socket.username
      })
    })

    // chat clear command
    socket.on('clear', (data) =>{
      messagesCollection.remove({}, () =>{
        // emiting to client command
        console.log('cleared')
        socket.emit('cleared')
        socket.broadcast.emit('cleared')
      })
    })

    // typing behavior
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', {
        username: socket.username
      })
    })
    // disconnect info
    socket.on('disconnect', () => {
      numClient--
      socket.broadcast.emit('user_left', {
        username: socket.username,
        numClient: numClient,
        timeHour: currentdate.getHours().toLocaleString(),
        timeMin: currentdate.getMinutes().toLocaleString(),
        timeSec: currentdate.getSeconds().toLocaleString()
      })
    })
  })
});

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})