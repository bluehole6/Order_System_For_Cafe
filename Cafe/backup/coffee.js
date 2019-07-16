'use strict';
module.exports =(sequelize, DataTypes) => {
	return sequelize.define('coffee', {
		coffee_number: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
		
	}); 
}