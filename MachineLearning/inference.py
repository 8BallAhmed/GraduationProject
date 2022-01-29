import pandas as pd
import numpy as np
from csv import writer

def write_to_csv(json_input):
    with open('event.csv', 'a') as f_object:
    
        # Pass this file object to csv.writer()
        # and get a writer object
        writer_object = writer(f_object)
    
        # Pass the list as an argument into
        # the writerow()
        writer_object.writerow(List)
    
        #Close the file object
        f_object.close()
        

    
