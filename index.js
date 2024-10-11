
const db = require('./database')
const express = require('express')
const bcrypt = require('bcrypt')
const session = require('express-session')

// initialize app
const app = express()

// setup middleware(something sitting between two interfaces)
app.use(express.json());

// setup session
app.use(
    session({
        key: 'user_sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);


// making queries to existing database
// adding doctors

const addDoctors = `INSERT INTO doctors(first_name, last_name, specialization, email, phone, schedule)
VALUES('John', 'Doe', 'Surgery', 'johndoe23@gmail.com', '0712345678', 'Available Tuesdays and wednesdays from 2.00pm')`

db.query(addDoctors, (err, results)=>{
    if (err) {
        throw err
    }
    console.log('Doctor added:', results);
})

app.get('/', (req, res)=>{
    res.send('Karibu Telemed')
})

// display all patients **admin only ** with search and filter options
// we need a middleware to confirm if user isAdmin

const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superAdmin')) {
        return next(); // proceed
    }
    return res.status(403).json({ error: 'Access denied' });
}

const isPatient = (req, res, next) => {
    if (req.user && req.user.role === 'patient') {
        return next(); 
    }
    return res.status(403).json({ error: 'Access denied' }); 
}


app.post('/register', async(req, res)=>{
    const { first_name, last_name, email, phone, password, date_of_birth, gender, address } = req.body

    //check if patient exists
    const registerQuery = `SELECT * FROM patients WHERE email = ?`
    db.execute(registerQuery, [email], async (err, result)=>{
        if (err) {
            console.error('Error making request', err)
            return res.status(500).json({error: 'Error making request'})
        }

        if (result.length > 0) {
            return res.status(400).json({error: 'Email already exists'})
        }

        // proceed to hash password
        const password_hash = await bcrypt.hash(password, 10) //10 is the saltrounds

        //insert new patient
        const insertQuery = `INSERT INTO patients (first_name, last_name, email, phone, password_hash, date_of_birth, gender, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
        db.execute(insertQuery, [first_name, last_name, email, phone, password_hash, date_of_birth, gender, address], (err, result)=>{
            if (err) {
                console.error('Error inserting patient', err)
                return res.status(500).json({error: 'Registration failed'})
            }
            res.status(201).json({message: 'Successsfully registered patient'})
        })
       
    })
})

app.post('/login', async(req, res)=>{
    const { email, password } = req.body

    //check if patient exists
    const loginQuery = `SELECT * FROM patients WHERE email = ?`
    db.execute(loginQuery, [email], async (err, result)=>{
        if (err) {
            console.error('Error making request', err)
            return res.status(500).json({error: 'Error making request'})
        }

        if (result.length === 0) {
            return res.status(400).json({error: 'Invalid credentials'})
        }

        //extract stored password
        const password_hash = result[0].password_hash

        const isMatch = await bcrypt.compare(password, password_hash)

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect Password'})
        }
        res.status(200).json({message: 'Patient logged in successfully'})

    })
})

app.get('/patients', isAdmin, (req,res)=>{
    const { name, email, gender } = req.body

    const patients = `SELECT * FROM patients WHERE 1=1`
    //filter by name
    if (name) {
        patients += `AND CONCAT(first_name, ' ', last_name) AS name LIKE ?`
        name = `%${name}%`  //partial name search  
    }

    // filter by email
    if (email) {
        patients += `AND email = ?`
    }

    // filter by gender
    if (gender) {
        patients += `AND gender = ?`
    }


    let queryParams = []

    if (name) {queryParams.push(name)}
    if (email) {queryParams.push(email)}
    if (gender) {queryParams.push(gender)}

    db.query(patients, queryParams, (err, results)=>{
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching data')
        }
        res.status(200).json(results)
    })
})

//patient update info
app.put('/patients/:patient_id', (req, res) => {
    const { patient_id } = req.params
    const { email, phone, address} = req.body

    const queryInfo = `UPDATE patients SET email = ?, phone = ?, address = ? WHERE patient_id = ? `

    db.execute(queryInfo, [email, phone, address, patient_id], (err, result)=>{
        if (err) {
            console.error(err);
           return res.status(500).send('Error updating petient profile') 
        }
        res.status(200).send('Patient profile updated successfully')
    })
})
//patient delete profile
app.delete('/patients/delete', isPatient, (req, res)=>{
    const { patient_id } = req.user

    const deleteQuery = `DELETE FROM patients WHERE patient_id = ?`

    db.execute(deleteQuery, [patient_id], (err, result)=>{
        if (err) {
            console.error('Error deleting record: ', err)
            return res.status(500).json({error: 'Failed to delete patient'})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Patient not found'})
        }
        req.logout()
        res.status(200).json({message: 'Account deleted successfully'})
    })

})

// view all doctors
app.get('/doctors', (req, res)=>{
    const doctors = `SELECT * FROM doctors`
    
    db.query(doctors, [], (err, results)=>{
        if (err) {
            return res.status(500).send('Error fetching data', err)
        }
        res.status(200).json(results)
    })
})

//add new doctors
app.post('doctors/add', isAdmin, (req,res)=>{
    const { first_name, last_name, specialization, email, phone, schedule } = req.body

    const newDoctor = `INSERT INTO doctors(first_name, last_name, specialization, email, phone, schedule) VALUES(?,?,?,?,?) `
    db.execute(newDoctor, [first_name, last_name, specialization, email, phone, schedule], (err, result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Failed to add doctor'})
        }
        res.status(201).json({ message: 'doctor added successfully', doctor_id: result.insertId})
    })
})

//update doctor profile
app.put('/doctors/:doctor_id', isAdmin, async(req, res)=>{
    const { specialization, email, phone, schedule } = res.body
    const { doctor_id } = res.params

    const updateQuery = `UPDATE doctors SET email = ?, specialization = ?, phone = ?, schedule = ? WHERE doctor_id = ?`

    db.execute(updateQuery, [specialization, email, phone, schedule, doctor_id], (err, result)=>{
        if (error) {
            console.error('Error updating doctor profile: ', err);
            return res.status(500).json({ error: 'Error updating doctor profile'})
        }
        res.status(200).json({message: 'Profile successfully updated'})
    })
})
// delete doctor profile
app.delete('/doctors/:doctor_id', isAdmin, (req, res)=>{
    const { doctor_id } = req.params

    const deleteQuery = `DELETE FROM doctors WHERE doctor_id = ?`

    db.execute(deleteQuery, [doctor_id], (err, result)=>{
        if (err) {
            console.error('Error deleting record: ', err)
            return res.status(500).json({error: 'Failed to delete doctor'})
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Doctor not found'})
        }
        res.status(200).json({message: 'Doctor deleted successfully'})
    })

})

//get appointments for each doctor
app.get('/docters/:doctor_id/appointments', (req, res)=>{
    const { doctor_id } = req.params;    //from route

    const doctorAppointment = `SELECT * FROM appointments WHERE doctor_id = ?`
    db.query(doctorAppointment, [doctor_id], (err, result)=>{
        if (err) {
            return res.status(500).send('Error fetching doctors appointments')
        }
        res.status(200).json(result)
    } )
})


//view all appointments
app.get('/appointments', (req, res)=>{
    const appointments = `SELECT * FROM appointments`

    db.query(appointments, (err, results)=>{
        if (err) {
            console.error('Error making request',err);
            return res.status(500).send('Error fetching data')
        }
        console.log('Request successful', results);
        res.status(200).json(results) //provide json results
    })
})

//appointment booking
app.post('/appointments/schedule', (req, res)=>{
    const {doctor, date, time} = req.body
    const patient_id = req.body.patientId || req.session.patientId //if we have session

    // getting doctor id 
    const getDoctorId = `SELECT doctor_id FROM doctors WHERE CONCAT(first_name, ' ', last_name) = ?`
    db.execute(getDoctorId, [doctor], (err,result)=>{
        if (err) {
            return res.status(500).send('Error fetching doctor')
        }
        
        // request successful but doctor not found
        if (result.length === 0) {
            return res.status(400).send('Doctor not found')
        }

        let doctor_id = result[0].id

        const appointment = `INSERT INTO appointments(patient_id, doctor_id, appointment_date, status) VALUES(?, ?, ?, ?, 'scheduled')`
        db.execute(appointment, [patient_id, doctor_id, date, time], (err, result)=>{
            if (err) {
                return res.status(500).send('Error adding appiontment')
            }
            res.status(201).send('Appointment succesfully booked')
        })

    })
})

// reschedule appointment
app.put('/appointments/:appointment_id/reschedule', (req, res)=>{
    const { appointment_id } = req.params   //req.body
    const { date, time } = req.body

    const reschedule = `UPDATE appointments SET appointment_date = ?, appointment_time = ? WHERE appointment_id = ? AND status = 'scheduled'`
    
    db.execute(reschedule, [appointment_id, date, time], (err, result)=>{
        if (err) {
            return res.status(500).send('Error updating appointment')
        }

        if (result.affectedRows > 0) {
            return res.status(200).send('Appointment successfully updated')
        } else {
            res.status(404).send('Appointment not found or already cancelled')
        }
    })
})

//cancel appointment
app.put('/appointments/:appointment_id/cancel', (req, res)=>{
    const { appointment_id } = req.params;

    const cancel = `UPDATE appointments SET status = 'cancelled' WHERE appointment_id = ? AND status = 'active'`
    db.execute(cancel, [appointment_id], (err, result)=>{
        if (err) {
            return res.status(500).send('Error cancelling appointment')
        }
        if (result.affectedRows > 0) {
            return res.status(200).send('Appointment cancelled')
        } else {
            res.status(404).send('Appointment not found or already cancelled')
        }
    })
})

//listen to server
const PORT= 3000;
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})