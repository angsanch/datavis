import files
import pandas as pd
from datetime import datetime

def create_region(name:str, region:pd.DataFrame):
	data = {}
	pd.set_option("future.no_silent_downcasting", True)
	region_info = region.iloc[0].to_dict()
	region = region.drop(["name", "region", "iso3", "lat", "lon"], axis=1)
	days = region.to_dict(orient="records")
	for i in days:
		i["date"] = datetime.strptime(i["date"], "%Y-%m-%d")
	days.sort(key=lambda elem: elem["date"])
	data["name"] = name
	data["lat"] = region_info["lat"]
	data["lon"] = region_info["lon"]
	data["divisions"] = []
	data["data"] = {
		"date": [i["date"] for i in days],
		"positive": [i["positive"] for i in days],
		"dead": [i["dead"] for i in days],
		"recovered": [i["recovered"] for i in days],
	}
	return data

def country(countryname:str, group:pd.DataFrame):
	regions = group.groupby("region", dropna=False)
	data = []
	created_country = False
	region_names = []
	for name, region in regions:
		if type(name) == float:
			data.append(create_region(countryname, region))
			created_country = True
		else:
			reg = countryname + name.lower()
			data.append(create_region(reg, region))
			region_names.append(reg)
	if not created_country:
		data.append({
			"name": countryname,
			"lat": None,
			"lon": None,
			"divisions": region_names,
			"data": [],
		})
	return data


def get_data() -> list:
	files.prepareFile("humdata.csv", "https://raw.githubusercontent.com/ec-jrc/COVID-19/master/data-by-region/jrc-covid-19-all-days-by-regions.csv")
	df = pd.read_csv("humdata.csv")
	df = df.drop(["NUTS", "EUCPMcountry", "EUcountry", "CurrentlyPositive", "Hospitalized", "IntensiveCare"], axis=1)
	df = df.rename(columns={"Date": "date", "CumulativePositive": "positive", "CumulativeDeceased": "dead", "CumulativeRecovered": "recovered", "CountryName": "name", "Region": "region"})
	df["positive"] = df["positive"].fillna(0)
	df["dead"] = df["dead"].fillna(0)
	df["recovered"] = df["recovered"].fillna(0)
	df["lat"] = df["lat"].fillna(float("NaN")).replace([float("NaN")], [None])
	df["lon"] = df["lon"].fillna(float("NaN")).replace([float("NaN")], [None])
	df["name"] = df["name"].fillna("NoName")
	groups = df.groupby("iso3", dropna=False)
	data = []
	for name, group in groups:
		data += country(name, group)
	return data

import json

if __name__ == "__main__":
	print(json.dumps(get_data()))
