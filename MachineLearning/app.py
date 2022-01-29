# Dependencies
from flask import Flask, request, jsonify
import joblib
import traceback

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
            json_ = request.json
            print(json_)
            query = pd.get_dummies(pd.DataFrame(json_))
            query = query.reindex(columns=model_columns, fill_value=0)
            prediction = list(clf.predict(query))
            return jsonify({'prediction': str(prediction)})

        except:
            
            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

