import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const { data, loading } = useQuery(getAuthorQuery);
    const [addBook] = useMutation(addBookMutation, {
        refetchQueries : mutationResult => [{ query:getBooksQuery }]
    });
   

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
        addBook({ variables: { type: name, type: genre, type: author }})
    }

    const handleBookName = (e) => {
        setName(e.target.value)
    }
    const handGenre = (e) => {
        setGenre(e.target.value)
    }
    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }

    return ( 
            <form id="form" onSubmit={submitForm}>

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
                <select value={author} onChange={handleAuthor}>
                    <option>--Select Author--</option>
                    {displayAuthors}
                </select>
               </div>

               <button>+</button>
            </form>
     
     );
}
 
export default AddBook;
