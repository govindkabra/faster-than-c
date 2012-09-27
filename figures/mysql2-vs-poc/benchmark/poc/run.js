#!/usr/bin/env node

var common   = require('../common');
var Protocol = require('./Protocol');

common.run('poc', function(stream, fields, cb) {
  var protocol = new Protocol();

  // This would normally happen when the fields are received
  protocol._setFields(fields);

  var rows = 0;
  protocol.onRow = function() {
    rows++;
  };

  stream
    .on('data', function(buffer) {
      protocol.write(buffer);
    })
    .on('end', function() {
      cb(null, rows);
    });
});
