import gql from "graphql-tag";

export const LIST = gql`
  query {
    allBooks {
      id
      title
      ISBN
      publicationDate
      genre
      writer {
        id
        firstname
        lastname
      }
    }
  }
`