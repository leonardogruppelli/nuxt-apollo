import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      writer {
        id
        firstname
        lastname
        email
        role
      }
    }
  }
`
