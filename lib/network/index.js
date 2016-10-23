'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultGraphQLNetwork = function () {
  function DefaultGraphQLNetwork(uri) {
    _classCallCheck(this, DefaultGraphQLNetwork);

    this.uri = uri;
  }

  _createClass(DefaultGraphQLNetwork, [{
    key: 'send',
    value: function send(request) {
      return fetch(this.uri, {
        method: 'POST',
        body: JSON.stringify({
          query: request.query,
          variables: request.variables
        }),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      });
    }
  }]);

  return DefaultGraphQLNetwork;
}();

exports.default = DefaultGraphQLNetwork;