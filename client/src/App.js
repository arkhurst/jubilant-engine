import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {

  const client = new ApolloClient({
    uri:'http://localhost:4000/graphql/'
  })
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}



export default App;
