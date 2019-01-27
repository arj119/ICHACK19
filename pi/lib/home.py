import serial
import time

class Home(object):
	def __init__(self):
		self.ser = serial.Serial('COM3')

	def toggle(self, data):
		self.ser.write(data.encode())

	def all_off(self, type):
		x = ("R" + type + "R$")
		self.ser.write(x.encode())

	def all_on(self):
		x = "TTT$"
		self.ser.write(x.encode())


	def set_mode(self):
		x = time.time()
		while time.time() - x <= 20:
			self.ser.write("THR$".encode())
			time.sleep(1)
		self.all_off("R")
		print ("Done")