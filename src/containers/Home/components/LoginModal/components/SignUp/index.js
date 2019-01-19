import React, { Component } from 'react'
import { Title, LineInput, SubmitButton, SecondaryOptionText } from './styles'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  // {email: "jb@m.com", password: "12"}

  onChange = (key, e) => {
    this.setState({ [key]: e.target.value })
  }

  SIGN_UP = gql`
    mutation createUser($input: UserInput!) {
      createUser(input: $input) {
        message
        success
        token
      }
    }
  `

  render() {
    return (
      <Mutation
        mutation={this.SIGN_UP}
        onCompleted={data => {
          if (data.createUser.success) {
            const {
              createUser: { token }
            } = data
            localStorage.setItem('token', token)
            this.props.history.push('/users')
          }
          return <div>{data.createUser.message} </div>
        }}
      >
        {(signUp, { loading, error }) => {
          // this loading state will probably never show, but it's helpful to
          // have for testing
          if (loading) return <p> Loading </p>
          if (error) return <p>An error occurred</p>
          return (
            <React.Fragment>
              <Title>Nice to meet you!</Title>
              <LineInput
                placeholder="Name"
                value={this.state.name}
                onChange={e => this.onChange('name', e)}
              />
              <LineInput
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.onChange('email', e)}
              />
              <LineInput
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.onChange('password', e)}
                type="password"
              />
              <SubmitButton
                onClick={() => {
                  signUp({
                    variables: {
                      input: {
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name
                      }
                    }
                  })
                  this.setState({ name: '' })
                  this.setState({ email: '' })
                  this.setState({ password: '' })
                }}
              >
                Get Started
              </SubmitButton>
              <SecondaryOptionText onClick={this.props.changeMode}>
                Or Login
              </SecondaryOptionText>
            </React.Fragment>
          )
        }}
      </Mutation>
    )
  }
}

const SignUpWithRouter = withRouter(SignUp)

export default SignUpWithRouter
