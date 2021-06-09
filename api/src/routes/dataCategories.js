const dotenv = require("dotenv");
const mysql = require("mysql");
const router = require("express").Router();

dotenv.config();

const connection = mysql.createConnection({
	multipleStatements: true,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: "30004",
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.connect((err) => {
	if (err) {
		console.log(new Date(), err);
		throw err;
	} else {
		console.log(new Date(), "connected to MySQL");
	}
});

router.get("/comparison", (req, res) => {
	const { date, location, hour } = req.query;
	const query =
		hour === "25"
			? `SELECT value, hour FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_temp"
			  }" AND minute = 0 ; 
            	SELECT value, hour FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_hum"
			  }" AND minute = 0`
			: `SELECT value, minute FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_temp"
			  }" AND hour = ${hour} ; 
            SELECT value, minute FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_hum"
			  }" AND hour = ${hour}`;
	if (query.includes("undefined") || query.includes("null")) {
		return res
			.status(400)
			.json({ errorMessage: "Oops! Something went wrong!" });
	} else {
		connection.query(query, (err, results) => {
			if (err) {
				res.send(err);
			} else if (!results[0].length) {
				return res
					.status(404)
					.json({ errorMessage: "No data available!" });
			} else {
				console.log(`query compare at ${new Date().toUTCString()}`);
				return res.json([...results]);
			}
		});
	}
});

router.get("/temperature", (req, res) => {
	const { date, location, hour } = req.query;
	const query =
		hour === "25"
			? `SELECT value, hour FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_temp"
			  }" AND minute = 0 ; `
			: `SELECT value, minute FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_temp"
			  }" AND hour = ${hour} ; `;
	if (query.includes("undefined") || query.includes("null")) {
		return res
			.status(400)
			.json({ errorMessage: "Oops! Something went wrong!" });
	} else {
		connection.query(query, (err, results) => {
			if (err) {
				res.send(err);
			} else if (!results.length) {
				return res.status(404).json({ errorMessage: "No data available!" });
			} else {
				console.log(`query temperature at ${new Date().toUTCString()}`);
				return res.json([...results]);
			}
		});
	}
});

router.get("/humidity", (req, res) => {
	const { date, location, hour } = req.query;
	const query =
		hour === "25"
			? `SELECT value, hour FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_hum"
			  }" AND minute = 0 ; `
			: `SELECT value, minute FROM ${location} WHERE datum = "${date}" AND host = "${
					location + "_hum"
			  }" AND hour = ${hour} ; `;

	if (query.includes("undefined") || query.includes("null")) {
		return res
			.status(400)
			.json({ errorMessage: "Oops! Something went wrong!" });
	} else {
		connection.query(query, (err, results) => {
			if (err) {
				res.send(err);
			} else if (!results.length) {
				return res.status(404).json({ errorMessage: "No data available!" });
			} else {
				console.log(`query humidity at ${new Date().toUTCString()}`);
				return res.json([...results]);
			}
		});
	};
});

module.exports = router;
