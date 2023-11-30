module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "2003Vova",
	DB: "shop",
	port: "3306",
	dialect: "mysql",
	pool: {
		max: 6,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
