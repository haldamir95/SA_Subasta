const mongodb = require('../db');
const express = require('express');
const router = express.Router();


const init = async () => {
    await mongodb.connect() // this line waits until db connection established
}

init()

router.get('/', (req,res) => {
    mongodb.db.collection('vehiculo').find().toArray((err, vehiculo) =>{
        if(vehiculo != null){
            res.send({success: true, arrVehiculos: vehiculo})
        }else{
            res.send([])
            console.log(err)
        }        
    })
});

router.post('/prueba', async (req,res) => {

    console.log(req.body)
    res.send(req.body)
    
});
/*  
    Al agregar el ASYNC a la funcion se le da la propiedad a las funciones
    de volverse sincronas agregando el AWAIT
*/
router.post('/login', async (req,res) => {
    var consulta = {email: req.body.email, password: Number(req.body.password)}
    try {
        var usuario = await mongodb.db.collection('usuario').find(consulta).toArray()
        var vehiculo = await mongodb.db.collection('vehiculo').find().toArray()
        if(usuario != null){
            res.send({success: true, user: usuario[0], arrVehiculos: vehiculo})
        }
    } catch (error) {
        console.log(error)
        res.send([])
    }
});
/*
    Si no se agrega el ASYNC todo el endopint y sus funciones son 
    asincronas

    
    router.post('/login', (req,res) => {
        console.log('Recibiendo => ', req.body)
        //Consultando Usuario
        var consulta = {email: req.body.email, password: Number(req.body.password)}
        mongodb.db.collection('usuario').find(consulta).toArray((err, usuario) => {
            if(usuario != null){
                console.log('LO ENCONTRO')
                //Consultando Vehiculos
                mongodb.db.collection('vehiculo').find().toArray((err, vehiculo) =>{
                    res.send({success: true, id: usuario._id, vehiculos: vehiculo})
                })
            }else{
                res.send([]) 
            }
        })
    });

*/


router.post('/puja', async (req,res) => {
    var random = Math.round(Math.random() * 10,0 )
    console.log(req.body)
    var consulta = { id: Number(req.body.id)};
    var vehiculo = await mongodb.db.collection('vehiculo').find(consulta).toArray()
    console.log('CARRO VIEJO= ', vehiculo)
    var cantidad = req.body.tipo == 'C' ? 1000 : 500;
    var cantidadNueva = Number(vehiculo[0].valor_adjudicacion) + Number(cantidad);
    var set = { $set: {afiliado_adjudicado: random, valor_adjudicacion: Number(cantidadNueva) } };
    var actualizacion = await mongodb.db.collection('vehiculo').updateOne(consulta, set);
    var vehiculos = await mongodb.db.collection('vehiculo').find({}).toArray();
    if(vehiculos != null){
        res.send({success: true, arrVehiculos: vehiculos})
    }else{
        res.send([])
        console.log(err)
    }  
});



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
router.get('/Afiliado', async (req,res) => {
    console.log('get Afiliado -> ',req.query)
    var consulta = {email: req.query.codigo, password: Number(req.query.password)}
    try {
        var usuario = await mongodb.db.collection('usuario').find(consulta).toArray()
        //var vehiculo = await mongodb.db.collection('vehiculo').find().toArray()
        if(usuario != null){
            res.status(202).send({
                status: 'OK',
                message: 'La autenticacion es exitosa.',
                codigo: usuario[0].email,
                nombre: usuario[0].email,
                vigente: true
              })
        }
    } catch (error) {
        console.log(error)
        res.send([])
    }
});

// Vehiculo							
// 	Tipo de request						
// 		GET					
// 	Parámetros						
// 		jwt	string	requerido	Token de autenticación		
// 		id	int	opcional	Id del vehículo		
// 		placa	string	opcional	Placa		
// 		subastable	boolean	opcional	Si solo se quiere buscar subastables		
// 	Salida						
// 		Arreglo de Vehículo					
// 			id	int			
// 			estado	int			
// 			tipo	string			
// 			marca	string			
// 			linea	string			
// 			modelo	string			
// 			placa	string			
// 			color	string			
// 			arranca	boolean			
// 			camina	boolean			
// 			falla_mecanica	boolean			
// 			garantia_inspeccion	boolean			
// 			inundado	boolean			
// 			colision	boolean			
// 	Código de éxito						
// 		200	OK				
// 	Excepciones						
// 		404	Not found	Si el id no existe			
// 		403	Forbidden	El JWT no es válido o no contiene el scope de este servicio			
router.get('/Vehiculo', async (req,res) => {
    try {
        var vehiculo = await mongodb.db.collection('vehiculo').find().toArray()
            res.status(200).send(vehiculo)
    } catch (error) {
        console.log(error)
        res.send([])
    }
});








module.exports = router;
