jest.unmock('graphql/language/parser')
jest.unmock('graphql/language/printer')
jest.unmock('../src/query/gql')

let gql = require('../src/query/gql').default

describe('gql(...)', () => {

  it('should export a function', () => {
    expect(typeof gql).toBe('function')
  })

  it('should return a Document', () => {
    const doc = gql`query { user(id: $id) { id, name } }`
    expect(doc.kind).toBe('Document')
    expect(Array.isArray(doc.definitions)).toBe(true)
  })

  it('should return from the cache when possible', () => {
    jest.mock('graphql/language/parser', () => {
      return { parse: jest.fn(() => ({ kind: 'DOCUMENT' })) }
    })
    const mockParse = require('graphql/language/parser').parse
    gql = require('../src/query/gql').default
    gql`query { name }`
    gql`query { name }`
    gql`query { name }`
    expect(mockParse.mock.calls.length).toBe(1)
  })
})
