const dotenv = require("dotenv");
const mysql = require("mysql");
const router = require("express").Router();

dotenv.config();

const connection = mysql.createConnection({
	multipleStatements: true,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.connect((err) => {
	if (err) {
		console.log(new Date(), err);
		return err;
	} else {
		console.log(new Date(), "connected to MySQL");
	}
});

router.get("/comparison", (req, res) => {
	const { date, location, hour } = req.query;
	let comp_query;
	switch (location) {
		case "architektur":
			comp_query =
				hour === "25"
					? `SELECT value, hour FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; 
            SELECT value, hour FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0`
					: `SELECT value, minute FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ; 
            SELECT value, minute FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour}`;
			break;
		case "informatik":
			comp_query =
				hour === "25"
					? `SELECT value, hour FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; 
            SELECT value, hour FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0`
					: `SELECT value, minute FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ;
             SELECT value, minute FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour}`;
			break;
		case "kostbar":
			comp_query =
				hour === "25"
					? `SELECT value, hour FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; 
            SELECT value, hour FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0`
					: `SELECT value, minute FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ; 
            SELECT value, minute FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour}`;
			break;
		case "wirtschaft":
			comp_query =
				hour === "25"
					? `SELECT value, hour FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; 
            SELECT value, hour FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0`
					: `SELECT value, minute FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ; 
            SELECT value, minute FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour}`;
			break;
	}
	connection.query(comp_query, (err, results) => {
		if (err) {
			res.send(err);
		} else if (!results[0].length) {
			return res.status(404).json({ errorMessage: "No data available!" });
		} else {
			console.log(`query compare at ${new Date().toUTCString()}`);
			return res.json([...results]);
		}
	});
});

router.get("/temperature", (req, res) => {
	const { date, location, hour } = req.query;
	let temp_query;
	switch (location) {
		case "architektur":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; `
					: `SELECT value, minute FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ; `;
			break;
		case "informatik":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; `
					: `SELECT value, minute FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ;`;
			break;
		case "kostbar":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ; `
					: `SELECT value, minute FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ; `;
			break;
		case "wirtschaft":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND minute = 0 ;`
					: `SELECT value, minute FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_temp"
					  }" AND hour = ${hour} ; `;
			break;
	}
	connection.query(temp_query, (err, results) => {
		if (err) {
			res.send(err);
		} else if (!results.length) {
			return res.status(404).json("No data available!");
		} else {
			console.log(`query temperature at ${new Date().toUTCString()}`);
			return res.json([...results]);
		}
	});
});

router.get("/humidity", (req, res) => {
	const { date, location, hour } = req.query;
	let temp_query;
	switch (location) {
		case "architektur":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0 ; `
					: `SELECT value, minute FROM architektur WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour} ; `;
			break;
		case "informatik":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0 ; `
					: `SELECT value, minute FROM informatik WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour} ;`;
			break;
		case "kostbar":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0 ; `
					: `SELECT value, minute FROM kostbar WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour} ; `;
			break;
		case "wirtschaft":
			temp_query =
				hour === "25"
					? `SELECT value, hour FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND minute = 0 ;`
					: `SELECT value, minute FROM wirtschaft WHERE datum = "${date}" AND host = "${
							location + "_hum"
					  }" AND hour = ${hour} ; `;
			break;
	}
	connection.query(temp_query, (err, results) => {
		if (err) {
			res.send(err);
		} else if (!results.length) {
			return res.status(404).json("No data available!");
		} else {
			console.log(`query humidity at ${new Date().toUTCString()}`);
			return res.json([...results]);
		}
	});
});

module.exports = router;
