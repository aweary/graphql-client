'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gql;

var _parser = require('graphql/language/parser');

var cache = {};

function gql(queries) {
  var docString = queries.reduce(function (prev, next) {
    return prev + next;
  }, '');
  if (cache[docString]) return cache[docString];
  var doc = (0, _parser.parse)(docString);
  cache[docString] = doc;
  return doc;
}