'''
Created on Oct 16, 2017

@author: Gareth sharpe
'''

# import RPi.GPIO as GPIO
# import piplates.DAQCplate as DAQC 

from datetime import datetime

# define sensor constants
NUM_SENSORS = 5
SENSORS = ["Temperature", "Humidity", "Light", "Pressure", "Flow"]
MAX_ERROR_VALUES = [10, 20, 30, 40, 50]
MIN_ERROR_VALUES = [0, 0, 0, 0, 0]

# define piplate address
ADDRESS = 0

# define red and green colours
RED = 0
GREEN = 1

# ANALOG TO DIGITAL FUNCTIONS
# DAQC.getADC(ADDRESS, channel) - return voltage from single channel
# DAQC.getADCall(ADDRESS) - return voltage from all channels 

# TODO: implement green status light
# green led signifies run
# DAQC.setLED(ADDRESS, color)

def get_sensor_data():
    timestamp = str(datetime.now())
    # TODO: remove testing data and call individual functions
    # TESTING
    s1_data = 1 # DAQC.getADC(ADDRESS, 0)
    s2_data = 2 # DAQC.getADC(ADDRESS, 1)
    s3_data = 3 # DAQC.getADC(ADDRESS, 2)
    s4_data = 4 # DAQC.getADC(ADDRESS, 3)
    s5_data = 5 # DAQC.getADC(ADDRESS, 4)

    # TODO: implement formatting functions
    # temp = round((temp_data - 2.73) * 100, 2)
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
    


	