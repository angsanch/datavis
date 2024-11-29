import json

import extrapolator
import humdata
import continents

def post_process(data:list) -> list:
	childs = []
	for i in data:
		childs += i["divisions"]
	childs = list(dict.fromkeys(childs))
	for i in data:
		i["orphan"] = not i["name"] in childs
		if i["orphan"]:
			extrapolator.extr_all(data, i)
	for i in data:
		i["data"]["date"] = [j.strftime("%Y-%m-%d") for j in i["data"]["date"]]
	return data

def merge_regions(r1:dict, r2:dict) -> dict:
	if len(r1["data"]) > 0 or len(r2["data"]) > 0:
		raise ValueError(f"2 regions with the same name (\"{r1['name']}\"), have data addign to them.")
	result = {
		"name": r1["name"],
		"lat": r1["lat"],
		"lon": r1["lon"],
		"divisions": list(dict.fromkeys(r1["divisions"] + r2["divisions"])),
		"data": r1["data"],
	}
	if result["lat"] == float("NaN"):
		result["lat"] = r2["lat"]
	else:
		result["lat"] = (r1["lat"] + r2["lat"]) / 2
	if result["lon"] == float("NaN"):
		result["lon"] = r2["lon"]
	else:
		result["lon"] = (r1["lon"] + r2["lon"]) / 2
	return result

def main() -> list:
	parsers = [humdata, continents]
	sources = []
	for i in parsers:
		sources += i.get_data()
	data = []
	names = []
	for i in sources:
		if i["name"] in names:
			ind = names.index(i["name"])
			data[ind] = merge_regions(data[ind], i)
		else:
			data.append(i)
			names.append(i["name"])
	data = post_process(data)
	with open("data.json", "w") as file:
		json.dump(data, file)
	return data

if __name__ == "__main__":
	main()
