import pandas as pd
from sklearn.model_selection import train_test_split

# Load the dataset into a pandas DataFrame
df = pd.read_csv("dataset/disaster_text.csv")

# Split the dataset into train, validate, and test sets (80%, 10%, 10%)
train_df, temp_df = train_test_split(df, test_size=0.2, random_state=42)
validate_df, test_df = train_test_split(temp_df, test_size=0.5, random_state=42)

# Save the datasets to CSV files
train_df.to_csv('dataset/train_disaster_dataset.csv', index=False)
validate_df.to_csv('dataset/val_disaster_dataset.csv', index=False)
test_df.to_csv('dataset/test_disaster_dataset.csv', index=False)
