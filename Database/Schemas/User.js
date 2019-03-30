const Sequelize = require("sequelize");
const randomstring = require("randomstring");

module.exports = async sequelize => {
	let users = global.Users = sequelize.define("Users", {
		email: {
			type: Sequelize.CITEXT,
			allowNull: false,
		},
		username: {
			type: Sequelize.CITEXT,
			allowNull: false,
		},
		password: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		token: {
			type: Sequelize.TEXT,
			allowNull: false,
			default: randomstring.generate(64),
		},
		type: {
			type: Sequelize.ENUM,
			values: ["Customer", "Reseller", "Admin"],
			defaultValue: "Customer",
		},
		profilePicture: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
	});

	await users.sync();

	return users;
};
