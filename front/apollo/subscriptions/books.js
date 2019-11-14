import gql from "graphql-tag";

export const CREATED = gql`
  subscription {
    onCreatedBook {
      id
      title
      ISBN
      publicationDate
      writer {
        id
        firstname
        lastname
      }
    }
  }
`

export const UPDATED = gql`
  subscription {
    onUpdatedBook {
      id
      title
      ISBN
      publicationDate
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