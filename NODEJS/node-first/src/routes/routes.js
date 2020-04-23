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

/*  
    Al agregar el ASYNC a la funcion se le da la propiedad a las funciones
    de volverse sincronas agregando el AWAIT
*/
router.post('/login', async (req,res) => {
    //Consultando Usuario
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


















module.exports = router;
