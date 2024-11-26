var parser = require("./parser");

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
	if (args.start !== undefined)
		result = result.filter(i => args.start <= new Date(i.date))
	if (args.end !== undefined)
		result = result.filter(i => args.end > new Date(i.date))
	return (result);
}

module.exports = {
	getParameters: getParameters,
	getRegions: prepareData,
};
