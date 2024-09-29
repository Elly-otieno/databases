-- Part 1
-- Run the queries on MySQL workbench

--question 1.1
CREATE TABLE users (
    user_id INT PRIMARY KEY auto_increment ,
    user_name VARCHAR(20) NOT NULL,
    email VARCHAR(20) 
);

-- output
-- 23:53:42	CREATE TABLE users (user_id INT PRIMARY KEY auto_increment , user_name VARCHAR(20) NOT NULL, email VARCHAR(20) )	0 row(s) affected	0.125 sec



-- question 1.2
CREATE TABLE table_1 (
    column1 VARCHAR(10),
    column2 INT NOT NULL
);

--output
-- 23:56:43	CREATE TABLE table_1 (column1 VARCHAR(10), column2 INT NOT NULl)	0 row(s) affected	0.047 sec



-- Part 2
-- ERD

-- Image attached on README.md

-- PART 3: Creating Tables
-- code for creating the tables in my database


-- patients table
CREATE TABLE patients(
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    language VARCHAR(20) NOT NULL
);

-- providers table
CREATE TABLE providers(
    provider_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    provider_speciality VARCHAR(50) NOT NULL,
    email_address VARCHAR(30)
    phone_number VARCHAR(30)
    date_joined DATE NOT NULL
);

-- visits table
CREATE TABLE visits(
    visit_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    provider_id INT NOT NULL,
    FOREIGN KEY (provider_id) REFERENCES providers(provider_id),
    date_of_visits DATE NOT NULL,
    date_scheduled DATE NOT NULL,
    visit_department_id INT NOT NULL,
    visit_type VARCHAR(50) NOT NULL,
    blood_pressure_systolic INT,
    blood_pressure_diastolic DECIMAL,
    pulse DECIMAL,
    visit_status VARCHAR(50) NOT NULL
);

-- ed_visits table
CREATE TABLE ed_visits(
    ed_visit_id INT PRIMARY KEY AUTO_INCREMENT,
    visit_id INT NOT NULL,
    FOREIGN KEY (visit_id) REFERENCES visits(visit_id),
    patient_id INT NOT NULL, 
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    acuity INT NOT NULL,
    reason_for_visit VARCHAR(100) NOT NULL,
    disposition VARCHAR(40) NOT NULL
);

-- admissions table
CREATE TABLE admissions(
    admission_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    admission_date DATE NOT NULL,
    discharge_date DATE NOT NULL,
    discharge_disposition VARCHAR(50) NOT NULL,
    service VARCHAR(50) NOT NULL,
    primary_diagnosis VARCHAR(50) NOT NULL
);

-- discharges table
CREATE TABLE discharges(
    discharge_id INT PRIMARY KEY AUTO_INCREMENT,
    admission_id INT NOT NULL,
    FOREIGN KEY (admission_id) REFERENCES admissions(admission_id),
    patient_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    discharge_date DATE NOT NULL,
    discharge_disposition VARCHAR(50) NOT NULL
);

