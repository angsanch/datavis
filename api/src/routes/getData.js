var parser = require("../tools/parser");
var server;

function getParameters(params)
{
	let args = {
		id: parser.ids(params.id),
		start: parser.date(params.start),
		end: parser.date(params.end),
		positive: parser.bool(params.positive),
		dead: parser.bool(params.dead),
		recovered: parser.bool(params.recovered),
	};

	if (args.positive === undefined)
		args.positive = false;
	if (args.dead === undefined)
		args.dead = false;
	if (args.recovered === undefined)
		args.recovered = false;
	return (args);
}
function prepareData(args, data)
{
	let result = [];
	let day;

	for(let i = 0; i < data.date.length; i++){
		day = {date: data.date[i]};
		if (args.positive)
			day.positive = data.positive[i];
		if (args.dead)
			day.dead = data.dead[i];
		if (args.recovered)
			day.recovered = data.recovered[i];
		result.push(day);
	}
	console.log(args);
	if (args.start !== undefined)
		result = result.filter(i => args.start <= new Date(i.date))
	if (args.end !== undefined)
		result = result.filter(i => args.end > new Date(i.date))
	return (result);
}

function getData(req, res, next)
{
	let args = getParameters(req.query);
	let regions;
	let result;

	console.log(req.query.id);
	for (const [arg, value] of Object.entries(args)) {
		if (value === null)
			return (res.status(400).send({msg: "Invalid parameter"}));
	}
	regions = server.data.filter(i => args.id.includes(i["name"]));
	delete args.id;
	result = {};
	regions.forEach(element => {
		result[element["name"]] = prepareData(args, element["data"])
	});
	res.status(200).send(result);
}

function add(app)
{
	server = app;
	app.get("/getData", (req, res, next) => {
		getData(req, res, next);
	});
}

module.exports = add;
