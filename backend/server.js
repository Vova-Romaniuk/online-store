const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

var corsOptions = {
	origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
	.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to my application." });
});
require("./routes/card.routes.js")(app);
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
