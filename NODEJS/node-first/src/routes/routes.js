const mongodb = require('../db')
const express = require('express')
const router = express.Router();


const init = async () => {
    await mongodb.connect() // this line waits until db connection established
}

router.get('/', (req,res) => {
    mongodb.db.collection('vehiculo').find({}).toArray((err, data) => {
        if (err != null) { res.send([]) }
        console.log(data);
        res.render('subasta.html',{ title: 'Subasta Online', carros:data});
    })
});

init()

router.get('/contact', (req,res) => {
    res.render('contact.html',{ title: 'Contact Page', carros:data});
});


module.exports = router;
