import pandas as pd

df = pd.read_csv("dataset/climate_data.csv")


def balance_data(row):
    if row['Magnitude Scale'] == "Km2":
        return row['Magnitude'] / 1600000
    elif row['Magnitude Scale'] == "Kph":
        return row['Magnitude'] / 300
    elif row['Magnitude Scale'] == "Richter":
        return row['Magnitude'] / 9
    else:
        return row['Magnitude']

df['Magnitude'] = df.apply(lambda row: balance_data(row), axis=1)

df.reset_index(drop=True)

df.to_csv("dataset/balanced_climate_data.csv", index=False)

print("Data balanced")
