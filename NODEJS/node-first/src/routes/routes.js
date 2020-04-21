const mongodb = require('../db');
const express = require('express');
const router = express.Router();


const init = async () => {
    await mongodb.connect() // this line waits until db connection established
}

init()

router.get('/', (req,res) => {
    mongodb.db.collection('vehiculo').find({}).toArray((err, data) => {
        if (err != null) { res.send([]) }
        console.log(data);
        res.render('subasta.html',{ title: 'Subasta Online', carros:data});
    })
});


router.post('/login', (req,res) => {
    console.log(req.body)
    mongodb.db.collection('usuario').find({email: req.body.email, password: Number(req.body.password)}).toArray((err, data) => {
        if (err != null){ 
            res.send([]) 
        }else{
            console.log('LO ENCONTRO')
            console.log(data);
            res.send({success: true, id: data._id})
            //res.render('subasta.html',{ title: 'Subasta Online', carros:data});
        }
        
    })
    //console.log(req.body)
});



router.get('/contact', (req,res) => {
    res.render('contact.html',{ title: 'Contact Page', carros:data});
});


module.exports = router;
