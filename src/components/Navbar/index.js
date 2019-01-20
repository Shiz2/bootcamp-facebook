import React from 'react'
import { Container, StyledLink } from './styles'
import { Link } from 'react-router-dom'
import auth from '../../auth'
import { withApollo } from 'react-apollo'

const Navbar = ({ client }) => (
  <Container>
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/users">Users</StyledLink>
    {localStorage.getItem('token') && (
      <Link to="/">
        <button onClick={() => auth.signout(client.resetStore)}>Logout</button>
      </Link>
    )}
  </Container>
)

export default withApollo(Navbar)
