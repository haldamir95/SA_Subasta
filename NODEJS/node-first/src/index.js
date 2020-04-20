const express = require('express');
const app= express();
const path = require ('path');
//settings
app.set('port',4000)
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

//routes
app.use(require('./routes/index.js'));

//static files 
app.use(express.static(path.join(__dirname, 'public')));
//listen
app.listen(app.get('port'), ()=>{
    console.log('Server Port:', app.get('port'));
});




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
