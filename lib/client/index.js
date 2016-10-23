'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import { visit } from 'graphql/language/visitor'

var _printer = require('graphql/language/printer');

var _network = require('../network');

var _network2 = _interopRequireDefault(_network);

var _QueryManager = require('../query/QueryManager');

var _QueryManager2 = _interopRequireDefault(_QueryManager);

var _GraphQLStore = require('../store/GraphQLStore');

var _GraphQLStore2 = _interopRequireDefault(_GraphQLStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphQLClient = function () {
  function GraphQLClient(config) {
    _classCallCheck(this, GraphQLClient);

    this.store = new _GraphQLStore2.default();
    this.subscribers = [];
    this.queries = new _QueryManager2.default();
    this.network = config.network ? config.network : new _network2.default('/graphql');
  }

  _createClass(GraphQLClient, [{
    key: 'subscribe',
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
  }, {
    key: 'query',
    value: function query(options) {
      var _this = this;

      this.queries.diffQuery(options.query);
      /* Pass request to the network interface */
      return new Promise(function (resolve) {
        _this.network.send({
          query: (0, _printer.print)(options.query),
          variables: options.variables
        }).then(function (_ref) {
          var data = _ref.data;

          _this.store.save(data);
          resolve(_this.store);
        });
      });
    }
  }]);

  return GraphQLClient;
}();

exports.default = GraphQLClient;