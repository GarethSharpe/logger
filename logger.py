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

# REMOVED FEATURE
# dbx = utilities.setup_dropbox()

# setup logs and files
file, file_name, logger = utilities.setup_file(month, year)
chart_log = utilities.setup_chart_log()
gauge_log = utilities.setup_gauge_log()

# FUTURE FEATURE
# temperature_log, flow_log, pressure_log = utilities.setup_line_gauge_logs()

# setup writers
writer = csv.writer(file)
chart_writer = csv.writer(chart_log)

# initialize upload/wipe times
upload_hour = hour + 1
upload_month = month + 1
wipe_year = year + 1
i = 0

# setup headers of file
header = utilities.get_header(sensors.SENSORS)
writer.writerow(header)

# console print (for testing)
print("file name:", file_name)
print("current year", wipe_year - 1)
print("wipe year:", wipe_year)

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
        firebaseData = LoggerData(data).toJSON()
        powerData = LoggerData(data).power
        email = to_email.replace('.', '-')
        i += 1
        firebase.put('/' + email, 'current', firebaseData)
        firebase.put('/' + email, 'data/' + str(i), firebaseData)
        firebase.put('/' + email, 'power', powerData)

        # write data to the necessary files
        writer.writerow(data)
        chart_writer.writerow(data)
        gauge_log.write("{}".format(random.uniform(4, 5))) # TODO: get power output from Pi

        # FUTURE FEATURE
        # temperature_log.write("{}".format(data[1]))
        # flow_log.write("{}".format(data[5]))
        # pressure_log.write("{}".format(data[4]))
        # temperature_log.flush()
        # flow_log.flush()
        # pressure_log.flush()
        # temperature_log.seek(0)
        # flow_log.seek(0)
        # pressure_log.seek(0)

        # flush all files
        file.flush()
        chart_log.flush()
        gauge_log.flush()

        # rewind certain files for overwrite
        gauge_log.seek(0)

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
            utilities.send_warning_email(smtp, from_email, to_email, error_data, error_sensors, logger)
            emailed_today = True
            error = False
        
        # if the user has been emailed but not in the past 12 hours,
        # update emailed_today variable 
        if emailed_today and not (hour == noon or hour == midnight):
            emailed_today = False
        
        # REMOVED FEATURE
        # upload the file to dropbox every hour        
        # if hour == upload_hour:
        #     file.seek(0)
        #     dbx.files_upload(str.encode(file.read()), '/' + logger + '/' + file_name, dropbox.files.WriteMode.overwrite, mute=True)
        #     upload_hour = (hour + 1) % 24

        # CONTAINS REMOVED FEATURES
        # if the file has been open for one month, upload to dropbox 
        # and delete file. After file deletion, setup next file        
        if month == upload_month:
            # file.seek(0)
            # dbx.files_upload(str.encode(file.read()), '/' + logger + '/' + file_name)
            file.close()
            # os.remove(file)
            upload_month = month + 1
            file, file_name = utilities.setup_file(month, year)
            writer = csv.writer(file)
            writer.writerow(header)
            chart_log.close();
            chart_log = utilities.setup_chart_log()
            firebase.delete(email + '/data')
            i = 0

        # TODO: change to one second if applicable
        # wait five second
        sleep(10)
except KeyboardInterrupt:
    sleep(.1)
    file.close()
    print("program terminated safely")
