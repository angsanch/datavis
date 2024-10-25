var parser = require("../tools/parser");
var server;

function regions(req, res, next)
{
	var orph;
	var names;

	if (req.query.onlyOrphans === undefined)
		orph = false;
	else
		orph = parser.bool(req.query.onlyOrphans);
	if (typeof orph != "string")
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
