const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let quotesCollection;
let db;

MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    { useUnifiedTopology: true }).then(client => {
        console.log('Connected to Database');
        db = client.db('star-wars-quotes');
        quotesCollection = db.collection('quotes');
        // app.use(/* ... */)
        // app.get(/* ... */)
        // app.post(/* ... */)
        // app.listen(/* ... */)
    })
    .catch(error => console.error(error))


// All your handlers here...
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error));
});

app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error))
});

app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
        { name: 'Darth Vadar' },
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }
    ).then(result => {
        console.log(result);
        res.json('Success');
        //res.redirect('/');
    })
        .catch(error => console.error(error))
});

app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne({ name: req.body.name })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json('Deleted Darth Vadars quote')
        })
        .catch(error => console.error(error));
});

app.listen(3000, () => {
    console.log('listening on 3000')
});