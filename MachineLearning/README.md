# ML Classification 
Simple [POST] endpoint which will predict whether the patient have diabetes or not 

## Requirements
- Python 3.7.x
- Installing required packages
```
pip install -r requirements.txt
```
## How to run
- open terminal and export the following system variables

```
export FLASK_APP=app
export FLASK_ENV=development
flask run

```

the server now will work on localhost port 5000

## Endpoints
[***POST***] - https://127.0.0.1:5000/predict
```json
[
    {"Glucose":50,"BloodPressure":50,"BMI":100,"DiabetesPedigreeFunction":0.62,"Age":50}
]
````





