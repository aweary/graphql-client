// @flow
import { print } from 'graphql/language/printer'
// import { visit } from 'graphql/language/visitor'

import DefaultGraphQLNetwork from '../network'
import QueryManager from '../query/QueryManager'
import GraphQLStore from '../store/GraphQLStore'
import {
  logRawQuery,
  logDiffedQuery,
} from '../util/logger'

import type QueryManagerType from '../network'
export type GraphQLClientConfig = {
  network: DefaultGraphQLNetwork,
  dataIdFromObject: () => string,
}

export type SubscribeCallback = (data: Object) => void

export default class GraphQLClient {
  network: DefaultGraphQLNetwork;
  subscribers: Array<SubscribeCallback>;
  queries: QueryManagerType;
  store: GraphQLStore;
  constructor(config: GraphQLClientConfig) {
    this.store = new GraphQLStore({
      dataIdFromObject: config.dataIdFromObject,
    })
    this.subscribers = []
    this.queries = new QueryManager({
      store: this.store
    })
    this.network = config.network
      ? config.network
      : new DefaultGraphQLNetwork('/graphql')
  }

  subscribe(callback: SubscribeCallback) {
    this.subscribers.push(callback)
  }

  query(options: Object) {
    logRawQuery(options.query)
    const diffedAST = this.queries.diffQuery(options.query)
    logDiffedQuery(diffedAST)
    /* Pass request to the network interface */
    return new Promise(resolve => {
      this.network.send({
        query: print(options.query),
        variables: options.variables
      })
      .then(response => {
        const { data } = response
        this.store.save({
          result: data,
          AST: diffedAST,
          variables: options.variables,
        })
        resolve(data)
      })
    })
  }
}
