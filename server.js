require('dotenv').config();

const express = require('express')
const mysql = require('mysql2')


const app = express()

//create a connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// connecting to database
connection.connect((err)=>{
    if (err) {
       throw  err
    }
    console.log('Successfully connected to database');
})

app.get('/', (req, res)=>{
    res.send('Welcome to the Hospital database')
})

// Question 1: Retrieve all patients
app.get('/patients', (req, res)=>{
    const getPatients = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    connection.query(getPatients, (err, results)=>{
        if (err) {
            console.log('Error fetching patients', err);
            res.status(500).send('Error fetching patients')
            return;
        }
        res.status(200).json(results)
    })
})

// Question 2: Retrieve all providers
app.get('/providers', (req, res)=>{
    const getProviders = 'SELECT first_name, last_name, provider_specialty FROM providers';

    connection.query(getProviders, (err, results)=>{
        if (err) {
            res.status(500).send('Error fetching providers')
            return;
        }
        res.status(200).json(results)
    })
})

// Question 3: Filter patients by First Name
app.get('/patient', (req, res)=>{
    const { first_name } = req.query;

    let getPatientByName = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients ';

    if(first_name){
        getPatientByName += 'WHERE first_name = ?'
    }
    connection.query(getPatientByName, [first_name], (err, results)=>{
        if (err) {
            console.log('Error fetching patients:', err);
            res.status(500).send(`Error fetching patient by first_name = ${first_name}`)
            return;
        }
        res.status(200).json(results)
    })
})

// Question 4: Retrieve all providers by their specialty
app.get('/provider_specialty', (req, res)=>{
    const { provider_specialty } = req.query;

    let getProvidersBySpecialty = 'SELECT first_name, last_name, provider_specialty FROM providers ';

    if (provider_specialty) {
        getProvidersBySpecialty += 'WHERE provider_specialty = ?'
    }

    connection.query(getProvidersBySpecialty, [provider_specialty], (err, results)=>{
        if (err) {
            res.status(500).send(`Error fetching providers by specialty = ${provider_specialty}`);
            return;
        }
        res.status(200).json(results);
    })
})


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})