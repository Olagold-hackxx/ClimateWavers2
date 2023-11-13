import joblib
from sklearn.preprocessing import LabelEncoder
import requests
from io import StringIO
import numpy as np
import os
import pandas as pd
import logging


"""
Run inference on model
"""

# Load the model from file
model = joblib.load('model/waverX-Analysis.pkl')

# Set test Visual crossing weather API key
os.environ["API_KEY"]="R9M7HHCH4EDADEUBCU3ZENKXN"

def fetch_climate_data(location, start_date, end_date, disaster_type, api_key):
    """
    Fetching climate data at specified time to run inference
    """
    API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    start_date = "{}T00:00:00Z".format(start_date)
    end_date = "{}T23:59:59Z".format(end_date)

    if not api_key:
        api_key = os.getenv("API_KEY")

    params = {
        "location": location,
        "startTime": start_date,  # start date of disaster
        "endTime": end_date,  # end date of disaster
        "key": api_key,
        "include": "days",
        "contentType": "csv",
        "elements": "tempmax,tempmin,dew,temp,windspeedmin,windspeedmax,windspeedmean,winddir,humidity,conditions,precip,cloudcover,pressure,precipcover"
    }
    climate_data_req = requests.get(API_URL, params=params)
    if climate_data_req.status_code != 200:
        print("Fetching climate data failed")
        print(climate_data_req.text)
        return climate_data_req.text
    print("Data pulled successfully")
    climate_data_req = climate_data_req.text
    climate_data_csv = StringIO(climate_data_req)
    data_df = pd.read_csv(climate_data_csv)
    # Filter specific columns
    filtered_df = data_df[["tempmax", "tempmin", "dew", "temp", "windspeedmin", "windspeedmax",
                          "windspeedmean", "winddir", "humidity", "conditions", "precip", "cloudcover", "sealevelpressure", "precipcover"]]
    filtered_df.insert(0, "Disaster Type", disaster_type)
    # Calculate relative humidty min, max and mean
    humidity_min = filtered_df["humidity"] - 2
    humidity_max = filtered_df["humidity"] + 2
    humidity_mean = (humidity_max + humidity_min) / 2

    # Set data columns to dataset columns
    dataset_columns = {"tempmin": "Minimum Temperature", "tempmax": "Maximum Temperature", "dew": "Dew Point", "temp": "Temperature", "windspeedmin": "Wind Speed Min",
               "windspeedmax": "Wind Speed Max", "windspeedmean": "Wind Speed Mean", "winddir": "Wind Direction", "conditions": "Weather Type",
               "precip": "Precipitation", "cloudcover": "Cloud Cover", "sealevelpressure": "Sea Level Pressure", "precipcover": "Precipitation Cover"}

    filtered_df.rename(columns=dataset_columns, inplace=True)
    filtered_df.loc[:, "Relative Humidity Min"] = humidity_min
    filtered_df.loc[:, "Relative Humidity Max"] = humidity_max
    filtered_df.loc[:, "Relative Humidity Mean"] = humidity_mean
    filtered_df.drop(columns=["humidity"], inplace=True)
    return filtered_df

def predict(location, start_date, end_date, disaster_type, api_key):
    climate_data_df = fetch_climate_data(location, start_date, end_date, disaster_type, api_key)
    if type(climate_data_df) == str:
        print("Prediction failed")
        return climate_data_df

    if disaster_type == "Earthquake":
        climate_data_df["Magnitude Scale"] = "Richter"
    elif disaster_type == "Storm":
        climate_data_df["Magnitude Scale"] = "Kph"
    else:
        climate_data_df["Magnitude Scale"] = "Km2"
    # Encode  string values
    label_encoder = LabelEncoder()
    climate_data_df['Encoded Magnitude Scale'] = label_encoder.fit_transform(climate_data_df['Magnitude Scale'])
    climate_data_df['Encoded Disaster Type'] = label_encoder.fit_transform(climate_data_df['Disaster Type'])
    climate_data_df['Encoded Weather Type'] = label_encoder.fit_transform(climate_data_df['Weather Type'])

    # Drop NaN values
    climate_data_df.dropna(inplace=True)

    X = climate_data_df.drop(columns=["Disaster Type", "Weather Type",  "Magnitude Scale"], axis=1)


    predictions = model.predict(X)
    converted_pred = []
    if disaster_type == "Flood":
        # Multiply by 1600000 and divide maximum sea level pressure to get km2 value
        for mag in predictions:
            mag = round((mag * 1600000) / max(climate_data_df['Sea Level Pressure']))
            converted_pred.append(mag)
    elif disaster_type == "Storm":
        # Multiply by 30 to get Kph value
        for mag in predictions:
            mag = round(mag * 300)
            converted_pred.append(mag)
    elif disaster_type == "Earthquake":
        # Multiply by 30 to get Kph value
        for mag in predictions:
            mag = round(mag * 9)
            converted_pred.append(mag)
    else:
        converted_pred = predictions
    num_array = np.array(converted_pred)
    min_pred = np.min(num_array)
    max_pred = np.max(num_array)
    print(f"waverX-Analysis model prediction for {disaster_type}")
    print(f"Minimum predicted magnitude: {min_pred} {climate_data_df['Magnitude Scale'][0]}")
    print(f"Maximum predicted magnitude: {max_pred} {climate_data_df['Magnitude Scale'][0]}")
    result = {"minimum_predicted_magnitude": f"{min_pred} {climate_data_df['Magnitude Scale'][0]}", "maximum_predicted_magnitude": f"{max_pred} {climate_data_df['Magnitude Scale'][0]}"}
    return result


# Example usage
if __name__ == "__main__":
    # Location in Latitude,Longitude format
    # Dates in yyyy-mm-dd format
    predict("80.41,85.9", start_date="2023-01-16", end_date="2023-01-17", disaster_type="Flood", api_key=os.getenv("API_KEY"))
