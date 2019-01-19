import React from 'react'
import { Container, StyledLink } from './styles'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <Container>
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/users">Users</StyledLink>
    {localStorage.getItem('token') && (
      <Link to="/">
        <button onClick={() => localStorage.removeItem('token')}>Logout</button>
      </Link>
    )}
  </Container>
)

export default Navbar
