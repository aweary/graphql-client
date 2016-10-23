/**
 * Used to implement a custom GraphQLStore with any
 * @type {Object}
 */
export type CustomGraphQLStoreInterface = {
  readFieldFromStore: (name: string) => Object,
  writeFieldToStore: (name: string, data: Object) => boolean,
  getDataIdFromField: (field: Object) => string
}

export type SelectionSetContextAndData = {
  selectionSet: Object,
  parentId: string,
  rootId: string,
  dataId?: string,
}

export type GraphQLStoreData = {
  [recordName: string]: any
}

const OperationDefinition = 'OperationDefinition'

import {
  writeSelectionSetToStore,
  getSelectionsFromQuery,
} from './GraphQLStoreWriter'


export function getQueryOperationFromDocument(document) {
  const queries = document.definitions.filter(
    definition => definition.kind === OperationDefinition
  )
  if (queries.length > 1) {
    throw new Error(
      'GraphQLClient.query(...): there should only be one ' +
      'root query. If you need to make multiple distinct ' +
      'queries you should use multiple GraphQlClient.query ' +
      'calls.'
    )
  }
  return queries[0]
}

export function writeQueryToStore({
  storeData,
  query,
  response,
  dataIdFromObject,
}) {
  const selections = getSelectionsFromQuery(query)
  writeSelectionSetToStore({
    storeData,
    parentId: 'ROOT_QUERY',
    selections,
    result: response.result,
    dataIdFromObject,
  })
  console.log({ storeData })
}

export default class GraphQLStore {
  _records: GraphQLStoreData;

  constructor(config) {
    this._records = {}
    this.dataIdFromObject = config.dataIdFromObject
  }

  save(data: Object) {
    const document = data.AST
    const query = getQueryOperationFromDocument(document)
    writeQueryToStore({
      storeData: this._records,
      query,
      response: data,
      dataIdFromObject: this.dataIdFromObject
    })
  }

}
