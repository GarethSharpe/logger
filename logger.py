'''
Created on Oct 14, 2017

@author: Gareth sharpe
@version: 1.3.5
'''

import os
import csv
import utilities
import sensors

from datetime import datetime
from time import sleep

# initialize date variables
hour = datetime.now().hour
month = datetime.now().month
year = datetime.now().year

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
writer.writerow(['date-time', 'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5'])

# console print (for testing)
print("file name:", file_name)
print("current year", wipe_year - 1)
print("wipe year:", wipe_year)
print(['time-stamp', 'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5'])

# intialize times to send email
noon = 12
midnight = 24

# initialize error and email variables
error = True
emailed_today = False

# MAIN PROGRAM #
while True:

    # write data to the file
    data = sensors.get_sensor_data()
    writer.writerow(data)
    file.flush()

    # print the data (for testing)
    print(data)
    
    # wait one second
    sleep(1)

    # update hour and month
    hour = datetime.now().hour
    month = datetime.now().month

    # if an error is detect and user has not been notified in
    # the past 12 hours, send a notificaion email of error
    if error == True and (hour == noon or hour == midnight) and not emailed_today:
        utilities.send_warning_email(smtp, from_email, to_email)
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
        upload_hour = (datetime.now().hour + 1) % 24
    
    # if the file has been open for one month, upload to dropbox 
    # and delete file. After file deletion, setup next file        
    if month == upload_month:
        file.seek(0)
        dbx.files_upload(str.encode(file.read()), '/' + logger + '/' + file_name)
        file.close()
        os.remove(file)
        upload_month = month + 1
        file, file_name = utilities.setup_file(month, year)
        writer.writerow(['date-time', 'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5'])
