var Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

var middleware = function () {
  var args      = Array.prototype.slice.apply(arguments);
  var callback  = args.pop();
  var sequelize = new (Function.prototype.bind.apply(Sequelize, [null].concat(args)));
  var models;

  switch (typeof(callback)) {
    case 'function':
      models = callback(sequelize, DataTypes);
      break;
    case 'string':
      models = sequelize.import(callback);
      break;
    default:
      throw new Error('sequelize-middleware expects a callback function or path');
  }

  return function (socket, next) {
    socket.models || (socket.models = models);
    socket.sequelize || (socket.sequelize = sequelize);

    next();
  };
};

module.exports = middleware;
