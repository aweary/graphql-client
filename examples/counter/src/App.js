import React from 'react'
import GraphQLClient from 'graphql-client/lib/client'
import GraphQLNetwork from 'graphql-client/lib/network'
import gql from 'graphql-client/lib/query/gql'

const client = new GraphQLClient({
  network: new GraphQLNetwork('https://www.graphqlhub.com/graphql'),
  dataIdFromObject: obj => {
    console.log(obj)
  }
})

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    client.query({
      query: gql`{
        graphQLHub
    }`,
  }).catch(err => console.error(err))
    window.issueQuery = () => {
      client.query({
        query: gql`{
  graphQLHub
  giphy {
    random {
     url
    }
  }
  github {
    repo(name:"relay", ownerUsername:"facebook") {
      id
      name
      owner {
        login
      }
    }
  }
}`,
      })
      .then(response => {
        console.log('res', response)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }


  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default App
