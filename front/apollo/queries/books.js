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
