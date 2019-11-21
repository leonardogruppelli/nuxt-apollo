import gql from 'graphql-tag'

export const CREATE = gql`
  mutation createBook($data: CreateBookInput!) {
    createBook(data: $data) {
      id
      title
      isbn
      publicationDate
      genre
      writer {
        id
        firstname
      }
    }
  }
`
