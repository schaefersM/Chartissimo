const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const dataCategoriesRoute = require("./routes/dataCategories");
const userConfigRoute = require("./routes/userConfig");
const userChartRoute = require("./routes/userChart");

dotenv.config();

const app = express();

console.log("Hi");


mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true }, (err) => {
	if (err) {
		throw new Error(err)
	} else {
	 	console.log(new Date(), "Authentication connected to MongoContainer")
	}
});


// mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true }, () => {
// 	console.log(new Date(), "Authentication connected to MongoContainer")
// });


app.use(cookieParser());

app.use(express.json({ urlencoded: true, limit: "200kb" }));

let whitelist = ["http://localhost", "http://192.168.0.11", "http://localhost:30000", "http://192.168.72.132:30000"];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (whitelist.indexOf(origin) === -1) {
				const message =
					"The CORS policy for this origin doesnt allow access from the particular origin.";
				return callback(new Error(message), false);
			}
			return callback(null, true);
		},
		credentials: true,
	})
);

app.use("/api/data/categories", dataCategoriesRoute);
app.use("/api/user/:user_id/config", userConfigRoute);
app.use("/api/user/:user_id/charts", userChartRoute);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
	console.log(`Server starts on Port ${port}`);
});
