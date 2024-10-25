const app = require("express")();
const body = require("body-parser");
const fs = require("fs");
const port = 8000;

app.use(body.json());
app.use(body.urlencoded({extended: true}));

require("./routes/getData")(app);
require("./routes/regionInfo")(app);
require("./routes/regions")(app);


app.use((err, req, res, next) => {
	if (err) {
		console.error(err.stack);
		res.status(500).send({msg: "Internal server error", details: err.stack});
	} else {
		next()
	}
});

fs.readFile("./data.json", (err, data) => {
	if (err) throw err;
	app.data = JSON.parse(data);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})