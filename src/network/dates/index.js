const express = require('express');
const router = express.Router();
const connection = require('../../../database/db');

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

module.exports = router;