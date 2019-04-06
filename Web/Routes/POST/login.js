const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = async(req, res) => {
	if (req.user || req.cookies.token) return res.status(403).json({ code: -1, msg: "Already logged in" });

	if (!req.body.username || !req.body.password) {
		return res.status(400).json({ code: 1, msg: "Missing paramaters" });
	}

	let user = await Users.findOne({ where: { [Sequelize.Op.or]: [{ username: req.body.username }, { email: req.body.username }] } });
	if (!user) return res.status(400).json({ code: 1, msg: "User could not be found." });

	let passwordCorrect = await bcrypt.compare(req.body.password, user.dataValues.password);
	if (!passwordCorrect) return res.status(400).json({ code: 2, msg: "Password is incorrect." });

	if (passwordCorrect) {
		res.cookie("token", user.token).json({ code: 0, message: "Success!" });
	}
};

module.exports.info = {
	route: "/login",
	rateLimit: true,
};
