const express = require('express');
const router = express.Router();
const connection = require('../../../database/db');

const multer = require('multer');
const path = require('path');

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
  router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  
  //Agregar un servicio
  router.post('/servicios', upload.single('imagen_servicio'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No se subió ningún archivo.');
    }
  
    const { nombre_Servicio, desc_Servicio, precio } = req.body;
    const url_Img = `/uploads/${req.file.filename}`; 
  
    connection.query(
      'INSERT INTO servicios SET ?',
      { nombre_Servicio, desc_Servicio, precio, url_Img },
      (err, result) => {
        if (err) {
          console.log("Error " + err);
          res.status(500).json({ message: 'Error al agregar el servicio' });
        } else {
          res.render('agregar_servicios', {
            alert: true,
            alertTitle: "Registro servicio",
            alertMessage: "¡Registro exitoso!",
            alertIcon: 'success',
            showConfirmButton: true,
            timer: false,
            ruta: '/utilidades_admin/vistacrud_Servicios/agregar_servicios'
          });
        }
      }
    );
  });
 
  //Actualizar Servicio
  router.put('/api/servicios/:id', upload.single('imagen_servicio'), (req, res) => {
  const { id } = req.params;
  const { nombre_Servicio, desc_Servicio, precio } = req.body;
  let url_Img;

  if (req.file) {
    url_Img = `/uploads/${req.file.filename}`;
  } else {
    url_Img = req.body.url_Img;
  }

  const servicioActualizado = { nombre_Servicio, desc_Servicio, precio, url_Img };

  connection.query(
    'UPDATE servicios SET ? WHERE id_Servicio = ?',
    [servicioActualizado, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el servicio:', err);
        res.status(500).json({ message: 'Error al actualizar el servicio' });
      } else {
        res.json({ message: 'Servicio actualizado con éxito' });
      }
    }
  );
});

//Eliminar un Servicio

router.delete('/servicios/:id_Servicio', (req, res) => {
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
  
  
  //Mostrar servicios en el Front /sevicios

  router.get('/api/servicios', (req, res) => {
    connection.query('SELECT * FROM servicios', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });

  //Mostrar inforamcion del servico en el formulario Editar

  router.get('/api/servicios/:id', (req, res) => {
    const { id } = req.params;
  
    connection.query('SELECT * FROM servicios WHERE id_Servicio = ?', [id], (err, results) => {
      if (err) {
        console.error('Error al obtener el servicio:', err);
        res.status(500).json({ message: 'Error al obtener el servicio' });
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ message: 'Servicio no encontrado' });
        }
      }
    });
  });
  


  module.exports = router;