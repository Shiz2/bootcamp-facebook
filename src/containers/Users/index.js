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

  handleLogin = () => {
    this.props.history.push('/users')
  }

  GET_USERS = gql`
    query {
      users {
        message
        success
        code
        users {
          id
          name
          picture
        }
      }
    }
  `

  render() {
    return (
      <Container>
        <Header>
          <SearchBar
            className="serachbar"
            placeholder="Search"
            onChange={this.handleChange}
          />
        </Header>
        <UsersContainer>
          <Query query={this.GET_USERS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error :(</p>
              // if (!data.users.success) return <p>{data.users.message} </p>

              return data.users.users.map(user => (
                <UserCard
                  key={user.id}
                  image={user.picture}
                  name={user.name}
                  id={user.id}
                />
              ))
            }}
          </Query>
        </UsersContainer>
      </Container>
    )
  }
}

export default Users
