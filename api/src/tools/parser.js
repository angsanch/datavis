function ids(raw)
{
	var entry;

	if (raw === undefined)
		raw = "";
	if (raw.match(/^[0-9a-zA-Z]*$/))
		entry = raw;
	else{
		try {
			entry = JSON.parse(raw);
		} catch (error) {
			return (null);
		}
	}

	if (typeof entry == "string")
		return ([entry]);
	else if (Array.isArray(entry)) {
		entry.forEach((i) => {
			if (typeof i != "string")
				return (null);
		});
		return (entry);
	} else
		return (null);
}

function date(raw)
{
	let date;

	if (raw === undefined)
		return (undefined);
	date = new Date(raw);
	if (isNaN(date))
		return (null);
	return (date);
}

function bool(raw)
{
	if (raw === "true")
		return (true);
	else if (raw === "false")
		return (false);
	else if (raw === undefined)
		return (undefined);
	else
		return (null);
}

module.exports = {
	ids: ids,
	date: date,
	bool: bool,
};
