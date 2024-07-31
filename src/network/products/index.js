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


router.post('/productos', upload.single('imagen_producto'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No se subió ningún archivo.');
    }
  
    const { nombre_Produc, desc_Produc, precio, id_Categoria } = req.body;
    const url_Img = `/uploads/${req.file.filename}`; 
  
    connection.query(
      'INSERT INTO productos SET ?',
      { nombre_Produc, desc_Produc, precio, id_Categoria, url_Img },
      (err, result) => {
        if (err) {
          console.log("Error " + err);
          res.status(500).json({ message: 'Error al agregar el producto' });
        } else {
          res.render('agregar_productos', {
            alert: true,
            alertTitle: "Registro producto",
            alertMessage: "¡Registro exitoso!",
            alertIcon: 'success',
            showConfirmButton: true,
            timer: false,
            ruta: '/utilidades_admin/vistacrud/agregar_productos'
          });
        }
      }
    );
  });
  
  // Actualizar Producto
  router.put('/productos/:id', upload.single('imagen_producto'), (req, res) => {
    const productId = req.params.id;
    const { nombre_Produc, desc_Produc, precio, id_Categoria } = req.body;
    const url_Img = req.file ? `/uploads/${req.file.filename}` : req.body.url_Img;
  
    connection.query(
      'UPDATE productos SET nombre_Produc=?, desc_Produc=?, precio=?, id_Categoria=?, url_Img=? WHERE id_Producto=?',
      [nombre_Produc, desc_Produc, precio, id_Categoria, url_Img, productId],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el producto:", err);
          res.status(500).json({ message: 'Error al actualizar el producto' });
        } else {
          res.json({ message: 'Producto actualizado con éxito' });
        }
      }
    );
  });
  
  
    // Eliminar un producto
    router.delete('/productos/:id_Producto', (req, res) => {
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
    
    //Muestra todos los productos en el CRUD
  router.get('/utilidades_admin/vistacrud/editar_productos/:id', (req, res) => {
    const productoId = req.params.id;
    const query = 'SELECT * FROM productos WHERE id_Producto = ?';
  
    connection.query(query, [productoId], (error, results) => {
      if (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error al obtener el producto');
      } else {
        res.render('editar_productos', { producto: results[0] });
      }
    });
  });
  
  // Muestra el producto a editar en Formulario Editar
  
  router.get('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    connection.query(
      'SELECT * FROM productos WHERE id_Producto = ?',
      [productId],
      (err, results) => {
        if (err) {
          console.error("Error al obtener el producto:", err);
          res.status(500).json({ message: 'Error al obtener el producto' });
        } else {
          res.json(results[0]);
        }
      }
    );
  });
  
   //Mostrar productos en el Front /productos
  
   router.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM productos', (err, results) => {
      if (err) {
        console.log("Error " + err);
        res.status(500).json({ message: 'Error al obtener los productos' });
      } else {
        res.json(results);
      }
    });
  });

  module.exports = router;