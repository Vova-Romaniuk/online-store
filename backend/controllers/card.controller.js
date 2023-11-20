const db = require("../models");
const Card = db.cards;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	console.log(req.body);
	if (!req.body.title) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	const card = {
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
	};

	Card.create(card)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the Tutorial.",
			});
		});
};

exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
	Card.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving tutorials.",
			});
		});
};

exports.findOne = (req, res) => {};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};

exports.findAllPublished = (req, res) => {};
