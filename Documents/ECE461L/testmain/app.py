import os
import json
from flask import Flask, send_from_directory,request,json,jsonify
from flask_cors import cross_origin, CORS
from pymongo.mongo_client import MongoClient

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0



@app.route('/checkout/', methods=['POST'])
def checkout():

    number = request.json['number']
    print("hello", flush=True)
    uri = "mongodb+srv://paawankdesai:Team4Checkout@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
 #   data = request.json
 #   description = data.get('description')
#  new_availability = data.get('available')
#    print(data)
    db = client.ProjectDatabse
    collection = db.HardwareSets
    result = collection.find_one(
        {'Description': number},
    )
    if result is not None:
        new_availability = result['Availability'] - 1
        collection.update_one({'Description': number}, {'$set': {'Availability': new_availability}})
        print(f"Updated availability of HardwareSet1 to {new_availability}")
    else:
        print("No document found with Description: HardwareSet1")

    print(result)
    return jsonify({"message": "Checkout successful"})

@app.route('/checkin/', methods=['POST'])
def checkin():

    number = request.json['number']
    print("hello", flush=True)
    uri = "mongodb+srv://paawankdesai:Team4Checkout@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
 #   data = request.json
 #   description = data.get('description')
#  new_availability = data.get('available')
#    print(data)
    db = client.ProjectDatabse
    collection = db.HardwareSets
    result = collection.find_one(
        {'Description': number},
    )
    if result is not None:
        new_availability = result['Availability'] + 1
        collection.update_one({'Description': number}, {'$set': {'Availability': new_availability}})
        print(f"Updated availability of HardwareSet1 to {new_availability}")
    else:
        print("No document found with Description: HardwareSet1")

    print(result)
    return jsonify({"message": "Checkout successful"})

@app.route('/hardwareSets/', methods=['GET'])
def get_hardware_sets():
    uri = "mongodb+srv://paawankdesai:Team4Checkout@hardwarecheckout.akclwow.mongodb.net/?retryWrites=true&w=majority&appName=HardwareCheckout"
    client = MongoClient(uri)
    db = client.ProjectDatabse

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    collection = db.HardwareSets
    hardware_sets = collection.find()

    hardware_sets_list = []
    for hwset in hardware_sets:
        number = hwset.get('Description')
        quantity = hwset.get('Availability')
        if number is not None and quantity is not None:
            hardware_sets_list.append({
                'number': number,
                'quantity': quantity
            })
    
    print(hardware_sets_list)
    return jsonify(hardware_sets_list)

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
names = {("t","v","t"),("s","t","s")}


@app.route('/login/', methods=["POST"])
def find_name():
    print('GET request working')
    

    data = request.json
    usernameInput = data['username']
    userIDInput = data['userID']
    passwordInput = data['password']
    """
    if usernameInput == "test" and passwordInput == "test" and userIDInput == "test":
        print("Verified")
        return jsonify({'verified':True})
    else:
        return jsonify({'verified':False})
    """
    if (usernameInput,passwordInput,userIDInput) in names:
        print("Verified")
        return jsonify({'verified':True})
    else:
        return jsonify({'verified':False})
    
    
@app.route("/", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")
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