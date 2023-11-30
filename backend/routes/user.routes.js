module.exports = (app) => {
	var router = require("express").Router();
	const users = require("../controllers/user.controller.js");
	router.post("/", users.create);
	router.post("/login", users.login);
	app.use("/api/users", router);
};
