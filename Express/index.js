const config = require('config');
const starupDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const Joi = require('joi');
const logger = require('./logger');
const helmet = require("helmet");
const morgan = require("morgan");
const auth = require('./auth');
const cou = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/course', cou);
console.log('app name: ' + config.get('name'));
console.log('mail server ' + config.get('mail.host'));

if(app.get('env') == 'development'){
    app.use(morgan('tiny'));
    starupDebug('morgen enable...');
}

//DB...Work
// dbDebug('Connection.....');


app.use(logger);
app.use(auth);


app.get('/', (req, res) => {
    res.render('index', { title: 'My new App', message: 'my new message'});
});

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening port ${port}...`));