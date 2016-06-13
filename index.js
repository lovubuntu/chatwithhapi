var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({port:4000});

var io = require('socket.io')(server.listener);

io.on('connection', function(socket){
	console.log('One connection with socket id', socket.id);
	socket.emit('Oh Are you there?!!!');
	socket.on('burp', function(){
		socket.emit('Nice!! Am still here');
	})
});

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
// 	console.log('One connection with ');
//         reply.file('./index.html');
//     }
// });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./index.html');
        }
    });
});


server.start();