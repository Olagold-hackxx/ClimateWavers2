import pandas as pd
import requests
from io import StringIO
import asyncio

"""
Fetch climate data at the time of past disasters using the NOAA Climate Data API
to use as our training dataset
"""

# NOAA Climate Data API URL
API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history/'
API_KEY = 'KP88LFUEU2KK59Y853C68AB5D'  # API key


async def fetch_disasters_climate_data() -> bool:
    # Disaster types files to get data
    base_dir = '..'
    try:
        climate_dataset_df = pd.read_csv("../dataset/" + "climate_data.csv")
    except Exception:
        climate_dataset_df = pd.DataFrame([["Disaster Type", "Magnitude", "Magnitude Scale", "Minimum Temperature", "Maximum Temperature", "Dew Point", "Temperature", "Wind Speed Min", "Wind Speed Max",
                                      "Wind Speed Mean", "Wind Direction", "Relative Humidity Min", "Relative Humidity Max", "Relative Humidity Mean", "Weather Type", "Precipitation", "Cloud Cover", "Sea Level Pressure", "Precipitation Cover"]])
    # Specify the index from which you want to start reading
    start_index = 778

    # Read the CSV file and skip the rows before the start_index
    df = pd.read_csv(f'{base_dir}/dataset/historical-disasters.csv', skiprows=range(1, start_index))
    # Iterate through the DataFrame using iterrows()
    climate_dataset_df.to_csv("../dataset/" + "climate_data.csv", index=False)


    for index, row in df.iterrows():
        # Access columns using column names
        start_year = row['Start Year']
        start_month = row['Start Month']
        start_day = row['Start Day']
        end_year = row['End Year']
        end_month = row['End Month']
        end_day = row['End Day']
        if pd.isna(end_day) or pd.isna(start_day):
            continue
        if pd.isna(end_month) or pd.isna(start_month):
            continue
        print(f"Pulling historical climate data for disaster on {start_year}-{start_month}-{start_day}")
        start_date = "{}-{:02d}-{:02d}T00:00:00".format(
        start_year, int(start_month), int(start_day))
        end_date = "{}-{:02d}-{:02d}T23:59:59".format(
        end_year, int(end_month), int(end_day))

        params = {
            # first location of disaster
            "location": f"{row['Latitude']},{row['Longitude']}",
            "startDateTime": start_date,  # start date of disaster
            "endDateTime": end_date,  # end date of disaster
            "key": API_KEY,
            "aggregateHours": 24,
            "extendedStats": "true",
            "includeAstronomy": "true",
            "contentType": "csv",

        }
        climate_data_req = requests.get(API_URL, params=params)
        if climate_data_req.status_code != 200:
            print("Failed")
            continue
        print("Data pulled successfully")
        climate_data_req = climate_data_req.text
        climate_data_csv = StringIO(climate_data_req)
        data_df = pd.read_csv(climate_data_csv)
        # Filter specific columns
        filtered_df = data_df[["Minimum Temperature", "Maximum Temperature", "Dew Point", "Temperature", "Wind Speed Min", "Wind Speed Max",
                          "Wind Speed Mean", "Wind Direction", "Relative Humidity Min", "Relative Humidity Max", "Relative Humidity Mean", "Weather Type", "Precipitation", "Cloud Cover", "Sea Level Pressure", "Precipitation Cover"]]
        filtered_df.insert(0, "Disaster Type", row["Disaster Type"])
        filtered_df.insert(1, "Magnitude", row["Magnitude"])
        filtered_df.insert(2, "Magnitude Scale", row["Magnitude Scale"])

        print(index)
        filtered_df.to_csv("../dataset/" + "climate_data.csv", mode='a', header=False, index=False)


    return True

if __name__ == "__main__":
    asyncio.run(fetch_disasters_climate_data())
