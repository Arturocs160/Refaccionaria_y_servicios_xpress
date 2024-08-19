// 1. Se invoca a express
const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

// 2. Se setea urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 3. Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// 4. El directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 5. Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

// 6. Var. de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8. Establecemos rutas
const routes = require ("./src/network")
routes(app)


// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar el servidor en el puerto 3000
app.listen(3000, (req,res)=>{
    console.log("SERVER RUNNING IN http://localhost:3000");
});



 