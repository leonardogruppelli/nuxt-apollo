import gql from "graphql-tag";

export const LIST = gql`
  query {
    allBooks {
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