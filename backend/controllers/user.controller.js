const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

// app.post('/register', async (req, res) => {
// 	const { username, password } = req.body;

// 	// Хешуємо пароль перед збереженням (можете додати додаткові перевірки, наприклад, на унікальність ім'я користувача)
// 	const hashedPassword = await bcrypt.hash(password, 10);

// 	users.push({ username, password: hashedPassword });

// 	res.status(201).json({ message: 'User registered successfully' });
//   });

exports.create = async (req, res) => {
	console.log(req.body);

	try {
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({
				message: "Content can not be empty!",
			});
		}

		// Перевірка, чи існує користувач із заданою електронною адресою
		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			return res.status(400).send({
				message: "User with this email already exists.",
			});
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const user = new User({
			email: req.body.email,
			password: hashedPassword,
		});

		const savedUser = await user.save();

		res.send(savedUser);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send({
			message: "Internal server error.",
		});
	}
};

exports.login = async (req, res) => {
	console.log(req.body);
	if (!req.body.email || !req.body.password) {
		res.status(400).send({
			message: "Email and password are required!",
		});
		return;
	}

	// Знаходимо користувача за email
	const user = await User.findOne({ email: req.body.email });

	// Перевіряємо, чи користувач існує та чи вірний пароль
	if (user && (await bcrypt.compare(req.body.password, user.password))) {
		res.status(200).json({ message: "Login successful", user });
	} else {
		res.status(401).json({ message: "Invalid email or password" });
	}
};
