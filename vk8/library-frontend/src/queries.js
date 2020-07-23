const { gql } = require("@apollo/client")



export const AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`

export const BOOKS = gql`
  query {
    allBooks {
        title,
        author,
        published
    }
  }
`


export const NEW_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`
