'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('coffees', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			coffee_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			coffee_price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		},{
			timestamps: false
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('coffees');
	}
};