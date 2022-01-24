import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
np.random.seed(707)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report,auc,roc_curve
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report,auc,roc_curve

data = pd.read_csv('./diabetes.csv');

data.drop(['SkinThickness','Insulin','Pregnancies'],axis=1,inplace=True);

print('The number of missing values in Glucose are : ',data[data['Glucose'] == 0].count()[1])
print('The number of missing values in BloodPressure are : ',data[data['BloodPressure'] == 0].count()[1])
print('The number of missing values in BMI are : ',data[data['BMI'] == 0].count()[1])
print('The number of missing values in DiabetesPedigreeFunction are : ',data[data['DiabetesPedigreeFunction'] == 0].count()[1])
print('The number of missing values in Age are : ',data[data['Age'] == 0].count()[1])

data[['Glucose','BloodPressure','BMI']] = data[['Glucose','BloodPressure','BMI']].replace(to_replace=0,value=np.nan)

data['Glucose'] = data['Glucose'].replace(to_replace=np.nan,value=data['Glucose'].mean())
data['BloodPressure'] = data['BloodPressure'].replace(to_replace=np.nan,value=data['BloodPressure'].mean())
data['BMI'] = data['BMI'].replace(to_replace=np.nan,value=data['BMI'].mean())

X = data.drop('Outcome',axis=1)
y = data['Outcome']


x_train,x_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)


std = StandardScaler()
x_train =std.fit_transform(x_train)
x_test = std.fit_transform(x_test)

params={'penalty':('l1','l2','elasticnet','none'),
        'solver':('newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga'),
        'C':[0.1, 1, 10, 100, 1000]}

lr = LogisticRegression(max_iter=1000,random_state=42)
clf = GridSearchCV(lr,params)
clf.fit(x_train,y_train)

y_pred = clf.predict(x_test)


accuracy_score = classification_report(y_test,y_pred)
print(accuracy_score)
print('Best parameter was',clf.best_params_)

print("\n","ROC Curve")
clf_prob=clf.predict_proba(x_test)
clf_prob1=clf_prob[:,1]
fpr,tpr,thresh=roc_curve(y_test,clf_prob1)
roc_auc_knn=auc(fpr,tpr)
plt.figure(dpi=80)
plt.title("ROC Curve")
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.plot(fpr,tpr,'b',label='AUC Score = %0.2f'%roc_auc_knn)
plt.plot(fpr,fpr,'r--',color='red')
plt.legend()
plt.show()



params = {'criterion':('gini','entropy')}

rf = RandomForestClassifier(n_estimators=1000,n_jobs=-1,random_state=42)
clf = GridSearchCV(rf,params)

clf.fit(x_train,y_train)
y_pred = clf.predict(x_test)

accuracy_score = classification_report(y_test,y_pred)
print(accuracy_score)
print(clf.best_params_)

print("\n","ROC Curve")
clf_prob=clf.predict_proba(x_test)
clf_prob1=clf_prob[:,1]
fpr,tpr,thresh=roc_curve(y_test,clf_prob1)
roc_auc_knn=auc(fpr,tpr)

plt.figure(dpi=80)
plt.title("ROC Curve")
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.plot(fpr,tpr,'b',label='AUC Score = %0.2f'%roc_auc_knn)
plt.plot(fpr,fpr,'r--',color='red')
plt.legend()
plt.show()

# exporting the model as pkl
joblib.dump(clf,'model.pkl')

# exporting the columns
model_columns = list(X.columns)
joblib.dump(model_columns, 'model_columns.pkl')