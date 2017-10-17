'''
Created on Oct 14, 2017

@author: Gareth sharpe
@version: 1.3.5
'''

import os
import csv
import utilities
import sensors

from time import sleep

# initialize date variables
hour, month, year = utilities.get_time()

# setup necessary elements
dbx = utilities.setup_dropbox()
smtp, from_email, to_email = utilities.setup_email()
file, file_name = utilities.setup_file(month, year)
writer = csv.writer(file)

# initialize upload/wipe times
upload_hour = hour + 1
upload_month = month + 1
wipe_year = year + 1

# setup headers of file
header = utilities.get_header(sensors.SENSORS)
writer.writerow(header)

# console print (for testing)
print("file name:", file_name)
print("current year", wipe_year - 1)
print("wipe year:", wipe_year)
print(header)

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

        # write data to the file
        data = sensors.get_sensor_data()
        writer.writerow(data)
        file.flush()

        # print the data (for testing)
        print(data)

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
            utilities.send_warning_email(smtp, from_email, to_email, error_data, error_sensors)
            emailed_today = True
            error = False
        
        # if the user has been emailed but not in the past 12 hours,
        # update emailed_today variable 
        if emailed_today and not (hour == noon or hour == midnight):
            emailed_today = False
        
        # upload the file to dropbox every hour        
        if hour == upload_hour:
            file.seek(0)
            dbx.files_upload(str.encode(file.read()), '/' + logger + '/' + file_name, dropbox.files.WriteMode.overwrite, mute=True)
            upload_hour = (hour + 1) % 24
        
        # if the file has been open for one month, upload to dropbox 
        # and delete file. After file deletion, setup next file        
        if month == upload_month:
            file.seek(0)
            dbx.files_upload(str.encode(file.read()), '/' + logger + '/' + file_name)
            file.close()
            os.remove(file)
            upload_month = month + 1
            file, file_name = utilities.setup_file(month, year)
            writer = csv.writer(file)
            writer.writerow(header)

        # wait one second
        sleep(1)
except KeyboardInterrupt:
    sleep(.1)
    file.close()
    print("program terminated safely")
