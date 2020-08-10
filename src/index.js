import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker';

//importing the required dependencies from the installed packages
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

//create the httpLink that will connect your ApolloClient instance with the GraphQL API
const httpLink = createHttpLink({
  uri:'http://localhost:4000'
})

//instantiate ApolloClient
const client = new ApolloClient({
  link:httpLink,
  cache:new InMemoryCache()
})

//render the root component of your React app
ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.unregister();