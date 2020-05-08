import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getBooksQuery } from '../queries/queries';

const BookList = () => {

    const { loading, error, data} = useQuery(getBooksQuery);

    let displayBooks
      if(loading) { 
          displayBooks = (
            <p>Loading Books...</p>
          )
      } else if(!loading) {
          displayBooks = (
            data.books.map(({id , name,}) => (
                <div key={id}>
                    <li>{name}</li>
                </div>
            ))
            ) 
        } else {
            displayBooks = (
                <p>Could not retrieve data...</p>
            )
        }  
        
    return ( 
        <div>
            <ul id="book-list">
                {displayBooks}
            </ul>
        </div>
     );
}
 
export default BookList;