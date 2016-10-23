// @flow
export type QueryOptions = {
  query: string,
  forceFetch: boolean,
  variables?: { [name: string]: mixed },
  defaults?: { [name: string]: mixed },
}

export type MutateOptions = {
  mutation: string,
  variables?: { [name: string]: any }
}


export type GraphQLNetworkConfig = {
  [configOption: string]: any
}

export type GraphQLNetworkInterface = {
  sendQueries(queries: QueryOptions): Promise,
  sendMutations(mutations: MutateOptions): Promise,
}

export type GraphQLNetworkRequest = {
  query: string,
  variables: { [variable: string]: mixed }
}


export default class DefaultGraphQLNetwork {
  uri: string;

  constructor(uri: string) {
    this.uri = uri
  }

  send(request: GraphQLNetworkRequest): Promise {
    return fetch(this.uri, {
      method: 'POST',
      body: JSON.stringify({
        query: request.query,
        variables: request.variables,
      }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
  }
}
