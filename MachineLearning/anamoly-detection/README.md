# Anamoly detection Using Machine Learning
This is simple MachineLearning Endpoint to detect novels within last 10 records from glucose test table from given patient using LocalOutLierFactor Algorithm
## Requirements
- Python 3.7.x
- Installing pip packages 
- Tables and database configured through ./Backend/model.js using ORM 
<br>
## Installing pip packages
``` bash
pip -r install requirements.txt
```
## How to run
```bash
export DBUSER=Database name
export DBPASSWORD=Database Password
export FLASK_PORT=5000
export debug=True
python app.py
```
## Endpoint

[***POST***] - https://127.0.0.1:5000/detect-anamoly
- JSON Body
```json
{
    "patient_id":1,
    "glucose_level":200
}
````
- Expected JSON response 

```json
{
    "status": 200,
    "message":"success",
    "result":-1
}
```
- -1 = Means anamoly
-  0 = There is no enough records to perform anamoly detetion
-  1 = There is enough records and the incoming glucose test is not considered as anamoly


