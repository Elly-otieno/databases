--  question 1: Simple join
SELECT CONCAT(first_name, ' ', last_name) AS provider_name, provider_specialty
FROM providers;

--  question 2: Inner join
SELECT a.patient_id, a.first_name, a.last_name, p.provider_specialty
FROM visits v
INNER JOIN patients a ON v.patient_id = a.patient_id
INNER JOIN providers p ON v.provider_id = p.provider_id;

--  question 3: Left join
SELECT p.patient_id, p.first_name, p.last_name, v.date_of_visit
FROM patients p
LEFT JOIN visits v ON p.patient_id = v.patient_id;

--  question 4: Join with aggregation
SELECT CONCAT(p.first_name, ' ', p.last_name) AS provider_name, COUNT(v.visit_id) AS count_of_visits 
FROM providers p
JOIN visits v ON p.provider_id = v.provider_id
GROUP BY p.provider_id;

--  question 5: Complex join with conditions
SELECT p.patient_id, p.first_name, p.last_name, a.admission_date, d.discharge_date
FROM patients p
INNER JOIN admissions a ON p.patient_id = a.admission_id
LEFT JOIN discharges d ON p.patient_id = d.discharges_id;

--  Bonus question
SELECT p.first_name, p.last_name, p.date_of_birth, 
	CONCAT(pr.first_name, ' ', pr.last_name) AS provider_name, 
    v.date_of_visit, v.blood_pressure_systolic, v.blood_pressure_diastolic, v.visit_status,
    a.admission_date, a.service, a.primary_diagnosis, 
    d.discharge_date
FROM patients p
JOIN visits v ON p.patient_id = v.patient_id
JOIN providers pr ON v.provider_id = pr.provider_id
JOIN discharges d ON p.patient_id = d.discharges_id
JOIN admissions a ON p.patient_id = a.patient_id
WHERE d.discharge_disposition = 'Home'
ORDER BY v.date_of_visit DESC;