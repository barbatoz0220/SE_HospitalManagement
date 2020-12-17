var doctorModel = require('../models/Doctor');
var request = require('../models/Request');
var patient = require('../models/Patient');
var visit = require('../models/Visit');

module.exports.index = async (req, res) => {
    const doctor = await doctorModel.getDoctorByID(req.session.userid);
    const patient = await doctorModel.getPatientsByDoctor(req.session.userid);

    res.render('pages/doctor/home', {
        name: req.session.username,
        doctors: doctor,
        patients: patient
    });
};

module.exports.getPatients = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 5;
    const patients = await doctorModel.getPatientsByDoctor(req.session.userid);
    res.render('components/doctorPatientsInfor.pug', {
        page: Math.round(patients.length / 5),
        patients: patients.slice((page - 1) * perPage, page * perPage)
    })
}

module.exports.handleRequest = async (req, res) => {
    await request.addDoctorRequest(req.session.userid, req.body.content);
    res.status(200).json();
}

module.exports.getPatientVisit = async (req, res) => {
    const visits = await patient.getVisitsByPatient(req.params.id);
    res.render('components/doctorPatientsVisitInfo', {
        visits: visits
    })
}

module.exports.getPatientVisitDetail = async (req, res) => {
    var diseases = await visit.getDisease(req.params.id);
    var treatments = await visit.getTreatment(req.params.id);
    var rooms = await visit.getRoom(req.params.id);
    res.render("components/visitInformation", {
        diseases: diseases,
        treatments: treatments,
        rooms: rooms
    })
}