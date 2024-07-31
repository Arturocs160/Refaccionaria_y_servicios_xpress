const express = require('express');
// 6. Invocamos a bcryptjs

const bcryptjs = require ('bcryptjs');
const router = express.Router();
const connection = require('../../../database/db');


// 10. Registrar usuarios
router.post('/register', async (req, res) => {
    const nombreUsuario = req.body.nombreUsuario;
    const apellidoUsuario = req.body.apellidoUsuario;
    const usuario = req.body.usuario;
    const contrasenia = req.body.contrasenia;
    let contraseniaHash = await bcryptjs.hash(contrasenia,8);
  
    // Verificar si el usuario ya existe
    connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (error, results) => {
        if (error) {
            console.error("Error al verificar el usuario:", error);
            return res.render('registro_admin', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Hubo un error al verificar el usuario.",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: '/registro_admin'
            });
        }
        if (results.length > 0) {
            // Usuario ya existe
            return res.render('registro_admin', {
                alert: true,
                alertTitle: "Registro usuario",
                alertMessage: "¡El usuario ya existe, por favor elija otro!",
                alertIcon: 'warning',
                showConfirmButton: true,
                timer: false,
                ruta: '/registro_admin'
            });
        } else {
            // Insertar el nuevo usuario
            connection.query('INSERT INTO usuarios SET ?', {
                nombre_Usuario: nombreUsuario,
                apellido_Usuario: apellidoUsuario,
                usuario: usuario,
                contrasenia: contraseniaHash
            }, (error, results) => {
                if (error) {
                    console.error("Error al registrar el usuario:", error);
                    return res.render('registro_admin', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Hubo un error al registrar el usuario.",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/registro_admin'
                    });
                } else {
                    return res.render('login', {
                        alert: true,
                        alertTitle: "Registro usuario",
                        alertMessage: "¡Registro exitoso!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/login_admin'
                    });
                }
            });
        }
    });
  });
  
  
  // 11. Auntenticacion
  router.post('/auth', async (req, res) => {
    const usuario = req.body.usuario;
    const contrasenia = req.body.contrasenia;
  
    if (usuario && contrasenia) {
      connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error en el servidor');
        } else if (results.length === 0 || !(await bcryptjs.compare(contrasenia, results[0].contrasenia))) {
          res.render('login', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "USUARIO y/o PASSWORD incorrectas",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: '/login_admin'
          });
        } else {
          req.session.user = results[0]; // Guarda la información del usuario en la sesión
          res.render('utilidades_admin');
        }
      });
    } else {
      res.render('login', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Por favor ingrese usuario y contraseña",
        alertIcon: 'error',
        showConfirmButton: true,
        timer: false,
        ruta: '/login_admin'
      });
    }
  });

  module.exports = router;