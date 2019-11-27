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

export const UPDATE = gql`
  mutation createBook($id: ID!, $data: UpdateBookInput!) {
    updateBook(id: $id, data: $data) {
      id
      title
      isbn
      publicationDate
      genre
    }
  }
`

export const DELETE = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`
