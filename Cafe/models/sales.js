'use strict';
module.exports =(sequelize, DataTypes) => {
	var sales = sequelize.define('sales', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
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
		size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		shot: {
			type: DataTypes.BOOLEAN
		},
		takeout: {
			type: DataTypes.BOOLEAN
		},
		order_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,			
		}
	},{
		timestamps: false
	}); 
	
	return sales;
} 