from flask import Flask
from flask_socketio import SocketIO, emit
from lib.home import Home
import signal
import sys

port = 5000

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
house = Home()

def signal_handler(sig, frame):
	print('You pressed Ctrl+C!')
	socketio.stop()
	sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)


@socketio.on('toggle')
def toggle(data):
	print("toggle")
	house.toggle(data)

@socketio.on('all_off')
def all_off(data):
	house.all_off(data)

@socketio.on('all_on')
def all_on(data):
	house.all_on()


@socketio.on("set_mode")
def set_mode(data):
	house.set_mode()

print("Server running on port " + str(port))
socketio.run(app, host="192.168.137.1"
					   "", port=port)
