// import node package
const mysql = require('mysql');
const express = require('express');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phna0220',
    database: 'hms'
})

connection.connect();

module.exports = connection;