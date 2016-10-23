jest.unmock('../src/client')
jest.unmock('../src/network')
jest.unmock('../src/query/gql')
jest.unmock('graphql/language/parser')
jest.unmock('graphql/language/printer')
jest.unmock('isomorphic-fetch')

global.fetch = require('isomorphic-fetch')

const gql = require('../src/query/gql').default
const GraphQLClient = require('../src/client').default
const GraphQLNetwork = require('../src/network').default

describe('GraphQLClient', () => {
  it('should export the GraphQLClient class', () => {
    const client = new GraphQLClient({})
    expect(client instanceof GraphQLClient).toBe(true)
  })

  it('should forward requests to the network', (done) => {
    const network = new GraphQLNetwork(
      'https://www.graphqlhub.com/graphql'
    )
    const client = new GraphQLClient({ network })
    const query1 = client.query({
      query: gql`{
        graphQLHub
        github {
          user(username: "clayallsopp") {
            login
            avatar_url
          }
      }
    }`,
    })
    .then(() => {
      return client.query({
        query: gql`{
        reddit {
          subreddit(name: "graphql") {
            publicDescription
          }
        }
      }`,
      })
    })
    .then(data => {
      console.log('data', data)
      done()
    })
  })

  describe('subscribe(...)', () => {
    it('should add subscription listeners', () => {
      const client = new GraphQLClient({})
      client.subscribe(data => data)
      expect(client.subscribers.length).toBe(1)
    })
  })
})
