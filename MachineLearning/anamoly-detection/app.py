from flask import Flask, jsonify, request,abort
import pandas as pd
import numpy as np
from sklearn.neighbors import LocalOutlierFactor
import traceback
import os
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy import create_engine
import psycopg2


dotenv_path = '../.env'
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
    cnt = 0;    
    for row in rs:
        x.append(row[0])
        cnt=cnt+1 # to count the amount of records fetched from the database query
    if(cnt < 9): # if counter is less than 10 then it means the user doesn't have enough glucose tests to train the model and detect anamoly
        return 0
    # else :  the user have enough record and can fit the data into the model
    return np.array(x).reshape(-1,1)


app = Flask(__name__)

# testing endpoint :3
@app.route('/hello',methods=['GET'])
def test():
    return jsonify({'status':200})

# main endpoint route
@app.route('/detect-anamoly', methods=['POST'])
def anamoly_detection():
    
    try:
        # fetching raw data from body
        body = request.get_json()
        patient_id = body['patient_id']
        glucose_level = body['glucose_level']
    except:
        return jsonify({
            'status':400,
            'message':'error fetching records from the endpoint'
        })
   
    try:
        # fetching data from database through fetch_glucose_test method
        x_train = fetch_glucose_test(patient_id)
        if(type(x_train) == int):# to check the returned value from fetch_glucose_test if it's an int or np.array
            if(x_train == 0):# if it's int then the result will equals 0 in that case there is no enough record
                return jsonify({
                    'status':200,
                    'message':'there is no enough record to train the model',
                    'result':x_train # returned value should be 0
                })
    except:
        return jsonify({
            'status':400,
            'message':'error fetching records from database',
            'trace':traceback.format_exc(),
        })
    try:        
        # fit the model and detect anamoly
        clf = LocalOutlierFactor(n_neighbors=9,metric='euclidean',p=1,novelty=True)
        clf.fit(x_train)
        x_test = [[glucose_level]]
        y_pred = clf.predict(x_test)
        
    except:
        return jsonify({
            'status':400,
            'message':'error while detecting an anamoly',
            'trace':traceback.format_exc(),
        })
    
    print(type(int(y_pred[0])))
    return jsonify({
        'status': 200,
        'message':'success',
        'result':int(y_pred[0])
        })

if __name__ == '__main__':
    app.run(port=port,debug=debug)

