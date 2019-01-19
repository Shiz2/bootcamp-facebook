import React from 'react'
import { Container, Image, Post, Posts } from './styles'
import defaultImage from './RiversCuomo.jpg'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const User = props => {
  const GET_USER = gql`
    query user($id: ID!) {
      user(id: $id) {
        user {
          name
          picture
          posts {
            id
            content
          }
        }
      }
    }
  `

  return (
    <Query query={GET_USER} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>
        return (
          <Container>
            <Image src={data.user.user.picture} />
            <Posts>
              {data.user.user.posts.map(post => (
                <Post id={post.id}>{post.content}</Post>
              ))}
            </Posts>
          </Container>
        )
      }}
    </Query>
  )
}

User.defaultProps = {
  image: defaultImage,
  posts: [{ id: '1212313', content: 'El Scorcho' }]
}

export default User
