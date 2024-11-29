from datetime import datetime

def get_date(region:dict, date:datetime):
	i = 0
	data = region["data"]
	if data["date"][i] > date:
		return 0, 0, 0
	while data["date"][i] < date and i < len(data["date"]) - 1:
		i += 1
	return data["positive"][i], data["dead"][i], data["recovered"][i]

def extrapolate_date(regions:list, date:datetime):
	total_pos = 0
	total_dead = 0
	total_recovered = 0
	for i in regions:
		pos, dead, reco = get_date(i, date)
		total_pos += pos
		total_dead += dead
		total_recovered += reco
	return total_pos, total_dead, total_recovered


def extr_lat(data:list, divisions:list) -> float:
	lats = [i["lat"] for i in data if i["name"] in divisions and i["lat"] != None]
	if len(lats) == 0:
		return None
	return sum(lats) / len(lats)

def extr_lon(data:list, divisions:list) -> float:
	lons = [i["lon"] for i in data if i["name"] in divisions and i["lon"] != None]
	if len(lons) == 0:
		return None
	return sum(lons) / len(lons)

def extr_data(data:list, divisions:list) -> list:
	dates = []
	regions = []
	result = {"date": [], "positive": [], "dead": [], "recovered": []}
	for i in data:
		if i["name"] in divisions:
			regions.append(i)
			dates += i["data"]["date"]
	result["date"] = list(dict.fromkeys(dates))
	result["date"].sort()
	for i in result["date"]:
		pos, dead, reco = extrapolate_date(regions, i)
		result["positive"].append(pos)
		result["dead"].append(dead)
		result["recovered"].append(reco)
	return result

def extr_all(data:list, reg:dict) -> None:
	for i in reg["divisions"]:
		extr_all(data, [j for j in data if j["name"] == i][0])

	if reg["lat"] == None:
		reg["lat"] = extr_lat(data, reg["divisions"])
	if reg["lon"] == None:
		reg["lon"] = extr_lon(data, reg["divisions"])
	if len(reg["data"]) == 0:
		if len(reg["divisions"]) == 0:
			raise ValueError(f"No data and no divisions to extrapolate it on {reg['name']}")
		reg["data"] = extr_data(data, reg["divisions"])
