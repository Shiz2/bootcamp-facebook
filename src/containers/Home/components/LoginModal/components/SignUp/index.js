import React, { Component } from 'react'
import { Title, LineInput, SubmitButton, SecondaryOptionText } from './styles'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
      createUser(input: $variables) {
        token
      }
    }
  `

  greet = () => console.log(this.state)

  render() {
    return (
      <Mutation mutation={this.SIGN_UP}>
        {signUp => (
          <React.Fragment>
            <Title>Nice to meet you!</Title>
            <LineInput
              placeholder="Name"
              onChange={e => this.onChange('name', e)}
            />
            <LineInput
              placeholder="Email"
              onChange={e => this.onChange('email', e)}
            />
            <LineInput
              placeholder="Password"
              onChange={e => this.onChange('password', e)}
              type="password"
            />
            <SubmitButton onClick={() => signUp({ variables: this.state })}>
              Get Started
            </SubmitButton>
            <SecondaryOptionText onClick={this.props.changeMode}>
              Or Login
            </SecondaryOptionText>
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}

export default SignUp
