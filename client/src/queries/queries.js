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
  mutation($name:String!, $genre:String!, $author:String!){
    addBook(name:$name, genre:$genre, author:$author ){
      name,
      genre,
      author
    }
  }
`

const getBookQuery = gql`
   query($id:ID){
    book(id:$id){
      id
      name
      genre
      author{
        id
        name
        age
      }
      books{
        id
        name
      }
    }
   }
`

export {getAuthorQuery, getBooksQuery, addBookMutation, getBookQuery}