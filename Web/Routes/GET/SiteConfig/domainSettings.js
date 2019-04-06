const { renderFile } = require("ejs");

module.exports = async(req, res) => {
	let port = req.get("host").split(":").length > 0 ? req.get("host").split(":")[1] : config.webServer.port;

	if (port !== config.configurationPort) {
		if (!req.cookies.token) return res.redirect("/login");

		let user = await Users.findOne({ where: { token: req.cookies.token } });
		if (!user) res.clearCookie("token").redirect("/login");

		if (!req.query || !req.query.id || !req.query.protocol || !req.query.fulldomain || !req.query.domain) return res.redirect("/");

		let toSend = await renderFile("./Web/Views/Partials/domainSettings.ejs", {
			id: req.query.id,
			protocol: req.query.protocol,
			fulldomain: req.query.fulldomain,
			domain: req.query.domain,
			subdomain: req.query.subdomain,
		});
		res.send(toSend.split("\n").join("\n"));
	} else {
		// handle da shid
		res.status(404).send("not implemented");
	}
};
module.exports.info = {
	route: "/static/domainSettings",
};
