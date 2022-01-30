import pandas as pd
import numpy as np
from csv import writer

def write_to_csv(json_input):
    with open('diabetes_new.csv', 'a') as f_object:
    
        writer_object = writer(f_object)
    
        writer_object.writerow(json_input)
    
        f_object.close()
        

    
