# socket.io-sequelize

This package provides a simple way to integrate your
[Sequelize](http://sequelizejs.com/) models into your socket.io or engine.io
middleware stack, making your models available on the socket object itself.

## Installation

Install the package as an application dependency.

    npm install socket.io-sequelize --save

This package does not have a direct dependency on Sequelize itself, so you will
need to ensure it's included in your package dependencies.  The benefit is that
you can specify what version of Sequelize to work with.

## Usage

Inject the middleware into your stack prior to your route handling logic and
any other middleware that depends on your models.

    var io = require('socket.io')();
    var sequelize = require('socket.io-sequelize');
    
    io.use(sequelize('db', 'user', 'pass', { host: 'localhost' }, 'app/models'));

The the first 4 parameters behave the same as
[Sequelize's instantiation](http://sequelizejs.com/docs/1.7.8/usage#basics).
It accepts the database name, optional username, optional password, and
optional connection options.

The final parameter is specific to the middleware and takes one of two options:

1. A function that accepts a Sequelize instance and `DataTypes` reference as
   arguments, e.g.:

        io.use(sequelize('db', function (db, DataTypes) {
          db.define( ... );
        }));

2. A string representing the path to a file to be imported via
   [sequelize.import](http://sequelizejs.com/docs/1.7.8/models#import), e.g.:

        io.use(sequelize('db', path.resolve(__dirname, 'app/models')));

   Wherein your `app/models/index.js` file might look something like:

        var fs = require('fs');
        var path = require('path');

        module.exports = function (db, DataTypes) {
          var files = fs.readdirSync(__dirname).map(function (file) {
            return path.join(__dirname, file);
          }).filter(function (file) {
            return file !== __filename;
          });

          var models = {};

          files.forEach(function (file) {
            var model = db.import(file);
            models[model.name] = model;
          });

          Object.keys(models).forEach(function (name) {
            if ('associate' in models[name]) {
              models[name].associate(db);
            }
          });

          return models;
        };

    And every other file in the `app/models` folder would take on the
    structure:

        module.exports = function (db, DataTypes) {
          return db.defined( ... );
        };

## License

socket.io-sequelize is released under the
[MIT License](http://opensource.org/licenses/MIT).
