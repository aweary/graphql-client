"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a store instance that uses the
 * read/write functions provided by the
 * GraphQLStoreAdapter instance. This allows users
 * to implement their own store system and control
 * where the data is being saved.
 *
 * @class GraphQLStoreAdapter
 * 
 */

var GraphQLStoreAdapter = function GraphQLStoreAdapter() {
  _classCallCheck(this, GraphQLStoreAdapter);
};

exports.default = GraphQLStoreAdapter;