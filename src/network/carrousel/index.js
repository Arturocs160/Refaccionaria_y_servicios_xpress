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


router.post('/api/carrousel', upload.array('imagenes_carrousel', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No se subió ningún archivo.');
    }

    const urls = req.files.map(file => `/uploads/${file.filename}`);
    const values = urls.map(url => [url]);

    connection.query(
        'INSERT INTO carrusel_img (url_Img) VALUES ?',
        [values],
        (err, result) => {
            if (err) {
                console.error("Error al agregar las imágenes al carrusel:", err);
                res.status(500).json({ message: 'Error al agregar las imágenes al carrusel' });
            } else {
                res.json({ message: 'Imágenes agregadas al carrusel con éxito' });
            }
        }
    );
});

router.delete('/api/carrousel/:id', (req, res) => {
    const { id } = req.params;

    connection.query(
        'DELETE FROM carrusel_img WHERE id_Carrusel = ?',
        [id],
        (err, result) => {
            if (err) {
                console.error("Error al eliminar la imagen del carrusel:", err);
                res.status(500).json({ message: 'Error al eliminar la imagen del carrusel' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Imagen no encontrada en el carrusel' });
                } else {
                    res.json({ message: 'Imagen eliminada del carrusel con éxito' });
                }
            }
        }
    );
});

router.get('/api/carrousel', (req, res) => {
    connection.query('SELECT * FROM carrusel_img', (err, results) => {
        if (err) {
            console.error("Error al obtener las imágenes del carrusel:", err);
            res.status(500).json({ message: 'Error al obtener las imágenes del carrusel' });
        } else {
            res.json(results);
        }
    });
});

router.get('/api/carrusel_img', (req, res) => {
    connection.query('SELECT * FROM carrusel_img', (err, results) => {
        if (err) {
            console.error('Error al obtener imágenes del carrusel:', err);
            res.status(500).json({ message: 'Error al obtener las imágenes' });
        } else {
            res.json(results);
        }
    });
});


module.exports = router;
