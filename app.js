// 1. Se invoca a express
const express = require('express');
const app = express();

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

// 6. Invocamos a bcryptjs
const bcryptjs = require ('bcryptjs');

// 7. Var. de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8. Se invoca el modulo de la conexión de la base de datos
const connection = require('./database/db');

// 9. Establecemos rutas
app.get('/', (req,res)=>{
    res.render('inicio');
})

app.get('/cita/agendar', (req,res)=>{
    res.render('agendar');
})

app.get('/cita', (req,res)=>{
    res.render('cita');
})

app.get('/cita/consultar', (req,res)=>{
    res.render('consultar');
})

app.get('/contacto', (req,res)=>{
    res.render('contacto');
})

app.get('/mantenimiento_correctivo', (req,res)=>{
    res.render('mantenimientocorrectivo');
})

app.get('/mantenimiento_preventivo', (req,res)=>{
    res.render('mantenimientopreventivo');
})

app.get('/nosotros', (req,res)=>{
    res.render('nosotros');
})

app.get('/cita/consultar/registro', (req,res)=>{
    res.render('registro');
})

app.get('/servicios', (req,res)=>{
    res.render('servicios');
})

app.get('/productos', (req,res)=>{
    res.render('productos');
})

app.get('/login_admin', (req,res)=>{
    res.render('login');
})

app.get('/registro_admin', (req,res)=>{
    res.render('registro_admin');
})

app.get('/auth/utilidades_admin', (req,res)=>{
    res.render('utilidades_admin');
})

app.get('/auth/utilidades_admin/vistacrud/editar_productos', (req, res) => {
    res.render('editar_productos')
})

app.get('/auth/utilidades_admin/vistacrud_Servicios/editar_servicios', (req, res) => {
    res.render('editar_servicios')
})

app.get('/auth/utilidades_admin/vistacrud/agregar_productos', (req, res) => {
  res.render('agregar_productos')
})

app.get('/auth/utilidades_admin/vistacrud_Servicios/agregar_servicios', (req, res) => {
  res.render('agregar_servicios')
})

app.get('/auth/utilidades_admin/vistacrud', (req, res) => {
    res.render('vistacrud')
})
app.get('/auth/utilidades_admin/vistacrud_Servicios', (req, res) => {
    res.render('vistacrud_Servicios')
})

// 10. Registrar usuarios
app.post('/register', async(req,res)=>{
    const nombreUsuario = req.body.nombreUsuario;
    const apellidoUsuario = req.body.apellidoUsuario;
    const usuario = req.body.usuario;
    const contrasenia = req.body.contrasenia;
    let contraseniaHassh = await bcryptjs.hash(contrasenia,8);

    connection.query('INSERT INTO usuarios SET  ?',
        {nombre_Usuario:nombreUsuario, apellido_Usuario:apellidoUsuario, usuario:usuario, contrasenia:contraseniaHassh},
    async (error, results)=>{
        if(error){
            console.log("Error " + error);
        }
        else{
            res.render('login', {
                alert: true,
				alertTitle: "Registro usuario",
				alertMessage: "¡Registro exitoso!",
				alertIcon:'success',
				showConfirmButton: true,
				timer: false,
				ruta: '/login_admin'
            });
        }
    });
})

// 11. Auntenticacion
app.post('/auth', async(req,res)=>{
    const usuario = req.body.usuario;
    const contrasenia = req.body.contrasenia;

    if(usuario && contrasenia){
        connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async(error,results)=>{
            if(results.length === 0 || !(await bcryptjs.compare(contrasenia, results[0].contrasenia))){
                res.render('login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "USUARIO y/o PASSWORD incorrectas",
                    alertIcon:'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: '/login_admin'  
                });
            }else{
                res.render('utilidades_admin');
            }
        })
    }
})

// Agregar un producto 

app.post('/productos', (req, res) => {
    const {nombre_Produc, desc_Produc, precio, id_Categoria, url_Img} = req.body;
    connection.query(
      'INSERT INTO productos SET  ?',
        {nombre_Produc:nombre_Produc, desc_Produc:desc_Produc, precio:precio, id_Categoria:id_Categoria,url_Img:url_Img},
      (err, result) => {
        if(err){
            console.log("Error " + err);
        }
        else{
            res.render('editar_productos', {
                alert: true,
                alertTitle: "Registro producto",
                alertMessage: "¡Registro exitoso!",
                alertIcon:'success',
                showConfirmButton: true,
                timer: false,
                ruta: '/auth/utilidades_admin/vistacrud/editar_productos'
            });
      }
    });
});

// Actualizar Producto

app.post('/productos/modificarProducto', (req, res) => {
  const data = req.body;
  console.log('Datos recibidos:', data);
  res.json(data); // Envía una respuesta con los datos recibidos
});

app.get('/api/productos/:id', (req, res) => {
  const data = { id: req.params.id };
  res.json(data);
});

app.put('/productos', (req, res) => {
    const { id_Producto } = req.params;
    if(error){
        console.log("Error " + error);
    }
    else{
        res.render('/editar_productos', {
            alert: true,
            alertTitle: "Registro usuario",
            alertMessage: "¡Registro exitoso!",
            alertIcon:'success',
            showConfirmButton: true,
            timer: false,
            ruta: '/editar_productos'
        });
    }    connection.query(
      'UPDATE productos SET nombre_Produc = ?, desc_Produc = ?, cantidad = ?, precio = ?, id_Categoria = ? WHERE id_Producto = ?',
      [nombre_Produc, desc_Produc, precio, id_Categoria, id_Producto],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error al actualizar producto: ' + err.message });
          return;
        }
        if (result.affectedRows === 0) {
          res.status(404).json({ mensaje: 'Producto no encontrado' });
          return;
        }
        res.json({ mensaje: 'Producto actualizado con éxito' });
      }
    );
  });
  
  // Eliminar un producto
  app.delete('/productos/:id_Producto', (req, res) => {
    const { id_Producto } = req.params;
    connection.query('DELETE FROM productos WHERE id_Producto = ?', [id_Producto], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar producto: ' + err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
        return;
      }
      res.json({ mensaje: 'Producto eliminado con éxito' });
    });
  });
  

  //Agregar un servicio

  app.post('/servicios', (req, res) => {
    const {nombre_Servicio, desc_Servicio, precio, url_Img } = req.body;
    connection.query(
      'INSERT INTO servicios SET  ?',
        {nombre_Servicio:nombre_Servicio, desc_Servicio:desc_Servicio, precio:precio,url_Img:url_Img},
      (err, result) => {
        if(err){
            console.log("Error " + err);
        }
        else{
            res.render('editar_servicios', {
                alert: true,
                alertTitle: "Registro Servicio",
                alertMessage: "¡Registro exitoso!",
                alertIcon:'success',
                showConfirmButton: true,
                timer: false,
                ruta: '/auth/utilidades_admin/vistacrud_Servicios/editar_servicios'
            });
      }
    });
});

//Eliminar un Servicio

app.delete('/servicios/:id_Servicio', (req, res) => {
    const { id_Servicio } = req.params;
    connection.query('DELETE FROM servicios WHERE id_Servicio = ?', [id_Servicio], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al eliminar servicio: ' + err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ mensaje: 'Servicio no encontrado' });
        return;
      }
      res.json({ mensaje: 'Servicio eliminado con éxito' });
    });
  });
  


  //Mostrar productos en el Front /productos

  app.get('/api/productos', (req, res) => {
    connection.query('SELECT id_Producto,nombre_Produc, desc_Produc, precio, id_Categoria FROM productos', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  //Mostrar servicios en el Front /sevicios

  app.get('/api/servicios', (req, res) => {
    connection.query('SELECT * FROM servicios', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });
  

app.listen(3000, (req,res)=>{
    console.log("SERVER RUNNING IN http://localhost/3000");
});



 