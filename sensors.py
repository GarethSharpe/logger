'''
Created on Oct 16, 2017

@author: Gareth sharpe
'''

# import RPi.GPIO as GPIO

from datetime import datetime

# define number of sensors constant
NUM_SENSORS = 5
SENSORS = ["Temperature", "Humidity", "Light", "Pressure", "Flow"]
MAX_ERROR_VALUES = [10, 20, 30, 40, 50]
MIN_ERROR_VALUES = [0, 0, 0, 0, 0]

# define GPIO pins with variables
read_pin = 18
s1_pin = 0
s2_pin = 1
s3_pin = 3
s4_pin = 4
s5_pin = 5

def get_sensor_data():
    s1_data = 1 # analog_read(s1_pin)
    s2_data = 2 # analog_read(s2_pin)
    s3_data = 3 # analog_read(s3_pin)
    s4_data = 4 # analog_read(s4_pin)
    s5_data = 5 # analog_read(s5_pin)
    timestamp = str(datetime.now())
    return [timestamp, s1_data, s2_data, s3_data, s4_data, s5_data]

# create discharge function for reading capacitor data
def discharge(out_pin):
    GPIO.setup(read_pin, GPIO.IN)
    GPIO.setup(out_pin, GPIO.OUT)
    GPIO.output(out_pin, False)
    time.sleep(0.005)

# create analog read function for reading charging and discharging data
def analog_read(out_pin):
    discharge(out_pin)
    return charge_time()

def is_error(data):
    del a[0] # throw away time stamp
    error_data = []
    error_sensors = []
    sensor = 0
    while sensor < NUM_SENSORS:
        if data[sensor] > MAX_ERROR_VALUES[sensor] or data[sensor] < MIN_ERROR_VALUES[sensor]:
            errors_data.append(data[sensor])
            errors_sensors.append(SENSORS[sensor])
    return error_data, error_sensors

	