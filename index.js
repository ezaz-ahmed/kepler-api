const fs = require("fs");
const { parse } = require("csv-parse");

const habitablePlanets = [];

function isHabitablePlane(planet) {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.16
	);
}

fs.createReadStream("kepler_data.csv")
	.pipe(
		parse({
			comment: "#",
			columns: true,
		}),
	)
	.on("data", (data) => {
		if (isHabitablePlane(data)) {
			habitablePlanets.push(data);
		}
	})
	.on("error", (err) => {
		console.log(err);
	})
	.on("end", () => {
		console.log(habitablePlanets.map((planet) => planet["kepler_name"]));
		console.log(`${habitablePlanets.length} habitable planet we found!`);
	});
