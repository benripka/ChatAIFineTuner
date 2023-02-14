import socketio

# Create a SocketIO client
sio = socketio.Client()

# Connect to the server
sio.connect('http://localhost:5000')

# Register a callback function to handle incoming messages
@sio.on('message')
def message(data):
    print('Received message:', data)

# Send a message to the server
sio.emit('message', {'data': 'Hello, Server!'})