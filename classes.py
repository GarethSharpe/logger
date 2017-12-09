import json

class LoggerData:
    def __init__(self, data):
    	self.date = data[0]
    	self.temperature = data[1]
    	self.humidity = data[2]
    	self.light = data[3]
    	self.pressure = data[4]
    	self.flow = data[5]
    	self.power = data[6]

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
