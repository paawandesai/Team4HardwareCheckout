import os
import json
from flask import Flask, send_from_directory,request,json,jsonify
from flask_cors import cross_origin, CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
"""
@app.route('/getLastName/<firstName>')
@cross_origin()
def hello_world(firstName):
    if firstName == "Abhay":
        successM = {"name": "Samant", "code": 200}
        return jsonify(successM), 200
    else:
        errorM = {"error": "User Not Found", "code": 404}
        return jsonify(errorM), 404
"""

@app.route('/testing/', methods=["POST"])
def find_name():
    print('GET request working')
    #checkList = {"username": "test", "password": "test"}
    #returnValue = ""
    data = request.json
    usernameInput = data['username']
    userIDInput = data['userID']
    passwordInput = data['password']
    if usernameInput == "test" and passwordInput == "test" and userIDInput == "test":
        return jsonify({'verified':True})
    else:
        return jsonify({'verified':False})
    """
    for firstName in nameList:
        if (firstNameInput == firstName):
            returnValue = nameList[firstName]
        else:
            returnValue = "User Not Found"
    """
    

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
