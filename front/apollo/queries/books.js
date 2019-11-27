import gql from 'graphql-tag'

export const LIST = gql`
  query {
    allBooks {
      id
      title
      isbn
      publicationDate
      genre
      writer {
        firstname
      }
    }
  }
`

export const GET = gql`
  query get($id: ID!) {
    getBook(id: $id) {
      title
      isbn
      publicationDate
      genre
    }
  }
`
