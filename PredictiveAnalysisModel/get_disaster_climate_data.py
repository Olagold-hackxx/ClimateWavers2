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
API_KEY = 'H3JP8YAJH2BNENXVGBDUZ3LQL'  # API key


async def fetch_disasters_climate_data() -> bool:
    # Disaster types files to get data
    disaster_types = ["Storm", "Flood", "Epidemic",
                      "Earthquake", "Drought", "Volcanic activity", "Wildfire"]

    for disaster in disaster_types:
        # Response dataframe
        climate_dataset_df = pd.DataFrame(["Minimum Temperature", "Maximum Temperature", "Dew Point", "Temperature", "Wind Speed Min", "Wind Speed Max",
                                          "Wind Speed Mean", "Wind Direction", "Relative Humidity Min", "Relative Humidity Max", "Relative Humidity Mean", "Weather Type", "Precipitation", "Cloud Cover", "Sea Level Pressure", "Precipitation Cover"])
        df = pd.read_csv("dataset/" + disaster + ".csv")
        # Iterate through the DataFrame using iterrows()
        data_list = [climate_dataset_df]
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
            start_date = "{}-{:02d}-{:02d}T00:00:00".format(
                start_year, int(start_month), int(start_day))
            end_date = "{}-{:02d}-{:02d}T23:59:59".format(
                end_year, int(end_month), int(end_day))
            print(start_date)
            print(end_date)

            location = row["Location"]
            params = {
                # first location of disaster
                "location": location + ", " + row["Country"],
                "startDateTime": start_date,  # start date of disaster
                "endDateTime": end_date,  # end date of disaster
                "key": API_KEY,
                "aggregateHours": 24,
                "extendedStats": "true",
                "includeAstronomy": "true",
                "contentType": "csv"
            }
            climate_data = requests.get(API_URL, params=params)
            climate_data = climate_data.text
            climate_data_csv = StringIO(climate_data)
            data_df = pd.read_csv(climate_data_csv)
            print(data_df)
            # Filter specific columns
            filtered_df = data_df[["Minimum Temperature", "Maximum Temperature", "Dew Point", "Temperature", "Wind Speed Min", "Wind Speed Max",
                              "Wind Speed Mean", "Wind Direction", "Relative Humidity Min", "Relative Humidity Max", "Relative Humidity Mean", "Weather Type", "Precipitation", "Cloud Cover", "Sea Level Pressure", "Precipitation Cover"]]
            df = pd.DataFrame([filtered_df])
            data_list.append(df)
        # Write the DataFrame to a CSV file
        disaster_data = pd.concat(data_list, ignore_index=True)
        disaster_data.to_csv(disaster + "_climate_data.csv", index=False)

    return True

if __name__ == "__main__":
    asyncio.run(fetch_disasters_climate_data())