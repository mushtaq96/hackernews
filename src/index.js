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

import { BrowserRouter } from 'react-router-dom'
import { AUTH_TOKEN } from './constants';
import { setContext } from 'apollo-link-context'



//create the httpLink that will connect your ApolloClient instance with the GraphQL API
const httpLink = createHttpLink({
  uri:'http://localhost:4000'
})

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers:{
      ...headers,
      authorizarion:token?`Bearer ${token}` :''
    }
  }
})

//instantiate ApolloClient
const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache:new InMemoryCache()
})

//render the root component of your React app
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
serviceWorker.unregister();