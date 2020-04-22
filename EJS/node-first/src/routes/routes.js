const express = require('express')
const router = express.Router();
const fetchQuery = require('../request-manager');

router.get('/', (req,res) => {
  fetchQuery('http://127.0.0.1:4000/', 'GET').then(res_be => {
      if (res_be.success) {
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
        //res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', usr:req.session.sessUsr});
      } else {
        console.log('res_back_end not soccess')
      }
    })  
});

router.get('/logear', (req,res) => {
  res.render('login.html',{ title: 'Subasta Online'});
});


router.post('/login', (req,res) => {
    req.session.sessUsr='';
    //(URL, metodo(POST o GET), Body(JSON))                                        .then es la respuesta 
    fetchQuery('http://127.0.0.1:4000/login', 'POST', req.body).then(res_be => {
      if (res_be.success) {
        req.session.sessUsr = res_be.user.email
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
        //res.render('subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
      } else {
        console.log('res not success')
      }
    })
    
});

router.get('/logout', (req,res) => {
  req.session.sessUsr='';
  fetchQuery('http://127.0.0.1:4000/', 'GET').then(res_be => {
      if (res_be.success) {
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
        //res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', usr:req.session.sessUsr});
      } else {
        console.log('res_back_end not soccess')
      }
    })  
});





router.get('/contact', (req,res) => {
    res.render('contact.html',{ title: 'Contact Page'});
});


module.exports = router;
