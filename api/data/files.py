import os
import requests

def prepareFile(path:str, url:str) -> None:
	if os.path.exists(path):
		return
	with open(path, "wb") as file:
		req = requests.get(url)
		file.write(req.content)
