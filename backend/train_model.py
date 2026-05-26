import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# LOAD DATASET

df = pd.read_csv("dataset/train.csv")

print(df.head())

# REMOVE NULL VALUES

df = df.dropna()

# LABEL ENCODING

le = LabelEncoder()

columns = [
    "Gender",
    "Married",
    "Education",
    "Self_Employed",
    "Property_Area",
    "Loan_Status"
]

for col in columns:
    df[col] = le.fit_transform(df[col])

# FEATURES

X = df[
    [
        "ApplicantIncome",
        "LoanAmount",
        "Loan_Amount_Term",
        "Credit_History"
    ]
]

# TARGET

y = df["Loan_Status"]

# TRAIN TEST SPLIT

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# MODEL

model = RandomForestClassifier()

model.fit(X_train, y_train)

# PREDICTION

predictions = model.predict(X_test)

# ACCURACY

accuracy = accuracy_score(y_test, predictions)

print("Accuracy:", accuracy)

# SAVE MODEL

joblib.dump(model, "loan_model.pkl")

print("Model Saved Successfully")