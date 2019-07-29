'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('orderlists', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			coffee_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			coffee_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			number: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			size: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			shot: {
				type: Sequelize.STRING,
			},
			order_time: {
				type: Sequelize.STRING,
				allowNull: false,

			}
		},{
			timestamps: false
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('orderlists');
	}
};
