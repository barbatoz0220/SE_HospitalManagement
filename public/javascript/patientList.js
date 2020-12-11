function changePage(index) {
    fetch("/admin/patient-list/pagination?page=" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
}

function deletePatient(index) {
    fetch("/admin/patient-list/delete/" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
}
function submitAddForm(form) {
    var formData = {
        'name': document.getElementById("iname").value,
        'dob': document.getElementById("idob").value,
        'gender': document.getElementById("igender").value,
        'phone': document.getElementById("iphone").value,
    };
    fetch("/admin/patient-list/insert", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.text().then((text) => {
            document.getElementById("container").innerHTML = text;
        });
    });
    return false;
};

function submitUpdateForm(index) {
    var formData = {
        'name': document.getElementById("uname" + index).value,
        'dob': document.getElementById("udob" + index).value,
        'gender': document.getElementById("ugender" + index).value,
        'phone': document.getElementById("uphone" + index).value,
    };
    fetch("/admin/patient-list/update/" + index, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.text().then((text) => {
            document.getElementById("container").innerHTML = text;
        });
    });
    return false;
};

function submitSearchForm() {
    var formData = {
        'name': document.getElementById("sname").value,
        'dob': document.getElementById("sdob").value,
        'gender': document.getElementById("sgender").value,
        'phone': document.getElementById("sphone").value,
    };
    fetch("/admin/patient-list/search", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.text().then((text) => {
            document.getElementById("container").innerHTML = text;
        });
    });
    return false;
};