SELECT 
    p.patient_id,
    d.doctor_id,
    ac.name,
    p.diabetes_type,
    a.date
FROM patient p , doctor d, appointment a , account ac 
WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = p.fk_email AND a.fk_patient_id = p.patient_id)  AND (a.fk_doctor_id = 1) ;

SELECT 
    p.patient_id,
    a.name,
    a.gender,
    a.dob,
    a.phone_number,
    a.email,
    a.city,
    a.address,
    p.diabetes_type,
    p.diabetes_treatment,
    p.bmi
FROM 
    patient p , account a
    WHERE p.fk_email = a.email AND p.patient_id = 1;

SELECT 
    d.doctor_id,
    a.name,
    a.gender,
    a.dob,
    a.phone_number,
    a.email,
    a.city,
    a.address
FROM 
    doctor d , account a
    WHERE d.fk_email = a.email;

SELECT * FROM activity WHERE patient_id=patient_id
-- query to get appoinments for given doctor id 

SELECT 
    ac.name,
    p.fk_email,
    p.diabetes_type,
    a.visit_time,
    a.date
FROM patient p , doctor d, appointment a , account ac 
WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = p.fk_email AND a.fk_patient_id = p.patient_id) AND (a.date >= CURRENT_DATE) AND (a.fk_doctor_id = 1) ;

SELECT 
ac.name,
a.visit_time,
a.date
FROM patient p , doctor d, appointment a , account ac 
WHERE (a.fk_doctor_id = d.doctor_id AND ac.email = d.fk_email AND a.fk_patient_id = p.patient_id) AND (a.date >= CURRENT_DATE) AND (a.fk_patient_id = 1) ;