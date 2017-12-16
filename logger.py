'''
Created on Oct 14, 2017

@author: Gareth sharpe
@version: 1.4.0
'''

import os
import csv
import utilities
import sensors

from classes import LoggerData
from firebase import firebase
from time import sleep

# testing
import random

# create firebase reference
firebase = firebase.FirebaseApplication('https://logger-dashboard.firebaseio.com', None)

# initialize date variables
hour, month, year = utilities.get_time()

# setup necessary elements
smtp, from_email, to_email = utilities.setup_email()

# setup logs and files
file, file_name, logger = utilities.setup_file(month, year)

# setup writers
writer = csv.writer(file)

# initialize upload/wipe times
upload_month = month + 1
wipe_year = year + 1
i = 0

# setup headers of file
header = utilities.get_header(sensors.SENSORS)
writer.writerow(header)

# intialize times to send email
noon = 12
midnight = 24

# initialize error and email variables
# TODO: update error 
error = True
emailed_today = False

# MAIN PROGRAM LOOP #
try:
    while True:

        # get data from sensors
        data = sensors.get_sensor_data()
        firebase_data = LoggerData(data).toJSON()
        power_data = LoggerData(data).power
        email = to_email.replace('.', '-')

        # write data to firebase
        i += 1
        try:
            firebase.put('/' + email, 'current', firebase_data)
            firebase.put('/' + email, 'data/' + str(i), firebase_data)
            firebase.put('/' + email, 'power', power_data)
        except:
            i -= 1

        # write data to the necessary files
        writer.writerow(data)
        file.flush()

        # update hour and month
        hour, month, _ = utilities.get_time()

        # TODO: implement error detection
        # error_data, error_sensors = sensors.is_error(data)
        # TESTING
        error_data = [11]
        error_sensors = ['Temperature']

        # if an error is detect and user has not been notified in
        # the past 12 hours, send a notificaion email of error
        # TODO: update error 
        # TODO: update send_warning_email() to take error_data and error_sensors
        if error == True and (hour == noon or hour == midnight) and not emailed_today:
            try:
                utilities.send_warning_email(smtp, from_email, to_email, error_data, error_sensors, logger)
                emailed_today = True
                error = False
            except:
                print("Failed to send email.")
        
        # if the user has been emailed but not in the past 12 hours,
        # update emailed_today variable 
        if emailed_today and not (hour == noon or hour == midnight):
            emailed_today = False

        # if the file has been open for one month, upload to dropbox 
        # and delete file. After file deletion, setup next file        
        if month == upload_month:
            file.close()
            upload_month = month + 1
            file, file_name = utilities.setup_file(month, year)
            writer = csv.writer(file)
            writer.writerow(header)
            i = 0

        # TODO: change to one second if applicable
        # wait ten second
        sleep(10)
except KeyboardInterrupt:
    sleep(.1)
    file.close()
    print("program terminated safely")
