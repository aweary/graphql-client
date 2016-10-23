// @flow

export type GraphQLFieldMap = {
  [fieldName: string]: mixed,
}

export type RecordArgsMap = {
  [fieldName: string]: string,
}

export type GraphQLRecord = {
  __dataId__: string,
  __args__: RecordArgsMap,
  fields: GraphQLFieldMap,
  typename?: string,
}
