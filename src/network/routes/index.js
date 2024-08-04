const express = require('express');

const router = express.Router();

// Crea un middleware para verificar si el usuario ha iniciado sesión.

function checkAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login_admin');
    }
  }


router.get('/', (req,res)=>{
    res.render('inicio');
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error al cerrar sesión');
    }
    res.redirect('/login_admin');
  });
});

router.get('/cita/agendar', (req,res)=>{
    res.render('agendar');
})

router.get('/cita', (req,res)=>{
    res.render('cita');
})

router.get('/cita/consultar', (req,res)=>{
    res.render('consultar');
})

router.get('/contacto', (req,res)=>{
    res.render('contacto');
})

router.get('/nosotros', (req,res)=>{
    res.render('nosotros');
})

router.get('/cita/consultar/registro', (req,res)=>{
    res.render('registro');
})

router.get('/servicios', (req,res)=>{
    res.render('servicios');
})

router.get('/productos', (req,res)=>{
    res.render('productos');
})

router.get('/login_admin', (req,res)=>{
    res.render('login');
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error al cerrar sesión');
    }
    res.redirect('/login_admin');
  });
});

router.get('/registro_admin', (req,res)=>{
    res.render('registro_admin');
})

router.get('/utilidades_admin', checkAuth, (req, res) => {
  res.render('utilidades_admin');
});

router.get('/utilidades_admin/vistacrud/editar_productos', checkAuth, (req, res) => {
    res.render('editar_productos')
})

router.get('/utilidades_admin/vistacrud_Servicios/editar_servicios', checkAuth, (req, res) => {
    res.render('editar_servicios')
})

router.get('/utilidades_admin/vistacrud/agregar_productos', checkAuth, (req, res) => {
  res.render('agregar_productos')
})

router.get('/utilidades_admin/vistacrud_Servicios/agregar_servicios', checkAuth, (req, res) => {
  res.render('agregar_servicios')
})

router.get('/utilidades_admin/vistacrud', checkAuth, (req, res) => {
    res.render('vistacrud')
})

router.get('/utilidades_admin/vistacrud_Servicios', checkAuth, (req, res) => {
    res.render('vistacrud_Servicios')
})

router.get('/utilidades_admin/registro_citas', checkAuth, (req, res) => {
  res.render('registro_citas')
})

router.get('/utilidades_admin/reporte_citas', checkAuth, (req, res) => {
  res.render('reporte')
})

module.exports = router;
