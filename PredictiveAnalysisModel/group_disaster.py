import pandas as pd
""" Group disasters into there groups"""

reader = pd.read_csv('dataset/historical-disasters.csv')
disaster_types = ["Storm", "Flood", "Epidemic", "Earthquake", "Drought", "Volcanic activity", "Wildfire"]
for disaster in disaster_types:
	writer = reader[reader['Disaster Type']==disaster]
	writer.to_csv('{}.csv'.format(disaster), index=False)
