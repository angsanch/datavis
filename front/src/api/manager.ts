class Api{
	#enpoint:string;
	orphans:string[]|undefined = undefined;
	regions:string[]|undefined = undefined;
	data:{}[]|undefined = undefined;
	dates:string[]|undefined = undefined;

	constructor(url?:string){
		console.log("api starting");
		this.#enpoint = url || "";
	}

	async getRegions(){
		let regions:string[] = [];
		try {
			let response = await fetch(this.#enpoint + "/api/regions");
			let json = await response.json();
			regions = json.data;
		} catch (error) {
			console.error(error);
		}
		this.regions = regions;
		return (regions);
	}

	async getDates(){
		let dates:string[] = [];
		try {
			let response = await fetch(this.#enpoint + "/api/regions?onlyOrphans=true");
			let json = await response.json();
			this.orphans = json.data;
			response = await fetch(this.#enpoint + `/api/combinedData?id=${JSON.stringify(json.data)}&positive=false&dead=false&recovered=false`);
			json = await response.json();
			json.forEach((i:any) => dates.push(i.date));
		} catch (error) {
			console.error(error);
		}
		this.dates = dates;
		return (dates);
	}

	async getData(){
		let data, regions;
		try {
			if (this.regions === undefined)
				regions = await this.getRegions();
			else
				regions = this.regions;
			let response = await fetch(this.#enpoint + `/api/regionInfo?id=${JSON.stringify(regions)}`);
			let json = await response.json();
			data = json.data;
		} catch (error) {
			console.error(error);
		}
		this.data = data;
		return (data);
	}
}

export default Api;

//const api = new Api("http://localhost:5173");
//api.getDates().then(dates => console.log("dates", dates));
//api.getRegions().then(regions => console.log("regions", regions));
//api.getData().then(a => console.log(a));
