'use strict';
module.exports =(sequelize, DataTypes) => {
	var user = sequelize.define('user', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: false,

		},
		stamp: {
			type: DataTypes.INTEGER,
			allowNull: false,

		},
		birth: {
			type: DataTypes.DATE,
			
		},
		favorite: {
			type: DataTypes.STRING,
			
		}
	}); 
	return user;
}