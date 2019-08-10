'use strict';
module.exports =(sequelize, DataTypes) => {
	var favorite = sequelize.define('order_requirement', {
		requirement: {
			type: DataTypes.STRING(50),
		}

	},{
		timestamps: false
	}); 
	
	return favorite;
}