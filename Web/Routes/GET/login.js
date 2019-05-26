module.exports = async(req, res) => {
	if (req.cookies.token) {
		let user = await Users.findOne({ where: { token: req.cookies.token } });
		if (!user) res.clearCookie("token");
		else return res.redirect("/");
	}
	res.render("login.ejs", {
		location: req.hostname,
		secure: req.protocol == "https",
	});
};
module.exports.info = {
	route: "/login",
};
