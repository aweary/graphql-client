// @flow
import { parse } from 'graphql/language/parser'
import type { Document } from '../types/graphql'

export type DocumentCache = {
  [doc: string]: Document
}

const cache: DocumentCache = {}

export default function gql(queries: Array<string>) : Document {
  const docString: string = queries.reduce(
    (prev, next) => prev + next,
    ''
  )
  if (cache[docString]) return cache[docString]
  const doc = parse(docString)
  cache[docString] = doc
  return doc
}
