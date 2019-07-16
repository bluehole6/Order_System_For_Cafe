'use strict';
module.exports =(sequelize, DataTypes) => {
	return sequelize.define('cart', {
		cart_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		member_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		coffee_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		coffee_number: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		number: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		shot: {
			type: DataTypes.STRING,
			allowNull: false,
		}
		
	}); 
}