function setDatesApi(setDates: React.Dispatch<React.SetStateAction<string[]>>)
{
	fetch("/api/regions?onlyOrphans=true")
		.then(response => response.json())
		.then(json => {
			fetch(`/api/combinedData?id=${JSON.stringify(json.data)}&positive=false&dead=false&recovered=false`)
				.then(response => response.json())
				.then(dates => {
					let res: string[] = [];
					dates.forEach(i => res.push(i.date));
					setDates(res);
				})
		}).catch(error => console.log(error));
}

export default setDatesApi;
