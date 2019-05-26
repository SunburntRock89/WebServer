module.exports = async(req, res) => {
	if (req.cookies.token) {
		let user = await Users.findOne({ where: { token: req.cookies.token } });
		if (!user) res.clearCookie("token").redirect("/login");
	}
	res.redirect("/websites");
};
module.exports.info = {
	route: "/",
};
