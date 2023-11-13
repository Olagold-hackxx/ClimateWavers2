# Clean the dataset by filtering out rows with missing or empty longitude and latitude values
import pandas as pd

# Functions to clean CSV files

def clean_climate_csv(file):
    # Read CSV file into a DataFrame
    df = pd.read_csv(file)
    # Write cleaned DataFrame back to a CSV file
    df.dropna(inplace=True)
    print(f"Cleaned climate data to {file}")
    df.to_csv(file, index=False)


def clean_disaster_csv(file):
    # Read CSV file into a DataFrame
    df = pd.read_csv(file)

    # Drop rows where longitude or latitude column has missing values
    cleaned_df = df.dropna(subset=['Longitude', 'Latitude'])

    # Write cleaned DataFrame back to a CSV file
    cleaned_df.to_csv(file, index=False)

    print(f"Cleaned disaster historical data saved to {file}")


# Example usage
if __name__ == "__main__":
    # Provide input and output file paths
    base_dir = 'PredictiveAnalysisModel/dataset/'
    disaster_types = ["Storm", "Flood", "Epidemic",
                      "Earthquake", "Drought", "Volcanic activity", "Wildfire"]
    disaster_dataset = f"{base_dir}/historical-disasters.csv"
    clean_climate_csv(f"{base_dir}/climate_data.csv")
    clean_disaster_csv(disaster_dataset)

    for disaster in disaster_types:
        disaster_dataset = f"{base_dir}disaster types/{disaster}.csv"

        # Clean the CSV file
        clean_disaster_csv(disaster_dataset)
