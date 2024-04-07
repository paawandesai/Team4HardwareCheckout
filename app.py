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

def encrypt(inputText, N, D):
    reverseInput = inputText[::-1]
    output = ""
    match D:
        case 1:
            for i in reverseInput:
                if(ord(i) != 32 or ord(i) != 33):
                    outChr = ord(i) + N
                    if(outChr > 126):
                        outChr = outChr - 93
                    output = output + chr(outChr)
                else:
                    output[i] = i
            return output
        case -1:
            for i in reverseInput:
                if(ord(i) != 32 or ord(i) != 33):
                    outChr = ord(i) - N
                    if(outChr < 34):
                        outChr = 126 - (33 - outChr)
                    output = output + chr(outChr)
                else:
                    output[i] = i
            return output
        case _:
            return "invalid direction"

def decrypt(inputText, N, D):
    unReversedText = inputText[::-1]
    output = ""
    match D:
        case -1:
            for i in unReversedText:
                if(ord(i) != 32 or ord(i) != 33):
                    outChr = ord(i) + N
                    if(outChr > 126):
                        outChr = outChr - 93
                    output = output + chr(outChr)
                else:
                    output[i] = i
            return output
        case 1:
            for i in unReversedText:
                if(ord(i) != 32 or ord(i) != 33):
                    outChr = ord(i) - N
                    if(outChr < 34):
                        outChr = 126 - (33 - outChr)
                    output = output + chr(outChr)
            else:
                output[i] = i
            return output
        case _:
            return "invalid direction"
        

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")


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

    encrypted_password = encrypt(passwordInput, 1, 1)

    myquery = {
                "username":usernameInput,
                "userID":userIDInput,
                "password":encrypted_password
                }
    
    
    x = users.find_one(myquery)
    
    client.close()
    if x:
        print("Verified")
        return jsonify({'verified':True})
    else:
        return jsonify({'verified':False})
    
@app.route('/create-account/', methods=["POST"])
def create_acc():
    print("acc creation page")
    data = request.json
    usernameInput = data['username']
    userIDInput = data['userID']
    passwordInput = data['password']

    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = pymongo.MongoClient(uri)
    db = client.ProjectDatabse
    users = db.Users

    encrypted_password = encrypt(passwordInput, 1, 1)

    new_user = {
        "username":usernameInput,
        "userID":userIDInput,
        "password":encrypted_password
    }

    x = users.find_one(new_user)

    if not x:
        users.insert_one(new_user)
        client.close()
        return jsonify({'verified':True})
    else:
        client.close()
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
                "checkedOut":0
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
    capacity_1 = x1["Capacity"]
    capacity_2 = x2["Capacity"]
    Availability_1 = x1["Availability"]
    Availability_2 = x2["Availability"]
    #print(Availability_1,Availability_2)
    client.close()
    return jsonify({'Availability_1':Availability_1,'Availability_2':Availability_2,
                    'capacity_1':capacity_1,'capacity_2':capacity_2})


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
    
@app.route("/checkIn/", methods=["POST"])
def checkIn():
    data = request.json
    projectID = data['projectID']
    qty = data['qty']
    number = data['number']

    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = pymongo.MongoClient(uri)
    db = client.ProjectDatabse
    HWsets = db.HardwareSets
    
    
    myquery = {
                "Description":"HardwareSet"+str(number),
                }
    x = HWsets.find_one(myquery)
    availability = x["Availability"]
    project = db.Projects
    curr_project = project.find_one({'projectID':projectID})
    checkedout = curr_project["checkedOut"]
    if (int(qty)) > checkedout:
        checkedin = False
        client.close()
        return jsonify({'projectID':projectID,"qty":qty,"checkedin":False})
    availability += int(qty)
    comb = "HardwareSet"+str(number)
    HWsets.update_one({'Description':comb},{'$set':{'Availability': availability}})
    project.update_one({'projectID':projectID},{'$inc':{"checkedOut":-1*int(qty)}})
    client.close()
    print(qty + projectID)
    return jsonify({'projectID':projectID,"qty":qty,"checkedin":True})

@app.route("/checkOut/", methods=["POST"])
def checkOut():
    data = request.json
    number = data['number']
    projectID = data['projectID']
    qty = data['qty']

    uri = "mongodb+srv://testing-user:PBjy3HBmoe7gierR@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = pymongo.MongoClient(uri)
    db = client.ProjectDatabse
    HWsets = db.HardwareSets
    
    
    myquery = {
                "Description":"HardwareSet"+str(number),
                }
    x = HWsets.find_one(myquery)
    availability = x["Availability"]
    checkedout = True
    if availability-int(qty)<0:
        checkedout = False
        client.close()
        return jsonify({'projectID':projectID,"qty":qty,"checkedout":checkedout})
    availability -= int(qty)
    comb = "HardwareSet"+str(number)
    HWsets.update_one({'Description':comb},{'$set':{'Availability': availability}})
    project = db.Projects
    project.update_one({'projectID':projectID},{'$inc':{"checkedOut":int(qty)}})
    client.close()

    return jsonify({'projectID':projectID,"qty":qty,"checkedout":checkedout})
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