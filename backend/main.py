import os
import joblib
import numpy as np

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# LOAD MODEL

model = joblib.load("loan_model.pkl")

# MONGODB CONNECTION

client = MongoClient(
    "mongodb://localhost:27017/"
)

db = client["creditriskdb"]

users_collection = db["users"]

# HOME ROUTE

@app.route("/")
def home():
    return "Backend Running"

# PREDICT ROUTE

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # MODEL FEATURES

    features = np.array([
        [
            data["income"],
            data["loan"],
            360,
            1
        ]
    ])

    # ML PREDICTION

    prediction = model.predict(features)[0]

    # RISK LOGIC

    if prediction == 1:

        risk = "Low Risk"
        score = 750

    else:

        risk = "High Risk"
        score = 450

    # USER DATA

    user_data = {

        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"],
        "aadhaar": data["aadhaar"],
        "income": data["income"],
        "age": data["age"],
        "loan": data["loan"],
        "credit_score": score,
        "risk": risk

    }

    # SAVE TO DATABASE

    users_collection.insert_one(user_data)

    # RESPONSE

    return jsonify({

        "credit_score": score,
        "risk": risk

    })

# GET USERS

@app.route("/users", methods=["GET"])
def get_users():

    users = []

    for user in users_collection.find():

        user["_id"] = str(user["_id"])

        users.append(user)

    return jsonify(users)

# RUN SERVER

if __name__ == "__main__":
    import os

port = int(os.environ.get("PORT", 5000))

app.run(host="0.0.0.0", port=port)