import gql from 'graphql-tag'

export const CREATED = gql`
  subscription {
    onCreatedBook {
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

export const UPDATED = gql`
  subscription {
    onUpdatedBook {
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

export const DELETED = gql`
  subscription {
    onDeletedBook {
      id
    }
  }
`
