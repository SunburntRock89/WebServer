const { scan } = require("fs-nextra");
const app = require("express")();
const server = global.server = require("http").createServer(app);
const ejs = require("ejs");
const upload = require("multer")();
const reload = require("require-reload")(require);
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

server.listen(config.webServer.configurationPort || 8080, config.webServer.ip || "0.0.0.0", () => {
	winston.info(`[Web Control Panel] Successfully opened web control panel on port ${config.webServer.configurationPortUnencrypted || 8080}!`);
});

app.listen(config.webServer.port, () => winston.info(`[Web Server] Successfuly started websites on port ${config.webServer.port || 80}`));

module.exports = async sequelize => {
	// eslint-disable-next-line max-statements-per-line
	app.use(async(req, res, next) => { res.set("X-Powered-By", "Harrison's Mum"); next(); });
	app.use(require("body-parser").json());
	app.use(require("body-parser").urlencoded({ extended: true }));
	app.use(require("compression")());
	app.use(require("cookie-parser")());
	app.set("views", `${__dirname}/Views/Pages`);
	app.engine("ejs", ejs.renderFile);
	app.enable("trust proxy");

	app.use(require("serve-favicon")(`${__dirname}/Views/Static/favicon.ico`));

	const functions = {};
	functions.getGravatar = email => {
		email = email.toLowerCase();
		let crypto = require("crypto");
		let hash = crypto.createHash("md5").update(email).digest("hex");

		let url = `https://www.gravatar.com/avatar/${hash}`;
		return url;
	};

	const rateLimit = require("express-rate-limit")({
		windowMs: 15 * 60 * 1000,
		max: 15,
		handler: (req, res) => require("./Routes/Internal/rateLimitHandle.js"),
	});

	let getroutes = await scan("./Web/Routes/GET", { filter: (_, file) => file.endsWith(".js") });
	for (let i of getroutes) {
		let route = require(i[0]);
		let name = route.info.route;
		app.get(name, (req, res) => reload(i[0])(req, res, functions));
	}

	let postroutes = await scan("./Web/Routes/POST", { filter: (_, file) => file.endsWith(".js") });
	for (let i of postroutes) {
		let route = require(i[0]);
		let name = route.info.route;
		if (route.rateLimit) return app.post(name, rateLimit, (req, res) => reload(i[0](req, res)));
		app.post(name, (req, res) => reload(i[0])(req, res));
	}

	const sessionStore = new SequelizeStore({
		db: sequelize,
	});

	await sessionStore.sync();

	app.use(session({
		secret: config.sessionSecret,
		store: sessionStore,
		saveUninitialized: false,
		proxy: true,
		resave: false,
	}));

	app.use(async(req, res, next) => {
		let port = req.get("host").split(":").length > 1 ? req.get("host").split(":")[1] : config.webServer.port;

		port = Number(port);

		if (port !== config.webServer.configurationPortUnencrypted && port !== config.webServer.configurationPort) return res.status(404).end("not implemented");
		next();
	});

	app.use(require("serve-static")(`${__dirname}/Views/Static/`));
};
