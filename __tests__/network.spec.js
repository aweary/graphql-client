jest.unmock('../src/network')
global.fetch = jest.fn()

const DefaultGraphQLNetwork =
require('../src/network').default

let network

describe('DefaultGraphQLNetwork', () => {

  beforeEach(() => {
    network = new DefaultGraphQLNetwork('/graphql')
  })

  // it('should send queries', () => {
  //   network.send({
  //     query: '{ user(id: $id) { name } }',
  //     variables: {
  //       id: 42,
  //     },
  //   })
  //   expect(fetch.mock.calls.length).toBe(1)
  // })
})
