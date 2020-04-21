
db.createCollection('vehiculo')
db.vehiculo.insertMany([
  {
    estado: 0,
    tipo: 0,
    marca: 0,
    linea: 0,
    modelo: 0,
    placa: 'P123QWE',
    color: 'rojo',
    arranca: true,
    camina: true,
    falla_mecanica: false,
    garantia_inspeccion: false,
    inundado: false,
    colision: true
  },
  {
    estado: 0,
    tipo: 0,
    marca: 0,
    linea: 0,
    modelo: 0,
    placa: 'P456ASD',
    color: 'azul',
    arranca: true,
    camina: true,
    falla_mecanica: false,
    garantia_inspeccion: false,
    inundado: false,
    colision: true
  },
  {
    estado: 0,
    tipo: 0,
    marca: 0,
    linea: 0,
    modelo: 0,
    placa: 'P789ZXC',
    color: 'amarillo',
    arranca: true,
    camina: true,
    falla_mecanica: false,
    garantia_inspeccion: false,
    inundado: false,
    colision: true
  }
])





db.createCollection('usuario')
db.usuario.insertMany([
  {
    email: 'haldamir.95@gmail.com',
    password: 123456
  },
  {
    email: 'pedro@gmail.com',
    password: 123456
  }
])