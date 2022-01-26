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

```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

the server now will work on localhost port 7070

## Endpoints
[***POST***] - https://127.0.0.1:5000/predict
- JSON Body
```json
[
    {"Glucose":50,"BloodPressure":50,"BMI":100,"DiabetesPedigreeFunction":0.62,"Age":50}
]
````
- Expected JSON response 

```json
{
    "prediction": "[1]"
}
```
- 1 = Have diabetes
- 0 = Don't Have Diabetes





