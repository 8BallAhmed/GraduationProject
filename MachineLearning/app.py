# libraries
from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
import numpy as np
from inference import write_to_csv


app = Flask(__name__)

clf = joblib.load("model.pkl")
print ('Model loaded')
model_columns = joblib.load("model_columns.pkl") 
print ('Model columns loaded')

@app.route('/predict', methods=['POST'])
def predict():
    if clf:
        try:   
            
            body = request.get_json()
            
            pregnancies = body.get('Pregnancies')
            glucose = body.get('Glucose')
            blood_pressure = body.get('BloodPressure')
            bmi = body.get('BMI')
            age = body.get('Age')
            
            query = np.array([pregnancies,glucose,blood_pressure,bmi,age]).reshape(1,-1)
            prediction = list(clf.predict(query))
            
            # i had to do it this way :) brain 404
            # this will write a new row into a csv file called diabetes_new.csv
            # the new row will contains the following
            # body data
            # predection result
            row = []
            row.append(pregnancies)
            row.append(glucose)
            row.append(blood_pressure)
            row.append(bmi)
            row.append(age)
            row.append(prediction[0])
            
            # this function will be called from inference file
            write_to_csv(row)
            
            
            
            return jsonify({'prediction': str(prediction)})
        except:             
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

