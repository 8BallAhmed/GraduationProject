from flask import Flask, jsonify, request,abort
import pandas as pd
import numpy as np
from sklearn import svm
import traceback
import os
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy import create_engine
import psycopg2


dotenv_path = '.env'
load_dotenv(dotenv_path=dotenv_path)

#server configuration
port=os.environ['FLASK_PORT']
debug=os.environ['DEBUG']

#establish database connection
username = os.environ['DBUSER']
password = os.environ['DBPASSWORD']
db_string = 'postgresql://{username}:{password}@localhost:5432/glucoguardian'.format(username=username, password=password)
engine = create_engine(db_string)


def fetch_glucose_test(patient_id):
    
    sql = 'SELECT glucose_level FROM glucose_test \
    WHERE patient_id={patient_id} AND anamoly=False \
    ORDER BY time DESC LIMIT 10;'.format(patient_id=patient_id)
    
    with engine.connect() as con:
        rs = con.execute(sql)
        x = list()
        
    for row in rs:
        x.append(row[0])
    return np.array(x).reshape(1,-1)


app = Flask(__name__)


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
        patient_id = body['patient_id']
        glucose_level = body['glucose_level']


        
    except:
        print('error fetching records from the endpoint')
        return jsonify({'trace': traceback.format_exc()})
   
    try:
        # fetching data from database through fetch_glucose_test method
        x_train = fetch_glucose_test(patient_id).reshape(-1,1)
    except:
        print('error fetching records from database')
        return jsonify({'trace': traceback.format_exc()})
    try:
        # fit the model and detect anamoly
        clf = svm.OneClassSVM(nu=0.1, kernel="rbf", gamma=0.1)
        clf.fit(x_train)
        x_test = np.array(glucose_level).reshape(1,-1)
        y_pred = clf.predict(x_test)
        
        print(y_pred)
        
    except:
        print('error while detecting an anamoly')
        return jsonify({'trace': traceback.format_exc()})
    
    return jsonify({
        'status': 200,
        'message': 'success',
        'result': int(y_pred)
        })

if __name__ == '__main__':

    app.run(port=port,debug=debug)
