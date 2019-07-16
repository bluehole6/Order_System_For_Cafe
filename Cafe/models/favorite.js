'use strict';
module.exports =(sequelize, DataTypes) => {
	var favorite = sequelize.define('favorite', {
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
		}

	},{
		timestamps: false
	}); 
	
	return favorite;
}