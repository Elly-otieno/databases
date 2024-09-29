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