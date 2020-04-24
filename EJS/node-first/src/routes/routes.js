const express = require('express');
const request = require('request');
const router = express.Router();
const fetchQuery = require('../request-manager');
const URL_SERVER = 'http://127.0.0.1:4000'
const app = express();


router.post('/login', (req,res) => {
  req.session.sessUsr='';
  console.log(req.body)
  fetchQuery(URL_SERVER+'/login', 'POST', req.body).then(res_be => {
    if (res_be.success) {
      req.session.sessUsr = res_be.user.email
      res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
    } else {
      console.log('res not success')
    }
  })
});



router.get('/', (req,res) => {
  fetchQuery(URL_SERVER, 'GET').then(res_be => {
      if (res_be.success) {
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
      } else {
        console.log('res_back_end not soccess')
      }
  })  
});


router.get('/logear', (req,res) => {
  res.render('login.html',{ title: 'Subasta Online', message: ''});
});


router.get('/logout', (req,res) => {
  req.session.sessUsr='';
  fetchQuery(URL_SERVER, 'GET').then(res_be => {
      if (res_be.success) {
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
      } else {
        console.log('res_back_end not soccess')
      }
    })  
});

 
router.post('/puja', (req,res) => {
  console.log(req.body)
  fetchQuery(URL_SERVER+'/puja', 'POST', req.body).then(res_be => {
      if (res_be.success) {
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:res_be.arrVehiculos, usr:req.session.sessUsr});
      } else {
        console.log('res_back_end not soccess')
      }
    })
});




//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
router.get('/Afiliado', async (req,res) => {
  req.session.sessUsr='';
  console.log(req.query)
  

  var usuario = await fetchQuery(URL_SERVER+'/Afiliado?jwt='+req.query.jwt+'&codigo='+req.query.codigo+'&password='+req.query.password, 'GET').then()
  .catch(function (err) {
    console.log(err.status, err.statusText)
  });

  var vehiculos = await fetchQuery(URL_SERVER+'/Vehiculo', 'GET').then()
  .catch(function (err) {
    console.log(err.status, err.statusText)
  });

  if(usuario!=null){
    if (usuario.status=='OK') {
      if(usuario.vigente){
        req.session.sessUsr = usuario.codigo
        console.log('Afiliado -> ',usuario)
        res.render('./tech-blog/subasta.html',{ title: 'Subasta Online', carros:vehiculos, usr:req.session.sessUsr});
      }else{
        res.render('login.html',{ title: 'Subasta Online', message: 'Su usuario NO esta vigente'});
      }
    } else {
      console.log('res not success')
    } 
  }
  
  
});





/*
------------------------------------------------------------------------------------ 1  Afiliado GET para hacer login
// Afiliado							
// 	Tipo de request						
// 		GET					
// 	Parámetros						
// 		jwt	      string	requerido	Token de autenticación		
// 		codigo	  string	requerido	Código del afiliado		
// 		password	string	requerido	Password del afiliado		
// 	Respuesta						
// 		Afiliado					
// 			codigo	string			
// 			nombre	string			
// 			vigente	boolean			
// 	Código de éxito						
// 		200	OK				
// 	Excepciones						
// 		404	Not found	Si el código de afiliado no existe			
// 		401	Unauthorized	Si la autenticación no es exitosa			
// 		403	Forbidden	El JWT no es válido o no contiene el scope de este servicio	





------------------------------------------------------------------------------------2. Afiliado POST para registrar
------------------------------------------------------------------------------------3. Afiliado PUT para Actualizar

------------------------------------------------------------------------------------1. Pago GET para obtener utlimo pago 
------------------------------------------------------------------------------------2. Pago POST para hacer un pago

------------------------------------------------------------------------------------1. Vehiculo GET obtener los carros
Vehiculo							
	Tipo de request						
		GET					
	Parámetros						
		jwt	        string	requerido	Token de autenticación		
		id	        int	opcional	Id del vehículo		
		placa	      string	opcional	Placa		
		subastable	boolean	opcional	Si solo se quiere buscar subastables		
	Salida						
		Arreglo de Vehículo					
			id	int			
			estado	int			
			tipo	string			
			marca	string			
			linea	string			
			modelo	string			
			placa	string			
			color	string			
			arranca	boolean			
			camina	boolean			
			falla_mecanica	boolean			
			garantia_inspeccion	boolean			
			inundado	boolean			
			colision	boolean			
	Código de éxito						
		200	OK				
	Excepciones						
		404	Not found	Si el id no existe			
		403	Forbidden	El JWT no es válido o no contiene el scope de este servicio			
------------------------------------------------------------------------------------2. Foto GET para obtener fotos
------------------------------------------------------------------------------------3. Estado GET ???????
------------------------------------------------------------------------------------4. Vehiculo PUT para actualizar

*/









module.exports = router;
