'use strict';
module.exports =(sequelize, DataTypes) => {
	var cart = sequelize.define('cart', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		coffee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		coffee_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		number: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		coffee_price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		shot: {
			type: DataTypes.BOOLEAN,
		},
		takeout: {
			type: DataTypes.BOOLEAN,
		}
	},{
		timestamps: false
	}); 
	
	return cart;
}