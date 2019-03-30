const Sequelize = require("sequelize");
const randomstring = require("randomstring");

module.exports = async sequelize => {
	let Websites = global.Websites = sequelize.define("Websites", {
		protocol: {
			type: Sequelize.ENUM,
			values: ["HTTP", "HTTPS"],
			defaultValue: "HTTP",
		},
		domain: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		subDomain: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		fullDomain: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		owner: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
	});

	await Websites.sync();

	return Websites;
};
