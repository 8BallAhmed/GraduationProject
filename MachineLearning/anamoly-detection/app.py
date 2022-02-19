from flask import Flask
import pandas as pd
import os
from dotenv import load_dotenv
from pathlib import Path

import sqlalchemy
from sqlalchemy import create_engine,text



dotenv_path = Path('././.env')
load_dotenv(dotenv_path=dotenv_path)

username = os.environ['DBUSER']
password = os.environ['DBPASSWORD']

engine = create_engine('postgresql://{username}:{password}@localhost:5432/glucoguardian'.format(username=username,password=password))

with engine.connect() as con:
    rs = con.execute('SELECT * FROM glucose_test')
    for row in rs:
        print(row)
        
# app = Flask(__app__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:postgres@localhost:5432/glucoguardian'
# db=SQLAlchemy(app)

'''
anamoly detection endpoint
1- fetch all patient glucose_test to train the model upon each request and append the upcoming glucose_tests
2- request is made after 7 glucose_tests
3- within the endpoint classify if the glucose_test was before or after food for better model accuracy
4- if anamoly was detected set the anamoly attribute to true : else false
'''
# @app.route('/detect-anamoly',methods=['POST'])
# def anamoly_detection():
#     try :
        
#         body = request.get_json()
#         patient_id = body.get('patient_id')
#     except :
#         print('hello')

#     return Response('Hellow')