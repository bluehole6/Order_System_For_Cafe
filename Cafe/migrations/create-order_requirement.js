'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('order_requirements', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			order_requirement: {
				type: Sequelize.STRING(50)
			},

		},{
			timestamps: false
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('order_requirements');
	}
};