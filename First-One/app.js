// const logger = require('./logger');

// logger('nayan');

// const EventEmitter = require('events');
// const emitter = new EventEmitter();


// emitter.on('meLoad', (data) => {

//     console.log('Listen Call... ', data);
// });

// emitter.emit('meLoad', { id: 1, name: 'nayan'});

const http = require('http');
var server = http.createServer((req, res) => {

    if(req.url === '/'){

        res.write('Hello nayan');
        res.end();
    }

    if(req.url === '/api/course'){

        res.write(JSON.stringify([1 ,2,3]));
        res.end();
    }

});

server.listen(5000); 
console.log('listening port 300....');



