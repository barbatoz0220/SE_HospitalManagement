const connection = require('./dbconnection');

module.exports.getPatientByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM PATIENT WHERE ID = ?", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.getDoctorByPatient = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT D.NAME, D.GENDER, D.DOB, D.PHONE FROM PATIENT P, DOCTOR D WHERE P.ID = ? AND P.DOCTOR_ID = D.ID", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.getVisitsByPatient = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT V.ID FROM PATIENT P, VISIT V WHERE P.ID = ? AND V.PATIENT_ID = P.ID", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.getPatientAccount = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM ACCOUNT A, PATIENT P WHERE A.ID = P.ACCOUNT_ID and USERNAME = ?", [username], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.getAllPatient = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT ID, NAME, GENDER, PHONE, DATE_FORMAT(DOB,'%Y-%m-%d') as DOB FROM PATIENT", (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.deletePatientByID = (userid) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM PATIENT WHERE ID = ?", [userid], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.insertPatient = (name, gender, dob, phone) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO PATIENT(NAME, GENDER, DOB, PHONE) VALUES (?, ?, ?, ?)", [name, gender, dob, phone], (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
};

module.exports.updatePatientByID = (id, name, gender, dob, phone) => {
    var patient = {};
    connection.query("SELECT * FROM PATIENT WHERE ID = ?", [id], function (error, results, fields) {
        patient.name = results[0].NAME,
            patient.gender = results[0].GENDER,
            patient.dob = results[0].DOB,
            patient.phone = results[0].PHONE
    });
    var validName = name != null ? name : patient.name;
    var validGender = gender != null ? gender : patient.gender
    var validDob = dob != null ? dob : patient.dob
    var validPhone = phone != null ? phone : patient.phone
    connection.query("UPDATE PATIENT SET NAME=?, GENDER=?, DOB=?, PHONE=? WHERE ID=?", [validName, validGender, validDob, validPhone, id]);
};

