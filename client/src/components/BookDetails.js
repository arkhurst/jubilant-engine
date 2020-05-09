import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

const BookDetails = (props) => {
    
    const {data, loading} = useQuery(getBookQuery,{
        onCompleted:(props) =>{
            return{
                variables:{
                    id:props.bookID
                }
            }
        }
    })
    return ( 
        <div id="book-details">
            <p>Output Book details...</p>
        </div>
     );
}
 
export default BookDetails