module.exports = (app) => {
	var router = require("express").Router();
	const cards = require("../controllers/card.controller.js");
	//Create a new Tutorial
	router.post("/", cards.create);

	// Retrieve all Tutorials
	router.get("/", cards.findAll);

	app.use("/api/cards", router);
};
