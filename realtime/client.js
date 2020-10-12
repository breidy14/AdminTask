const io = require('socket.io-client');

//aqui conectamos al servidor como cliente a la web socket
//recuerda que aunque http y webSocket esten en el mismo proyecto hay que conectarlas de algun modo ya que son dos cosas distitas
let host = 'http://localhost:3000';

if(process.env.NODE_ENV && process.env.NODE_ENV == 'production'){
    host = 'https://limitless-beach-25179.herokuapp.com/'; 
}

let socket = io.connect(host,{reconnect: true});

socket.on('connect',function(){
    console.log("\nSocket connected from NodeJs\n");
})

module.exports = socket;