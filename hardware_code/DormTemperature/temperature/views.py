#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import glob
import time
import json
import requests



	
def read_temp_raw():
    #os.system('modprobe w1-gpio')
    #os.system('modprobe w1-therm')
 
    base_dir = '/sys/bus/w1/devices/'
    device_folder = glob.glob(base_dir + '28*')[0]
    device_file = device_folder + '/w1_slave'
	
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c

def upload():
	try:
		while(True):
			timestamp = []
			value = []
			payload=[]
			for i in range(0,2):
				print "[info]get temperatue from device, step:"+str(i)
				current_time = time.strftime(u"%Y-%m-%dT%X", time.localtime())
				timestamp.append(current_time)
				temp = read_temp();
				value.append(temp)
				data={"timestamp":current_time, "value":temp}
				payload.append(data)
				time.sleep(30*5);
				print data
			
			
			url = "http://api.yeelink.net/v1.0/device/346588/sensor/390045/datapoints"
			headers = {"U-ApiKey":"2f987cfab18d233c0dcb0f7132c9534b"}
			print "[payload]"+json.dumps(payload)
			
			r = requests.post(url, data=json.dumps(payload), headers=headers)
			print r
			
			print "[info]:\tupload--"+time.strftime(u"%Y-%m-%dT%X", time.localtime())
			time.sleep(11);
	except KeyboardInterrupt:
		print "程序终止"

if __name__ == '__main__':
	upload()
	
