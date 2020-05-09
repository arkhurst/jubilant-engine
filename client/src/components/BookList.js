import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {

    const { loading, error, data} = useQuery(getBooksQuery);
    const [ selected, setSelected ] = useState(null)

    let displayBooks
      if(loading) { 
          displayBooks = (
            <p>Loading Books...</p>
          )
      } else if(!loading) {
          displayBooks = (
            data.books.map(({id , name,}) => (
                <div key={id}>
                    <li onClick={(e) => {setSelected(id)}} >{name}</li>
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
            <BookDetails bookID={selected} />
        </div>
     );
}
 
export default BookList;