import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorQuery, addBookMutation } from '../queries/queries';

const AddBook = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorID, setAuthorID] = useState('');
    const { data, loading, error } = useQuery(getAuthorQuery);
    const [addBook] = useMutation(addBookMutation);
   

    let displayAuthors
    if (loading) {
        displayAuthors = (
            <option disabled>Loading Authors...</option>
        )
        
    }else if(!loading){
        displayAuthors=(
            data.authors.map(({id, name}) => (
                <option key={id} value={id} >{name}</option>
            ))
        )
    }else{
        displayAuthors=(
            <p>Could not fetch authors...</p>
        )
    }

    const submitForm = (e) => {
        e.preventDefault()
        addBook({ variables: { name, genre, authorID }})
    }

    const handleBookName = (e) => {
        setName(e.target.value)
    }
    const handGenre = (e) => {
        setGenre(e.target.value)
    }
    const handleAuthor = (e) => {
        setAuthorID(e.target.value)
    }

    return ( 
            <form id="addBooks" onSubmit={submitForm}>

               <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={handleBookName} />
               </div>
               
               <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={handGenre} />
               </div>

               <div className="field">
                <label>Author:</label>
                <select value={authorID} onChange={handleAuthor}>
                    <option>--Select Author--</option>
                    {displayAuthors}
                </select>
               </div>

               <button>+</button>
            </form>
     
     );
}
 
export default AddBook;
