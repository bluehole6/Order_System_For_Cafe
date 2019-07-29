'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				//primaryKey: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false

			},
			stamp: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			coupon: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			birth: {
				type: Sequelize.DATEONLY

			},
			favorite: { 
				type: Sequelize.STRING

			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};