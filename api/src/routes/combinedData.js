var worker = require("../tools/regionsData");
var server;

/**
 * @swagger
 * /api/combinedData:
 *   get:
 *     summary: Retrieve several regions historic charts and combine them
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

function sum(arr)
{
	let total = 0;

	arr.forEach((i) => {
		total += i;
	});
	return (total);
}

function getDate(region, date)
{
	let older = region.filter(i => {
		return (new Date(i.date) <= date);
	});
	if (older.length === 0)
		return (region[0]);
	else
		return (older[older.length - 1]);
}

function createCombinedDate(data, date)
{
	let result = {};
	let pos = [];
	let dead = [];
	let rec = [];

	result["date"] = date;
	date = new Date(date);
	Object.keys(data).forEach((i) => {
		day = getDate(data[i], date);
		if (day.positive !== undefined)
			pos.push(day.positive);
		if (day.dead !== undefined)
			dead.push(day.dead);
		if (day.recovered !== undefined)
			rec.push(day.recovered);
	});
	if (pos.length !== 0)
		result["positive"] = sum(pos);
	if (dead.length !== 0)
		result["dead"] = sum(dead);
	if (rec.length !== 0)
		result["recovered"] = sum(rec);
	return (result);
}

function combinedData(req, res, next)
{
	let args = worker.getParameters(req.query);
	let regions;
	let data = {};
	let result = [];

	for (const [arg, value] of Object.entries(args)) {
		if (value === null)
			return (res.status(400).send({msg: "Invalid parameter"}));
	}
	regions = server.data.filter(i => args.id.includes(i["name"]));
	delete args.id;
	regions.forEach(element => {
		data[element["name"]] = worker.getRegions(args, element["data"])
	});
	Object.keys(data).forEach((i) => {
		data[i].forEach((j) => {
			result.push(j.date);
		});
	});
	result = [...new Set(result)];
	result.sort();
	result = result.map(i => {
		return (createCombinedDate(data, i));
	});
	res.status(200).send(result);
}

function add(app)
{
	server = app;
	app.get("/combinedData", (req, res, next) => {
		combinedData(req, res, next);
	});
}

module.exports = add;
