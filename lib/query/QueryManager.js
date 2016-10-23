'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = 'Document';
var OperationDefinition = 'OperationDefinition';
var FragmentDefinition = 'FragmentDefinition';

/**
 * This should check the store to see if this field
 * already exists. If it does, it should exclude it.
 */

function parseOperation(operation) {
  operation.selectionSet.selections.forEach(function (selection) {
    var selectFieldName = selection.name.value;
    console.log({ selectFieldName: selectFieldName, selection: selection });
  });
}

function parseFragment(fragment) {
  console.log({ fragment: fragment });
}

var QueryManager = function () {
  function QueryManager() {
    _classCallCheck(this, QueryManager);
  }

  _createClass(QueryManager, [{
    key: 'diffQuery',
    value: function diffQuery(query) {
      if (query.kind !== Document) {
        throw new Error('QueryManager.diffQuery(...): unable to parse ' + 'document with kind ' + query.kind + '. Expected ' + 'a Document.');
      }
      if (!query.definitions.length) {
        throw new Error('QueryManager.diffQuery(...): cannot parse empty queries.');
      }
      for (var i = 0; i < query.definitions.length; i++) {
        var definition = query.definitions[i];
        switch (definition.kind) {
          case OperationDefinition:
            parseOperation(definition);
            break;
          case FragmentDefinition:
            parseFragment(definition);
            break;
          default:
            console.log('I dont know this type', definition.kind);
        }
      }
    }
  }]);

  return QueryManager;
}();

exports.default = QueryManager;