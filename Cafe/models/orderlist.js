'use strict';
module.exports =(sequelize, DataTypes) => {
	var orderlist = sequelize.define('orderlist', {
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
			type: DataTypes.STRING,
		}

	},{
		timestamps: false
	}); 
	
	return orderlist;
} 