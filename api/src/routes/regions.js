var parser = require("../tools/parser");
var server;

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Retrieve regions id
 *     parameters:
 *       - in: query
 *         name: onlyOrphans
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Boolean value, true will only send orphan regions and false will send everything.
 *     responses:
 *       200:
 *         description: Successfully retrieved region information
 *       400:
 *         description: Invalid format
 */

function regions(req, res, next)
{
	var orph;
	var names;

	if (req.query.onlyOrphans === undefined)
		orph = false;
	else
		orph = parser.bool(req.query.onlyOrphans);
	if (typeof orph !== "boolean")
		return res.status(400).send({msg: "Invalid parameter"});

	names = server.data.filter((i) => {
		return (i.orphan == true || !orph)
	})
	.map((i) => {
		return (i.name);
	});
	return (res.status(200).send({data: names}));
}

function add(app)
{
	server = app;
	app.get("/regions", (req, res, next) => {
		regions(req, res, next);
	});
}

module.exports = add;
