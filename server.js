// Importing some dependencies/packages and initializing them


// HTTP framework for handling requests
const express = require('express');

// Instance of express framework
const app = express();

// DataBase Management System Mysql
const mysql = require('mysql2');

// Cross Origin Resource Sharing
const cors = require('cors');

// Environment variable doc
const dotenv = require('dotenv');


// Configuring the installed applications
app.use(express.json());
app.use(cors());
dotenv.config();


// Connection to the Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// To check for connection
db.connect((err) => {

    // If there is no connection
    if (err) return console.log("Error connecting to MYSQL");

    // If there is connection
    console.log("Connected to MYSQL as id: ", db.threadId);
})



// Your code goes here

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Data.ejs file is in views folder

app.get('/data', (req,res) => {

//     // Retrieve data from database
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving Data')
        }else {
            // Display the record to the browser
            res.render('data', {results: results});
        }
        
    });
});

// Question 1 goes here (Retrieving All Patients)

app.get('/patients', (req,res) => {

    // Retrieve data from database
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving Data')
        }else {
            // Display the record to the browser
            res.render('patients', {results: results});
        }
        
    });
});

// Question 2 goes here (Retrieving All Providers)

app.get('/providers', (req,res) => {

    // Retrieve data from database
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving Data')
        }else {
            // Display the record to the browser
            res.render('providers', {results: results});
        }
        
    });
});

// Question 3 goes here (Filter Patients by First Name)

app.get('/patients/filter', (req,res) => {
    

    // Retrieve data from database
    db.query('SELECT * FROM patients WHERE first_name = $1', [firstName], (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving Data')
        }else {
            // Display the record to the browser
            res.render('patients', {results: results});
        }
        
    });
});

// Question 4 goes here (Retrieve Providers by Specialty)

app.get('/providers/filter', (req,res) => {
    const specialty = req.query.specialty; // Gets the specialty from query parameters

    // Retrieve data from database
    db.query('SELECT * FROM providers WHERE provider_specialty = $1', [specialty], (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving Data')
        }else {
            // Display the record to the browser
            res.render('providers', {results: results});
        }
        
    });
});



// Starting the Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);

    // Sending a message to the Browser
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
    });

});

