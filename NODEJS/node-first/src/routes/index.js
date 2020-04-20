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
        res.render('index.html',{ title: 'First Website', carros:data});
    })
});

init()

router.get('/contact', (req,res) => {
    mongodb.db.collection('vehiculo').find({}).toArray((err, data) => {
            if (err != null) { res.send([]) }
            res.render('contact.html',{ title: 'Contact Page', carros:data});
    })
    
});
module.exports = router;

// const mongodb = require('./db')
// const express = require('express')
// const app = express()

// const init = async () => {
//   await mongodb.connect() // this line waits until db connection established
// }

// init()

// app.get('/', async (req, res) => {
//   mongodb.db.collection('vehiculo').find({}).toArray((err, data) => {
//     if (err != null) { res.send([]) }
//     res.send(data)
//   })
// })

// app.listen(4000, function () {
//   console.log('Escuchando...')
// })