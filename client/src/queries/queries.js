import { gql } from 'apollo-boost';

const getAuthorQuery = gql`
  {
      authors{
          name,
          id
      }
  }
`

const getBooksQuery = gql`
  {
      books{
          name,
          id
      }
  }
`
const addBookMutation = gql`
  mutation addBook($name:String!, $genre:String!, $authorID:String!){
    addBook(name:$name, genre:$genre, authorID:$authorID)
  }
`

export {getAuthorQuery, getBooksQuery, addBookMutation}