const express = require('express')
const router = express.Router();
const fetchQuery = require('../request-manager');

router.get('/', (req,res) => {
    res.render('login.html',{ title: 'Subasta Online'});
});

router.post('/login', (req,res) => {
    console.log(req.body)
    //(URL, metodo(POST o GET), Body(JSON))                                        .then es la respuesta 
    fetchQuery('http://127.0.0.1:4000/login', 'POST', req.body).then(res_be => {
      if (res_be.success) {
        res.render('subasta.html',{ title: 'Subasta Online'});
      } else {
        console.log('res not success')
      }
    })
    
});


router.get('/contact', (req,res) => {
    res.render('contact.html',{ title: 'Contact Page'});
});


module.exports = router;
