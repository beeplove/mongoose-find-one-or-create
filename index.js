'use strict';

/**
 * Mongoose Plugin: findOneOrCreate
 * Copyright(c) 2014 Mohammad Khan <mohammad.khan@gmx.us>
 * MIT Licensed
**/

function findOneOrCreatePlugin(schema) {
    schema.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback) {
        var self = this;

        self.findOne(condition, function(err, result ) {
            if (result) {
                callback(err, result);
            } else {
                self.create(doc, function(err, result) {
                    callback(err, result);
                });
            }
        });
    };
}

module.exports = findOneOrCreatePlugin;
