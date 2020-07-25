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
        author {
          name
        },
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
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editA($name: String!, $born: Int!) {
      editAuthor(
          name: $name
          setBornTo: $born
      ) {
          name
          born
      }
  }
`