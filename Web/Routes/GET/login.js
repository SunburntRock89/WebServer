module.exports = async(req, res) => {
	let port = req.get("host").split(":").length > 0 ? req.get("host").split(":")[1] : config.webServer.port;

	if (port !== config.configurationPort) {
		if (req.cookies.token) {
			let user = await Users.findOne({ where: { token: req.cookies.token } });
			if (!user) res.clearCookie("token");
			else return res.redirect("/");
		}
		res.render("login.ejs", {
			location: req.hostname,
			secure: req.protocol == "https",
		});
	} else {
		// handle da shid
		res.status(404).send("not implemented");
	}
};
module.exports.info = {
	route: "/login",
};
