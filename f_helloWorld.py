from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, Welcome to 6:30pm class. How are you?'
    
    
if __name__ == "__main__":
    app.run(debug=False)