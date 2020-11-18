// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.patient');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);
router.get('/information', controller.information)
router.get('/doctor', controller.doctor)
router.get('/visit', controller.visit);

module.exports = router;