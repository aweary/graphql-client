const express = require('express')
const graphQLHTTP = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')
const app = express()

app.use(cors())

app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true
}))

app.use('/', (req, res) => {
  res.render('../index.html')
})

app.listen(3000)
