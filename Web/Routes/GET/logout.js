module.exports = async(req, res) => {
	let port = req.get("host").split(":").length > 0 ? req.get("host").split(":")[1] : config.webServer.port;

	if (port !== config.configurationPort) {
		res.clearCookie("token");
		res.redirect("/");
	} else {
		// handle da shid
		res.status(404).send("not implemented");
	}
};
module.exports.info = {
	route: "/logout",
};
