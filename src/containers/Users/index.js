import React, { Component } from 'react'
import { Container, Header, SearchBar, UsersContainer } from './styles'
import UserCard from './components/UserCard'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value })
  }

  GET_USERS = gql`
    query {
      users {
        name
        picture
      }
    }
  `

  render() {
    return (
      <Container>
        <Header>
          <SearchBar
            classname="serachbar"
            placeholder="Search"
            onChange={this.handleChange}
          />
        </Header>
        <UsersContainer>
          <Query query={this.GET_USERS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error :(</p>

              return data.users.map(user => (
                <UserCard image={user.picture} name={user.name} />
              ))
            }}
          </Query>
        </UsersContainer>
      </Container>
    )
  }
}

export default Users
