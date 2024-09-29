-- question 1.1
SELECT COUNT(*) AS number_of_patients
FROM patients;

-- question 1.2
SELECT a.patient_id, DATEDIFF(d.discharge_date, a.admission_date) AS average_length_of_stay
FROM admissions a
JOIN discharges d ON a.admission_id = d.admission_id;

-- question 2.1
SELECT primary_diagnosis, count(*) AS number_of_admission
FROM admissions
GROUP BY primary_diagnosis;

-- question 2.2
SELECT a.service, AVG(DATEDIFF(d.discharge_date, a.admission_date)) AS average_length_of_stay
FROM admissions a
JOIN discharges d ON a.admission_id = d.admission_id
GROUP BY a.service;

-- question 2.3
SELECT discharge_disposition, count(*) AS number_of_discharges
FROM discharges
GROUP BY discharge_disposition;

-- question 3.1
SELECT service, COUNT(*) AS number_of_admissions
FROM admissions
GROUP BY service
HAVING COUNT(*) > 5;

-- question 3.2
SELECT a.patient_id, AVG(DATEDIFF(d.discharge_date, a.admission_date)) AS average_length_of_stay
FROM admissions a
JOIN discharges d ON a.admission_id = d.discharges_id
WHERE a.primary_diagnosis = 'Stroke'
GROUP BY a.patient_id;

-- question 4.1
SELECT acuity, COUNT(*) AS total_number_of_visits
FROM ed_visits
GROUP BY acuity;

-- question 4.2
SELECT primary_diagnosis, COUNT(*) AS total_number_of_admissions
FROM admissions
GROUP BY primary_diagnosis;

-- question 5.1
SELECT MONTH(admission_date) AS month, COUNT(*) AS total_number_of_admissions
FROM admissions
GROUP BY MONTH(admission_date);

-- question 5.2
SELECT a.primary_diagnosis, MAX(DATEDIFF(d.discharge_date, a.admission_date)) AS max_length_of_stay
FROM admissions a
JOIN discharges d ON a.admission_id = d.admission_id
GROUP BY primary_diagnosis;

-- question  Bonus challenge
SELECT a.service,
	COUNT(DATEDIFF(d.discharge_date, a.admission_date)) AS total_length_of_stay,
    AVG(DATEDIFF(d.discharge_date, a.admission_date)) AS average_length_of_stay
FROM admissions a
JOIN discharges d ON a.admission_id = d.discharges_id
GROUP BY service;