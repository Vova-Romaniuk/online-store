module.exports = (sequelize, Sequelize) => {
	const Card = sequelize.define("card", {
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		price: {
			type: Sequelize.FLOAT,
		},
	});

	return Card;
};
