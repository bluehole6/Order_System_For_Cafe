'use strict';
module.exports =(sequelize, DataTypes) => {
	var coffee = sequelize.define('coffee', {
		coffee_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		coffee_price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}

	},{
		timestamps: false
	}); 
	
	return coffee;
}