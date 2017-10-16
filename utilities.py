'''
Created on Oct 16, 2017

@author: Gareth sharpe
'''

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate
from smtplib import SMTP

import dropbox

def setup_email():
    smtp = SMTP('smtp.gmail.com', 587)
    smtp.ehlo()
    smtp.starttls()
    from_email = "data.monitor.service@gmail.com"
    pswrd = input("password: ")
    to_email = input("email: ")
    smtp.login(from_email, pswrd)
    return smtp, from_email, to_email

def send_warning_email(smtp, from_email, to_email):
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Date'] = formatdate(localtime = True)
    msg['Subject'] = "Unusual Activity Detected"
    msg.attach(MIMEText('''Hey James,
    \nI think I may have come across an issue today!
    \nI will notify you again if there is a problem in 12 hours.
    \nLogger,
    \n''' + logger))
    smtp.sendmail(from_email, to_email, msg.as_string())
    return

def setup_dropbox():
    dbx = dropbox.Dropbox('xLeSoI1nzAAAAAAAAAAADXgvls4a1_5Nilz1W8MF3aw1Qj8rVP2V2thWfy2qnqwF')
    dbx.users_get_current_account()
    return dbx

def setup_file(month, year):
    logger = input("logger name: ")
    file_name = logger + '-' + str(month) + '-' + str(year) + '.csv'
    file =  open(file_name, 'a+', newline='')
    return file, file_name