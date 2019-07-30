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
			recent_order_time: { 
				type: Sequelize.DATE
			},
			total_order_num: { 
				type: Sequelize.INTEGER,
				allowNull: false
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