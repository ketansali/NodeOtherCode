const express = require('express');
const app = express();
const port = 5000;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('codefirst', 'sa', 'vision', {
    host: 'VISION-050',
    dialect: 'mssql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
User.sync({ force: false }).then(() => {
    // Table created return
    User.create({
        firstName: 'Nayan',
        lastName: 'Raval'
    });
});

app.get('/', function (req, res) {
    User.findAll().then(users => {
        res.send(users)
    });
    
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 