// import node package
const express = require('express');

// import controller
const controller = require('../controllers/controller.admin');

// set up router
const router = express.Router();

// GET
router.get('/', controller.index);
router.get('/patient-list', controller.patientList);
router.get('/doctor-list', controller.doctorList);

router.post('/patient-list/delete/:id', controller.delete);
router.post('/patient-list/insert', controller.insert);
router.post('/patient-list/update/:id', controller.update);

router.post('/doctor-list/delete/:id', controller.delete);
router.post('/doctor-list/insert', controller.insert);
router.post('/doctor-list/update/:id', controller.update);

module.exports = router;