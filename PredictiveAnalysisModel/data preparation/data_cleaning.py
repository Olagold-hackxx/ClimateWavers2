# Clean the dataset by filtering out rows with missing or empty longitude and latitude values
import pandas as pd

# Function to clean CSV files


def clean_csv(input_file, output_file):
    # Read CSV file into a DataFrame
    df = pd.read_csv(input_file)

    # Drop rows where longitude or latitude column has missing values
    cleaned_df = df.dropna(subset=['Longitude', 'Latitude'])

    # Write cleaned DataFrame back to a CSV file
    cleaned_df.to_csv(output_file, index=False)

    print(f"Cleaned data saved to {output_file}")


# Example usage
if __name__ == "__main__":
    # Provide input and output file paths
    base_dir = 'PredictiveAnalysisModel/dataset/disaster types/'
    disaster_types = ["Storm", "Flood", "Epidemic",
                      "Earthquake", "Drought", "Volcanic activity", "Wildfire"]
    for disaster in disaster_types:
        disaster_dataset = f"{base_dir}{disaster}.csv"

        # Clean the CSV file
        clean_csv(disaster_dataset, disaster_dataset)
