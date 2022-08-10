
const express = require('express');
const router = express.router();


const data = [{ id: 1, name: 'nayan' },
{ id: 2, name: 'nayan2' },
{ id: 3, name: 'nayan3' }];

router.get('/', (req, res) => {
    res.send(data);
});

router.get('/:id', (req, res) => {
    const result = data.find(x => x.id === parseInt(req.params.id));
    if (!result) {
        res.status(404).send('Data Not Found');
    }
    res.send(result);
});

router.post('/', (req, res) => {
    const newData = { id: data.length + 1, name: req.body.name };
    data.push(newData);
    res.send(newData);
});


router.put('/:id', (req, res) => {
    const result = data.find(x => x.id === parseInt(req.params.id));
    if (!result) {
        res.status(404).send('Data Not Found');
    }
    res.send(result);
    result.name = req.body.name;
    res.send(result);

});

router.delete('/:id', (req, res) => {
    const result = data.find(x => x.id === parseInt(req.params.id));
    if (!result) {
        res.status(404).send('Data Not Found');
    }

    const index = data.findIndex(x => x.id === parseInt(req.params.id));
    data.splice(index, 1);
    res.send(data);

});

router.get('/:year/:month', (req, res) => {

    res.send(req.query);
});

module.exports = router;