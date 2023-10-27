import pandas as pd
"""
Anaylse data, filter categories and append right data to dataset
"""

tweet = pd.read_csv("dataset/tweets.csv")

labels = ["Earthquake", "Drought",
          "Damaged Infrastructure", "Human Damage", "Human", "Land Slide", "Non Damage Buildings and  Street", "Non Damage Wildlife Forest",
          "Sea", "Urban Fire", "Wild Fire", "Water Disaster"]


for index, row in tweet.iterrows():
    keyword = row["keyword"]
    print(keyword)
    keyword = keyword.capitalize()
    if keyword == "Aftershock":
        keyword = "Earthquake"
    elif keyword == "Bridge collapse":
        keyword = "Damaged Infrastructure"
    elif keyword == "Buildings burning" or keyword == "Buildings on fire":
        keyword = "Urban Fire"
    elif keyword == "Burning" or keyword == "Burned" or keyword == "Bush fires":
        keyword = "Wild Fire"
    elif keyword == "Catastrophic":
        if "fire" in row["text"]:
            keyword = "Wild Fire"
        elif "earthquake" in row["text"]:
            keyword = "Earthquake"
    elif "flood" in keyword:
        keyword = "Water Disaster"
    elif "wild" in keyword:
        keyword = "Wild Fire"
    print(f"New {keyword}")
    if keyword in labels:
        text = str(row["text"]).replace(" ", "_")
        label = keyword
        dataset = pd.DataFrame([[text, label]])
        dataset.to_csv("dataset/" + "disaster_text.csv",
                   mode='a', header=False, index=False)


def add_data_type(input_file):
    df = pd.read_csv(input_file)
    #Make sure all data are of same type of string
    df['text'] = df['text'].astype(str)
    df['label'] = df['label'].astype(str)
    print("Ensured all data are of type str")



if __name__ == "__main__":
    add_data_type("dataset/disaster_text.csv")