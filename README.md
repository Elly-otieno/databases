# Task 1

## Part 1: Database Modelling
Using a software of choice eg. draw.io, lucid chart etc, draw a well defined Entity Relationship Diagram (ERD) of the database whose fields are outlined below. Once you are done export or download the diagram in pdf format and upload it on the repository or you can copy and paste it to the cloned repository before you push the changes

<br/>

**Table Name:** patients
| FIELD | DATA TYPE | CONSTRAINTS |
|------------|--------------|-----------------|
| patient_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| first_name | VARCHAR | NOT NULL|
| last_name | VARCHAR | NOT NULL |
| date_of_birth | DATE | NOT NULL |
| gender | VARCHAR | NOT NULL |
| language | VARCHAR | NOT NULL |


<br/>

**Table Name:** providers
| FIELD | DATA TYPE | CONSTRAINTS |
|------------|--------------|-----------------|
| provider_id | INT | PRIMARY KEY AUTO_INCREMENT |
| first_name | VARCHAR | NOT NULL |
| last_name | VARCHAR | NOT NULL |
| provider_speciality | VARCHAR | NOT NULL |
| email_address | VARCHAR |  |
| phone_number | VARCHAR |  |
| date_joined | DATE | NOT NULL |

<br/>

**Table Name:** visits
| FIELD | DATA TYPE | CONSTRAINTS |
|------------|--------------|-----------------|
| visit_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| patient_id | INT | FOREIGN KEY REFERENCES patients(patient_id) |
| provider_id | INT | FOREIGN KEY REFERENCES providers(provider_id) |
| date_of_visit | DATE | NOT NULL |
| date_scheduled | DATE | NOT NULL |
| visit_department_id | INT | NOT |
| visit_type | VARCHAR | NOT NULL |
| blood_pressure_systollic | INT | |
| blood_pressure_diastollic | DECIMAL | |
| pulse | DECIMAL |  |
| visit_status | VARCHAR | NOT NULL|

<br/>

**Table Name:** ed_visits
| FIELD | DATA TYPE | CONSTRAINTS |
|------------|--------------|-----------------|
| ed_visit_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| visit_id | INT | FOREIGN KEY REFERENCES visits(visit_id) |
| patient_id | INT | FOREIGN KEY REFERENCES patients(patient_id) |
| acuity | INT | NOT NULL |
| reason_for_visit | VARCHAR | NOT NULL |
| disposition | VARCHAR | NOT NULL |

<br/>

**Table Name:** admissions
| FIELD | DATA TYPE | CONSTRAINTS |
|------------|--------------|-----------------|
| admission_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| patient_id | INT | FOREIGN KEY REFERENCE patients(patients_id) |
| admission_date | DATE | NOT NULL |
| discharge_date | DATE | NOT NULL |
| discharge_disposition | VARCHAR | NOT NULL |
| service | VARCHAR | NOT NULL |
| primary_diagnosis | VARCHAR | NOT NULL |


<br/>

**Table Name:** discharges
| FIELD | DATA TYPE | CONSTRAINTS |
|------------|--------------|-----------------|
| discharge_id | INT | PRIMARY_KEY, AUTO_INCREMENT |
| admission_id | INT | FOREIGN KEY REFERENCES admissions(admission_id) |
| patient_id | INT | FOREIGN KEY REFERENCES patients(patients_id) |
| discharge_date | DATE | NOT NULL|
| discharge_disposition | VARCHAR | NOT NULL |

<br/>

## Part 2: Creating a database
Now that you have already created a model of your database, it is time to bring it start building on it. Create database named ```hospital_db```.

<br/>

## Part 3: Creating Tables
After creating your your database the next step is creating your tables, but before we start making any changes to the database, we need to make sure it is selected. Select the database using the ```USE``` keyword.<br/>
After selecting the databse proceed to create the tables using the information provided in the tables above. For Example
```sql
CREATE TABLE patients(
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    language VARCHAR(20) NOT NULL
);
```
<br/>

# Task 2

## Part 1: Basic Data Retrieval
**1.1).** Write a query to retrieve the ```first_name```, ```last_name``` and ```date_of_birth``` of all patients.<br/><br/>
**1.2).** Write a query to retrieve the ```provider_id```, ```first_name``` and ```provider_specialty``` from the providers table.

<br/>

## Part 2: Pattern-Based Filtering
**2.1).** Write a query to retrieve all patients whose first names start with "Ab".<br/>
**2.2).** Write a query to retrieve all providers whose specialties end with the letter "y".

<br/>

## Part 3: Comparison Operators
**3.1).** Write a query to find all patients born after 1st January 1980.<br/>
**3.2).**<br/> Write a query to retrieve visits where the acuity level is 2 or higher.

<br/>

## Part 4: WHERE Clause with Logical Operators
**4.1).** Write a query to find patients who speak Spanish.<br/>
**4.2).** Write a query to retrieve visits where the reason is "Migraine" and the disposition is "Admitted".<br/>
**4.3).** Write a query to find patients born between 1975 and 1980.

<br/>

## Part 5: Sorting Data
**5.1).** Write a query to retrieve patient names and sort them in alphabetical order by last name.<br/>
**5.2).** Write a query to list all visits sorted by the date of the visit, starting from the most recent.

<br/>

## Part 6: Advanced Filtering
**6.1).** Write a query to retrieve all admissions where the primary diagnosis is "Stroke" and the discharge disposition is "Home".<br/>
**6.2).** Write a query to find providers who joined after 1995 and specialize in either Pediatrics or Cardiology.

<br/>

## Bonus Challenge 
Write a query that lists all discharges where the patient was discharged home and the discharge date is within the first week of March 2018.
<br/>

# Task 3

## Part 1: Basic Aggregate Functions
**1.1).** Write a query to find the total number of patient admissions in the admissions table.<br/>
**1.2).** Write a query to calculate the average length of stay (difference between discharge date and admission date) for all patients.

<br/>

## Part 2: Grouping Data
**2.1).** Write a query to group admissions by primary_diagnosis and calculate the total number of admissions for each diagnosis.<br/>
**2.2).** Write a query to group admissions by service and calculate the average length of stay for each service (e.g., Cardiology, Neurology).<br/>
**2.3).** Write a query to group discharges by discharge_disposition and count the number of discharges in each category (e.g., Home, Expired, Transfer).

<br/>

## Part 3: Combining Aggregates and Filtering
**3.1).** Write a query to group admissions by service and show the services where the total number of admissions is greater than 5.<br/>
**3.2).** Write a query to find the average length of stay for patients admitted with a primary diagnosis of "Stroke" in the admissions table.

<br/>

## Part 4: Advanced Grouping and Summarizing
**4.1).** Write a query to group emergency department visits (ed_visits) by acuity and calculate the total number of visits for each acuity level.<br/>
**4.2).** Write a query to group admissions by primary_diagnosis and service, showing the total number of admissions for each combination.

<br/>

## Part 5: Practical Financial Analysis
**5.1).** Write a query to group admissions by month (using the admission_date) and calculate the total number of admissions per month.<br/>
**5.2** Write a query to find the maximum length of stay for each primary_diagnosis in the admissions table.

<br/>

## Bonus Challenge 
Write a query to group admissions by service and calculate both the total and average length of stay for each service, ordered by the highest average length of stay.
<br/>

# Task 4

## Part 1: INSERT Data
**1.1).** Add a new patient with the following details <br/>
- First Name: John
- Second Name: Doe
- Date of Birth: 15-11-1980
- Gender: Male
- Language: English

<br/>

## Part 2: UPDATE Data
**2.1).** Write a query to change John Doe's languge from "English" to "Spanish"

<br/>

## Part 3: DELETE Data
**3.1).** Delete the patient with the patient_id number 10

<br/>

## Part 4: Handling NULL Values
**4.1).** Write a query to find that takes all the names and the emails of the providers and if any of them has a ```NULL``` email, replace it with ```N/A```<br/>
**4.2).** Write a query that takes the names and contact details of the provider whether phone number or email and if any of the two is missing, replace it with ```Missing details```

<br/>

## Bonus question
Write a query to retrieve all providers whose speciality is pediatrics and they are missing either of the contact details.

# Task 5
## Creating endpoints

<br>

## Setup

1. Initialize the node.js environment
   ```
   npm init -y
   ```
2. Install the necessary dependancies
   ```
   npm install express mysql2 dotenv nodemon
   ```
3. Create a ``` server.js ``` and ```.env``` files
   ```
<br>

## Run the server
   ```
   nodemon server.js
   ```
<br>

## Setup the ```.env``` file
```.env
DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db
```

<br>

## Configure the database connection and test the connection
Configure the ```server.js``` file to access the credentials in the ```.env``` to use them in the database connection

<br>

## EndPoints

## 1. Retrieve all patients
Create a ```GET``` endpoint that retrieves all patients and displays their:
- ```patient_id```
- ```first_name```
- ```last_name```
- ```date_of_birth```

<br>

## 2. Retrieve all providers
Create a ```GET``` endpoint that displays all providers with their:
- ```first_name```
- ```last_name```
- ```provider_specialty```

<br>

## 3. Filter patients by First Name
Create a ```GET``` endpoint that retrieves all patients by their first name

<br>

## 4. Retrieve all providers by their specialty
Create a ```GET``` endpoint that retrieves all providers by their specialty

<br>

# Task 6

<br/>

## Questions:
### 1. Simple Join
Write an SQL query to retrieve the ```provider_name``` and ```provider_specialty``` for each provider in the providers table. <br/>
 
### 2. Inner Join
Write an SQL query to find all patients who have visited a provider. Display the ```patient_id, first_name, last_name``` and ```provider_specialty```. <br/>
  
### 3. Left Join
Write an SQL query to list all patients and their visit details, including those who have not had any visits. Display ```patient_id, first_name, last_name``` and ```date_of_visit```. Include patients with no visits.<br/>

### 4. Join with Aggregation
Write an SQL query to find the number of visits each provider has had. Display the ```provider_name``` and the count of visits.<br/>

### 5. Complex Join With Conditions
Write an SQL query to find all patients who have had visits that required admission. Display the ```patient_id, first_name, last_name, admission_date``` and ```discharge_date```. Ensure you join all relevant tables to get this information.

<br/>

### Bonus Question (optional)
Write an SQL query to find the details of patients who have had visits, including their ```first_name, last_name, date_of_birth``` and the details of the visits they have had, including ```provider_name, visit_date, blood_pressure_systolic, blood_pressure_diastolic``` and ```visit_status```. Additionally, include information about the admissions and discharges related to these visits. Display patients who had admissions where the discharge disposition was 'Home', and order the results by the ```date_of_visit``` in descending order.

<br/>

# Task 7: Working with Node.js, Express, and MySQL

#### **Objective:**
 Build the backend of the telemedicine application that including the patient management, doctor scheduling, appointment booking, and user authentication for patients. This project will help to understand how to connect a Node.js application to a MySQL database, perform CRUD operations, manage user authentication, and handle data securely and efficiently.

1. **Database Design:**
   - **Tables:**
     - **Patients:** `id`, `first_name`, `last_name`, `email`, `password_hash`, `phone`, `date_of_birth`, `gender`, `address`.
     - **Doctors:** `id`, `first_name`, `last_name`, `specialization`, `email`, `phone`, `schedule` (e.g., available days and times).
     - **Appointments:** `id`, `patient_id`, `doctor_id`, `appointment_date`, `appointment_time`, `status` (e.g., scheduled, completed, canceled).
     - **Admin:** `id`, `username`, `password_hash`, `role`.

   - **Relationships:**
     - Patients and doctors have a one-to-many relationship with appointments.
     - Admin can manage doctors and view appointments.

   - **Database Setup:**
     - Design the database schema using MySQL.
     - Create and populate tables with sample data for testing.

2. **Node.js and Express Setup:**
   - **Express Application:**
     - Set up an Express.js project structure.
     - Implement routing for different parts of the application (e.g., `/patients`, `/doctors`, `/appointments`, `/admin`).

   - **Connecting to MySQL:**
     - Use a MySQL driver (e.g., `mysql2`) to establish a connection between the Express server and MySQL database.
     - Implement connection pooling for efficient database management.

3. **User Management and Authentication:**
   - **Patient Registration and Login:**
     - **Registration:** Allow patients to create an account by providing their personal details and setting a password. Store passwords securely using hashing (e.g., bcrypt).
     - **Login:** Implement a login system that authenticates patients using their email and password. Upon successful login, start a session for the patient.
     - **Profile Management:** Allow logged-in patients to view and update their profile information (excluding their email and password).

   - **Session Management:**
     - Use session cookies to manage patient sessions.
     - Implement session-based authentication to protect routes that require login (e.g., booking an appointment, viewing appointment history).
     - Provide a logout functionality that ends the patient’s session.

4. **Core Features Implementation:**
   - **Patient Management:**
     - **Create:** Patients can register and create an account.
     - **Read:** Display a list of patients (admin only), with search and filter options.
     - **Update:** Patients can update their profile information.
     - **Delete:** Implement a feature for patients to delete their accounts.

   - **Doctor Management:**
     - **Create:** Admin can add new doctors, including their schedules.
     - **Read:** Display a list of doctors with their specialization and availability.
     - **Update:** Allow doctors or admin to update schedules or profile information.
     - **Delete:** Implement a feature to deactivate or delete doctor profiles.

   - **Appointment Booking:**
     - **Create:** Patients can book an appointment by selecting a doctor, date, and time.
     - **Read:** Display a list of upcoming appointments for patients and doctors.
     - **Update:** Allow patients to reschedule or cancel appointments.
     - **Delete:** Allow patients to cancel appointments, updating the status to "canceled."

5. **Interactivity and User Experience:**
   - Use form validation for all input fields.
   - Provide real-time feedback for form submissions (e.g., success messages, error handling).