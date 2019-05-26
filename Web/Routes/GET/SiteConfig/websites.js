module.exports = async(req, res, functions) => {
	if (!req.cookies.token) return res.redirect("/login");

	let user = await Users.findOne({ where: { token: req.cookies.token } });
	if (!user) res.clearCookie("token").redirect("/login");
	delete user.dataValues.password;

	if (!user.dataValues.profilePicture) user.dataValues.profilePicture = functions.getGravatar(user.email);

	let websites;
	if (user.dataValues.type == "Admin") {
		websites = Domains;
	}

	res.render("websites.ejs", {
		user: user.dataValues,
		websites: websites.values(),
	});
};
module.exports.info = {
	route: "/websites",
};
