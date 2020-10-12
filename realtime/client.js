const io = require('socket.io-client');

//aqui conectamos al servidor como cliente a la web socket
//recuerda que aunque http y webSocket esten en el mismo proyecto hay que conectarlas de algun modo ya que son dos cosas distitas
let socket = io.connect('http://localhost:3000',{reconnect: true});

socket.on('connect',function(){
    console.log("\nSocket connected from NodeJs\n");
})

module.exports = socket;