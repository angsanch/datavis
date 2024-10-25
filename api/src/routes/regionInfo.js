var parser = require("../tools/parser");
var server;


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
