# Dependencies
from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
from inference import write_to_csv

# Your API definition
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
            
            query = pd.get_dummies(pd.DataFrame(body))
            query = query.reindex(columns=model_columns, fill_value=0)
            
           
            pregnancies = body.get('Pregnancies')
            glucose = body.get('Glucose')
            blood_pressure = body.get('BloodPressure')
            bmi = body.get('BMI')
            age = body.get('Age')
            

            prediction = list(clf.predict(query))
            
            return jsonify({'prediction': str(prediction)})
        except:             
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

