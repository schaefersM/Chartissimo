const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

console.log("Log");

mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log(err)
		throw new Error("help");
	} else {
	 	console.log(new Date(), "Authentication connected to MongoContainer")
	}
});


// mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true }, () => {
// 	console.log(new Date(), "Authentication connected to MongoContainer")
// });

// mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true }).catch(error => console.log(error));


//Middleware
app.use(express.json());

let whitelist = ["http://localhost", "http://192.168.0.11", "http://localhost:30000", "http://192.168.72.132:30000"];

app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
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

app.use(cookieParser());

//Import Routes
const registerRoute = require("../routes/register");
const loginRoute = require("../routes/login");
const refreshRoute = require("../routes/refreshToken");
const logoutRoute = require("../routes/logout");

//Route Middleware
app.use("/auth/register", registerRoute);
app.use("/auth/refresh", refreshRoute);
app.use("/auth/login", loginRoute);
app.use("/auth/logout", logoutRoute);

const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server up and running on Port ${port}`));
