import os
import json
from flask import Flask, send_from_directory,request,json,jsonify
from flask_cors import cross_origin, CORS
import pymongo

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


@app.route("/", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route('/create-account', methods=["POST"])
def create_acc():
    data = request.json
    usernameInput = data['username']
    userIDInput = data['userID']
    passwordInput = data['password']

    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = pymongo.MongoClient(uri)
    db = client.ProjectDatabase
    users = db.Users

    new_user = {
        "username":usernameInput,
        "userID":userIDInput,
        "password":passwordInput
    }

    x = users.insert_one(new_user)
    client.close()

@app.route('/login/', methods=["POST"])
def find_name():
    print('request working')
    

    data = request.json
    usernameInput = data['username']
    userIDInput = data['userID']
    passwordInput = data['password']

    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    # Create a new client and connect to the server
    client = pymongo.MongoClient(uri)

    db = client.ProjectDatabse
    users = db.Users
    
    myquery = {
                "username":usernameInput,
                "userID":userIDInput,
                "password":passwordInput
                }
    
    
    x = users.find_one(myquery)
    
    client.close()
    if x:
        print("Verified")
        return jsonify({'verified':True})
    else:
        return jsonify({'verified':False})
    

@app.route('/createProject/', methods=["POST"])
def create_project():
    print('request working')
    

    data = request.json
    nameInput = data['name']
    descInput = data['description']
    projectIDInput = data['projectID']

    #first try to see if projectID is already in database
    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    # Create a new client and connect to the server
    client = pymongo.MongoClient(uri)

    db = client.ProjectDatabse
    projects = db.Projects
    
    myquery = {
                "projectID":projectIDInput,
                }
    
    
    x = projects.find_one(myquery)
    
    
    if x:
        print("Already Exists")
        client.close()
        return jsonify({'created':False})
    else:
        projectDoc = {
                "name":nameInput,
                "description":descInput,
                "projectID":projectIDInput,
                "checkedOut":"0"
                    }
        projects.insert_one(projectDoc)
        client.close()
        return jsonify({'created':True,'projectID':projectIDInput})
    
@app.route('/getData/', methods=["GET"])
def get_data():
    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    # Create a new client and connect to the server
    client = pymongo.MongoClient(uri)

    db = client.ProjectDatabse
    HWsets = db.HardwareSets

    myquery = {
                "Description":"HardwareSet1",
                }
    
    
    x1 = HWsets.find_one(myquery)
    myquery = {
                "Description":"HardwareSet2",
                }
    
    
    x2 = HWsets.find_one(myquery)
    Availability_1 = x1["Availability"]
    Availability_2 = x2["Availability"]
    #print(Availability_1,Availability_2)
    client.close()
    return jsonify({'Availability_1':Availability_1,'Availability_2':Availability_2})


@app.route('/getProject/', methods=["POST"])
def get_project():
    data = request.json
    projectIDInput = data['projectID']
    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    # Create a new client and connect to the server
    client = pymongo.MongoClient(uri)

    db = client.ProjectDatabse
    projects = db.Projects
    
    myquery = {
                "projectID":projectIDInput,
                }
    
    
    x = projects.find_one(myquery)
    client.close()
    if x:
        return jsonify({'exists':True})
    else:
        return jsonify({'exists':False})
"""
@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5000)
"""
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False, port=os.environ.get("PORT", 80))