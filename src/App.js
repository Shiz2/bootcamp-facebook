import React, { Component } from 'react'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import config from './config'
import Navbar from './components/Navbar'
import Home from './containers/Home/'
import Users from './containers/Users/'
import User from './containers/User'
import { Flex } from 'grid-styled'

const httpLink = createHttpLink({
  uri: config.graphqlUrl
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ''
    }
  }
})

// creates new client
const client = new ApolloClient({
  uri: config.graphqlUrl,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Flex style={{ flexDirection: 'column' }} className="App">
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route path="/user/:id" component={User} />
              </Switch>
            </Flex>
          </ApolloProvider>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App
