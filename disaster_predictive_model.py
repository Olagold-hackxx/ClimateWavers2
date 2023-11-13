# Import necessary libraries
import os
import pandas as pd
#import modin.config as cfg
import numpy as np
#cfg.Engine.put('Ray')

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearnex import patch_sklearn
from sklearn import config_context
from sklearn.metrics import mean_squared_error, r2_score
import joblib




patch_sklearn()

# Load disaster climate data
climate_df = pd.read_csv("dataset/balanced_climate_data.csv")

# Drop NaN values
climate_df.dropna(inplace=True)

# Encode  string values
label_encoder = LabelEncoder()
climate_df['Encoded Magnitude Scale'] = label_encoder.fit_transform(climate_df['Magnitude Scale'])
climate_df['Encoded Disaster Type'] = label_encoder.fit_transform(climate_df['Disaster Type'])
climate_df['Encoded Weather Type'] = label_encoder.fit_transform(climate_df['Weather Type'])

training_mse = []
training_cod = []
mse_values = []
cod_values = []
# Prepare features and labels
y = climate_df["Magnitude"]
X = climate_df.drop(columns=["Magnitude", "Magnitude Scale","Disaster Type", "Weather Type"], axis=1)

N_RUNS = 50
TRAIN_SIZE = 0.9
random_state = 777

X = np.ascontiguousarray(X, dtype=np.float64)
y = np.ascontiguousarray(y, dtype=np.float64)

N_RUNS = 50

# Train with Random Forest Regression
rf = RandomForestRegressor(n_estimators=100)

# cross validation
for i in range(N_RUNS):
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=TRAIN_SIZE,
                                                        random_state=random_state)
    random_state += 777

    # training
    with config_context(assume_finite=True):
        model = rf.fit(X_train, y_train)

    # inference
    y_train_pred = model.predict(X_train)
    y_pred = model.predict(X_test)

    training_mse.append(mean_squared_error(y_train, y_train_pred))
    training_cod.append(r2_score(y_train, y_train_pred))

    mse_values.append(mean_squared_error(y_test, y_pred))
    cod_values.append(r2_score(y_test, y_pred))

# Save the model to a file
joblib.dump(model, 'model/waverX-Analysis.pkl')
print( y_train_pred)
