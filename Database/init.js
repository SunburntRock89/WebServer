const Sequelize = require("sequelize");
const { readdir } = require("fs-nextra");
const Collection = require("collection");

const sequelize = new Sequelize({
	dialect: "sqlite",
	logging: false,

	storage: "./Database/database.sqlite",
});

module.exports = async() => {
	sequelize.authenticate()
		.then(() => winston.info("[Database] Successfully opened."))
		.catch(err => winston.error("[Database] Failed to open: ", err.stack));
	let schemas = await readdir("./Database/Schemas");
	for (let s of schemas) require(`./Schemas/${s}`)(sequelize);

	const Domains = global.Domains = new Collection();
	let allSites = await Websites.findAll({ });
	for (let i of allSites) {
		Domains.set(i.id, i.dataValues);
	}

	return sequelize;
};
