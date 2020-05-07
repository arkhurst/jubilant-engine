import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAuthorQuery } from '../queries/queries';

const AddBook = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorID, setAuthorID] = useState('');
    const { data, loading, error } = useQuery(getAuthorQuery);

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
        console.log(authorID)
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
                <input type="text" onChange={handleBookName} />
               </div>
               
               <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={handGenre} />
               </div>

               <div className="field">
                <label>Author:</label>
                <select onChange={handleAuthor}>
                    <option>--Select Author--</option>
                    {displayAuthors}
                </select>
               </div>

               <button>+</button>
            </form>
     
     );
}
 
export default AddBook;
