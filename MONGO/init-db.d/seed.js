
db.createCollection('vehiculo')
db.vehiculo.insertMany([
  {
    estado: 0,
    tipo: 0,
    marca: '',
    linea: '',
    modelo: '',
    placa: 'P123QWE',
    color: 'rojo',
    arranca: true,
    camina: true,
    falla_mecanica: false,
    garantia_inspeccion: false,
    inundado: false,
    colision: true,
    imagen: 'upload/tech_menu_01.jpg'
  },
  {
    estado: 0,
    tipo: 0,
    marca: '',
    linea: '',
    modelo: '',
    placa: 'P456ASD',
    color: 'azul',
    arranca: true,
    camina: true,
    falla_mecanica: false,
    garantia_inspeccion: false,
    inundado: false,
    colision: true,
    imagen: 'upload/tech_menu_01.jpg'
  },
  {
    estado: 0,
    tipo: 0,
    marca: '',
    linea: '',
    modelo: '',
    placa: 'P789ZXC',
    color: 'amarillo',
    arranca: true,
    camina: true,
    falla_mecanica: false,
    garantia_inspeccion: false,
    inundado: false,
    colision: true,
    imagen: 'upload/tech_menu_01.jpg'
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
