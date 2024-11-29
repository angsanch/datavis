var parser = require("../tools/parser");
var server;

/**
 * @swagger
 * /api/regionInfo:
 *   get:
 *     summary: Retrieve region information
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
 *     responses:
 *       200:
 *         description: Successfully retrieved region information
 *       400:
 *         description: Invalid format or missing parameter
 */

function getRegions(ids)
{
	return (server.data.filter(i => ids.includes(i.name)));
}

function regionInfo(req, res, next)
{
	var ids = parser.ids(req.query.id);


	if (ids == null)
		return (res.status(400).send({msg: "Invalid parameter"}));
	return (res.status(200).send({data: getRegions(ids).map((i) => {
		delete i.data;
		return (i);
	})}));
}

function add(app)
{
	server = app;
	app.get("/regionInfo", (req, res, next) => {
		regionInfo(req, res, next);
	});
}

module.exports = add;
