const express = require('express');
const router = express.Router();
const connection = require('../../../database/db');
const PDFDocument = require('pdfkit');
const moment = require('moment');
require('moment/locale/es');


//Agendar cita

router.post('/agendarCita', async(req, res) => {
    const {nombre_Cliente, apellido1, apellido2, telefono, correo, fecha, hora, id_Servicio} = req.body;

    connection.query('INSERT INTO citas SET  ?',
        {nombre_Cliente:nombre_Cliente, apellido1:apellido1, apellido2:apellido2, telefono:telefono,correo:correo, fecha:fecha,
          hora:hora, id_Servicio:id_Servicio},
      async (error, result) => {
        if(error){
            console.log("Error " + error);
        }
        else{
          res.json({ id: result.insertId });
        }
   });
});


// Obtener horas de citas disponibles
router.get('/api/citas/:date', (req, res) => {
  const date = req.params.date;
  const query = 'SELECT TIME_FORMAT(hora, "%H:%i") AS hora FROM citas WHERE fecha = ?';

  connection.query(query, [date], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      const reservedTimes = results.map(cita => cita.hora);
      res.json(reservedTimes);
  });
});

// Obtener los datos de las citas
router.get('/citas/datos/:num_Cita', (req, res) => {
  const num_Cita = req.params.num_Cita;
  const query = 'SELECT * FROM citas where num_Cita = ?';
  db.query(query, [num_Cita], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Ruta para obtener la cita de un usuario mediante correo y número de cita
router.get('/consultarInformacionCitas', async(req, res) => {
  const { num_Cita, correo } = req.query;

  if (!num_Cita || !correo) {
    return res.status(400).json({ error: 'Email y número de cita son requeridos' });
  }
  
  const query = 'SELECT * FROM citas WHERE num_Cita = ? AND correo = ?';
  connection.query(query, [num_Cita, correo], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.length > 0) {
          res.json(results[0]);
      } else {
          res.status(404).json({ message: 'Cita no encontrada' });
      }
  });
});

// Ruta para cancelar la cita
router.delete('/api/cancelar-cita/:num_Cita', (req, res) => {
  const num_Cita = req.params.num_Cita;

  const query = 'DELETE FROM citas WHERE num_Cita = ?';

  connection.query(query, [num_Cita], (error, results) => {
      if (error) {
          console.error('Error al cancelar la cita:', error);
          res.status(500).send('Error al cancelar la cita.');
      } else {
          if (results.affectedRows > 0) {
              res.status(200).send('Cita cancelada con éxito.');
          } else {
              res.status(404).send('Cita no encontrada.');
          }
      }
  });
});

// Ruta para el manejo del reporte
const path = require('path');
const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'assets', 'logo.png');

router.post('/reporte', (req, res)=>{
  const {fechaInicio, fechaFin} = req.body;
  const query = `SELECT * FROM citas WHERE fecha BETWEEN ? AND ?`;


  connection.query(query, [fechaInicio, fechaFin], (err, results)=>{
      if(err) throw err;
      
      // Creacion del documento pdf
      const doc = new PDFDocument();
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', ()=>{
          const pdfData = Buffer.concat(buffers);
          res.writeHead(200, {
              'Content-Length': Buffer.byteLength(pdfData),
              'Content-Type': 'aplication/pdf',
              'content-Disposition': 'attachment;filename=reporte_citas.pdf', 
          }).end(pdfData);
      });

      doc.circle(60,55,50)
      .fillOpacity(1)
      .fillAndStroke("black", "#000")

      // Creamos el contenido del pdf
      // Fit the image in the dimensions, and center it both horizontally and vertically
      doc.image(imagePath, 13, 5, {fit: [100, 100], align: 'center', valign: 'center',})
      doc.moveDown(1);
      doc.fontSize(25).text('Reporte de citas', {align: 'center'});
      doc.moveDown();
      doc.fontSize(12);

      results.forEach(row =>{
          const fechaFormateada = moment(row.fecha).locale('es').format('LL');
          doc.text(`Numero de cita: ${row.num_Cita}`);
          doc.text(`Fecha: ${fechaFormateada}`);
          doc.text(`Hora: ${row.hora}`);
          doc.text(`Nombre(s): ${row.nombre_Cliente}`);
          doc.text(`Apellido(s): ${row.apellido1} ${row.apellido2}`);
          doc.text(`Telefono: ${row.telefono}`);
          doc.moveDown(2);
      });

      // Guardamos el documento
      doc.end();

  });
});

// Ruta para obtener citas pendientes
router.get('/citas/pendientes', (req, res) => {
  const query = "SELECT * FROM citas WHERE estado = 'pendiente'";
  connection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Ruta para obtener citas aceptadas
router.get('/citas/aceptadas', (req, res) => {
  const query = "SELECT * FROM citas WHERE estado = 'aceptado'";
  connection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Ruta para aceptar una cita
router.put('/citas/aceptar/:num_Cita', (req, res) => {
  const num_Cita = req.params.num_Cita;

  // Actualiza el estado de la cita a 'aceptado'
  connection.query('UPDATE citas SET estado = "Aceptado" WHERE num_Cita = ?', [num_Cita], (err, results) => {
      if (err) {
          console.error('Error al actualizar la cita:', err);
          res.status(500).send('Error interno del servidor');
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).send('Cita no encontrada');
          return;
      }
      res.send('Cita aceptada');
  });
});

module.exports = router;