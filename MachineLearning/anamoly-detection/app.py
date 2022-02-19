from flask import Flask, jsonify, request,abort
import pandas as pd
import numpy as np
from sklearn import svm
import traceback
import os
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy import create_engine


dotenv_path = Path('././.env')
load_dotenv(dotenv_path=dotenv_path)

username = os.environ['DBUSER']
password = os.environ['DBPASSWORD']

engine = create_engine(
    'postgresql://{username}:{password}@localhost:5432/glucoguardian'.format(username=username, password=password))


def fetch_glucose_test(patient_id):
    with engine.connect() as con:
        rs = con.execute('SELECT glucose_level FROM glucose_test where patient_id={patient_id} and anamoly=False'.format(
            patient_id=patient_id))
        x = list()
    for row in rs:
        x.append(row[0])
    return np.array(x)


app = Flask(__app__)

'''
anamoly detection endpoint
1- fetch all patient glucose_test to train the model upon each request and append the upcoming glucose_tests
2- request is made after 7 glucose_tests
3- within the endpoint classify if the glucose_test was before or after food for better model accuracy
4- if anamoly was detected set the anamoly attribute to true : else false
'''

@app.route('/hello',methods=['GET'])
def test():
    return jsonify({'status':200})

@app.route('/detect-anamoly', methods=['POST'])
def anamoly_detection():
    try:
        # fetching data from body
        body = request.get_json()
        patient_id = body.get('patient_id')
        glucose_level = body.get('glucose_level')
       
        # blood_pressure = body.get('blood_pressure')
        # pills = body.get('pills')
        # activity = body.get('activity')
        # meal = body.get('meal')
        # time_interval = body.get('time_interval')
        # meal = body.get('time')
        
    except:
        print('error fetching records from the endpoint')
        return jsonify({'trace': traceback.format_exc()})
    try:
        # fetching data from database
        X_train = fetch_glucose_test(patient_id)
    except:
        print('error fetching records from database')
        return jsonify({'trace': traceback.format_exc()})
    try:
        # fit the model and detect anamoly
        clf = svm.OneClassSVM(nu=0.1, kernel="rbf", gamma=0.1)
        clf.fit(X_train)
        y_pred = clf.predict(glucose_level)
    except:
        print('error while detecting an anamoly')
        return jsonify({'trace': traceback.format_exc()})
    return jsonify({
        'status': 200,
        'message': 'success',
        'result': y_pred
        })
