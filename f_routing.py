from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, Section2.'

@app.route('/get_availability')
def get_availability():
    return 'Hello, Section2.'

@app.route('/get_availability')
def get_availability():
    return 'Hello, Section2.'
      
@app.route('/welcome')
def welcome():
    return 'Welcome, World'
    
if __name__ == "__main__":
    app.run(debug=True)