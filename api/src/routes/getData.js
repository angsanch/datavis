var parser = require("../tools/parser");
var server;

/**
 * @swagger
 * /getData:
 *   get:
 *     summary: Retrieve region historic charts
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           oneOf:
 *             - type: string
 *               example: 'ESP'
 *             - type: array
 *               items:
 *                 type: string
 *               example: ["ESP", "FRA"]
 *         description: A JSON-formatted ID or an array of IDs representing regions (e.g., `id=ESP` or `id=["ESP","FRA"]`).
 *       - in: query
 *         name: positive
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Include positive cases in data.
 *       - in: query
 *         name: dead
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Include the number of deceased individuals in data.
 *       - in: query
 *         name: recovered
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Include the number of recovered individuals in data.
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           pattern: '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
 *           example: '2021-01-01'
 *         description: The start date for the data in the format `yyyy-mm-dd`.
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           pattern: '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
 *           example: '2021-12-31'
 *         description: The end date for the data in the format `yyyy-mm-dd`.
 *     responses:
 *       200:
 *         description: Successfully retrieved region information.
 *       400:
 *         description: Invalid format or missing parameter.
 */



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

function getData(req, res, next)
{
	let args = getParameters(req.query);
	let regions;
	let result;

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
