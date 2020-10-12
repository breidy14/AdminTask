const express = require('express');
const boyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');
const socketio = require('socket.io');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const categoriesRoutes = require('./routes/categories_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');

const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

app.use(boyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

let sessionConfig = {
    secret:['1234asdfre','12345qwerty'],
    saveUninitialized: false,
    resave: false
}
//confogurando la sessiones para produccion
if(process.env.NODE_ENV && process.env.NODE_ENV == 'production'){
    sessionConfig['store'] = new (require('connect-pg-simple')(session))();
}

app.use(session(sessionConfig));
//Los middleware se ejecutan en el orden que los pones en el archivo de conf en este caso 1ro va el de sessions y luego findUserMiddleware
app.use(findUserMiddleware);
app.use(authUser);

app.use(tasksRoutes);
app.use(categoriesRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);

app.get('/home',function(req,res){
    res.render('home', {user: req.user});
})

// POST http://localhost:3000/tasks/3?_method=PUT
// Asi se sustituye una petición POST, por una PUT||PATH||DELETE, ya que los navegadores solo trabajan con POST y GET usando el method-override

let server = app.listen(process.env.PORT || 3000);
let io = socketio(server);
let sockets = {};
let usersCount = 0;


io.on('connection',function(socket){
    let userId = socket.request._query.loggeduser; //obtenemos a usuario logueado que pasamos a la socket en la configuraciond desde el cliente
    if(userId) sockets[userId] = socket; //guardamos en el json sockets el usuario, para acceder a el mediante sockets[1]
    console.log(sockets);
    
    //actualiza usuarios en tiempo real
    usersCount++;
    io.emit('count_updated',{count: usersCount});

    socket.on('new_task',function(data){
        if(data.userId){
            console.log(data);
            let userSocket = sockets[data.userId];
            if(userSocket) userSocket.emit('new_task',data);//esto hace que solo a esa socket se le envie los datos           
            
            return;
        }
    })

    socket.on('disconnect',function(){
        //los obj Object tine el metodo keys que al pasarle un json obtine todas las claves del obj
        //así que la recorremos y luego la comparamos con la propiedad,
        //que tienen las sockets que es sockets.id,
        //si es verdadero entoces buscamos en el json sockets el id evaluado y lo volvemos null, para eliminar la sockets
        Object.keys(sockets).forEach(userId=>{
            let s = sockets[userId];
            if (s != null){
                if(s.id == socket.id) sockets[userId] = null;
            }
        })
        console.log(sockets);

        usersCount--;
        io.emit('count_updated',{count: usersCount})
    })
});

const client = require('./realtime/client');