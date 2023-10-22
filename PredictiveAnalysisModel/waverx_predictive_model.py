# Import necessary libraries
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import requests  
from dotenv import load_dotenv  

# Load your Climacell API key from the environment variable
load_dotenv()  
climacell_api_key = os.getenv("CLIMACELL_API_KEY")  

# Load  disaster type datasets (Storm, Drought, Earthquake, Epidemic, Flood, Volcanic activity, Wildfire)
storm_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Storm.csv")
drought_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Drought.csv")
earthquake_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Earthquake.csv")
epidemic_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Epidemic.csv")
flood_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Flood.csv")
volcanic_activity_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Volcanic activity.csv")
wildfire_data = pd.read_csv("PredictiveAnalysisModel/dataset/disaster types/Wildfire.csv")

# Combine all datasets into one
combined_data = pd.concat([storm_data, drought_data, earthquake_data, epidemic_data, flood_data, volcanic_activity_data, wildfire_data], ignore_index=True)

# Prepare features and labels
X = combined_data.drop(columns=["Disaster Type"])
y = combined_data["Disaster Type"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest classifier
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Fetch historical weather data
def fetch_historical_weather_data(location, start_date, end_date, api_key):
    base_url = "https://api.tomorrow.io/v4/timelines"
    params = {
        "location": location,
        "fields": "temperature_2m,precipitation",
        "start_time": start_date,
        "end_time": end_date,
        "timesteps": "1d",
        "timezone": "auto",
        "units": "metric",
        "apikey": api_key,  
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print("Error fetching data:", response.status_code)
        return None

# Usage 
location = "your_location_here"  # Specify the location
start_date = "2023-01-01T00:00:00Z"  # Specify the start date
end_date = "2023-01-31T23:59:59Z"  # Specify the end date

# Use the Climacell API key from the environment variable
api_key = climacell_api_key  # Insert your Climacell API key here

weather_data = fetch_historical_weather_data(location, start_date, end_date, api_key)

# Process and use the weather data for predictions
if weather_data:
    # Extract relevant weather features from the fetched data
    temperature = weather_data["data"]["timelines"][0]["intervals"][0]["values"]["temperature_2m"]
    precipitation = weather_data["data"]["timelines"][0]["intervals"][0]["values"]["precipitation"]

    # Use the temperature and precipitation data to make predictions
    predicted_disaster_type = clf.predict([[temperature, precipitation]])
    print("Predicted Disaster Type:", predicted_disaster_type[0])
