/**
 * These types are copies of the internal
 * graphql flow types defined in the
 * graphql/language package.
 *
 * This is a tempory workaround until
 * theres a way to import internal types
 * directly from the graphql package
 * @flow
 */

export type Document = {
  kind: 'Document',
  loc?: ?Location,
  definitions: Array<any>;
}

export type Location = {
  start: number,
  end: number,
  source?: ?Source
}

export type Source = {
  body: string,
  name: string
}
