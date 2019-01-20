import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Container } from './styles'
import Login from './components/Login'
import SignUp from './components/SignUp'
import auth from '../../../../auth'

const Content = ({ loginMode, toggleLoginMode, authenticateUser }) => {
  if (loginMode) {
    return (
      <Login changeMode={toggleLoginMode} authenticateUser={authenticateUser} />
    )
  }
  return (
    <SignUp changeMode={toggleLoginMode} authenticateUser={authenticateUser} />
  )
}

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginMode: true,
      redirectToReferrer: false
    }
  }

  toggleLoginMode = () => {
    this.setState({ loginMode: !this.state.loginMode })
  }

  authenticateUser = () => {
    auth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return this.state.redirectToReferrer ? (
      <Redirect to={from} />
    ) : (
      <Container>
        <Content
          loginMode={this.state.loginMode}
          toggleLoginMode={this.toggleLoginMode}
          authenticateUser={this.authenticateUser}
        />
      </Container>
    )
  }
}

const LoginModalWithRouter = withRouter(LoginModal)

export default LoginModalWithRouter
