'use strict';
module.exports =(sequelize, DataTypes) => {
	var user = sequelize.define('user', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			//primaryKey: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false

		},
		stamp: {
			type: DataTypes.INTEGER,
			allowNull: false

		},
		coupon: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		birth: {
			type: DataTypes.DATEONLY
			
		},
		favorite: { 
			type: DataTypes.STRING
			
		},
		recent_order_time: { 
			type: DataTypes.DATE,
			allowNull: false
		},
		total_order_num: { 
			type: DataTypes.INTEGER,
			allowNull: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}); 
	return user;
}