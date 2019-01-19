import React, { Component } from 'react'
import { Title, LineInput, SubmitButton, SecondaryOptionText } from './styles'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  onChange = (key, e) => {
    this.setState({ [key]: e.target.value })
  }

  LOGIN = gql`
    mutation loginUser($input: LoginInput!) {
      loginUser(input: $input) {
        message
        success
        user {
          name
        }
        token
      }
    }
  `

  render() {
    return (
      <Mutation
        mutation={this.LOGIN}
        onCompleted={data => {
          if (data.loginUser.success) {
            const {
              loginUser: { token }
            } = data
            localStorage.setItem('token', token)
            this.props.history.push('/users')
          } else {
            this.setState({ error: data.loginUser.message })
          }
        }}
      >
        {(login, { loading, error }) => {
          // this loading state will probably never show, but it's helpful to
          // have for testing
          if (loading) return <p> Loading </p>
          if (error) return <p>An error occurred</p>
          return (
            <React.Fragment>
              <Title>Welcome Back!</Title>
              {this.state.error && <p>{this.state.error} </p>}
              <LineInput
                placeholder="Email"
                onChange={e => this.onChange('email', e)}
              />
              <LineInput
                placeholder="Password"
                onChange={e => this.onChange('password', e)}
                type="password"
              />
              <SubmitButton
                onClick={() => {
                  login({
                    variables: {
                      input: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    }
                  })
                  this.setState({ email: '' })
                  this.setState({ password: '' })
                }}
              >
                Login
              </SubmitButton>
              <SecondaryOptionText onClick={this.props.changeMode}>
                Or Sign Up
              </SecondaryOptionText>
            </React.Fragment>
          )
        }}
      </Mutation>
    )
  }
}

const LoginWithRouter = withRouter(Login)

export default LoginWithRouter
