'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('carts', {
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
			coffee_price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			size: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			shot: {
				type: Sequelize.BOOLEAN,
			},
			takeout: {
				type: Sequelize.BOOLEAN,
			}
		},{
			timestamps: false
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('carts');
	}
};