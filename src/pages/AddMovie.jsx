import { useState } from 'react';
import './Page_scss/AddMovie.scss';
import { firestoreDB } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [minage, setMinAge] = useState('');
    const [time, setTime] = useState('');

    const [text, setText] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        if (title && minage && time) {
            console.log(`${title} ${minage} ${time}`);
            await addDoc(collection(firestoreDB, 'movies_two'), { title, minage, time });

            setTitle('');
            setMinAge('');
            setTime('');
            setText('Film uspěšně přidán do DB.');
        } else {
            setText('Vyplň všechny položky.');
        }
    };

    return (
        <section className="add-movie">
            <h1>Přidání filmů</h1>

            <form onSubmit={submitForm}>
                <p>{text}</p>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Název filmu"
                    type="text"
                    id="userName"
                    name="userName"
					autoComplete='off'
                />
                <input
                    value={minage}
                    min={0}
                    max={1000}
                    onChange={(e) => setMinAge(e.target.value)}
                    placeholder="Minimální věk"
                    type="number"
                    id="minage"
                    name="minage"
                />
                <input
                    value={time}
                    min={0}
                    max={1000}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Čas filmu"
                    type="number"
                    id="time"
                    name="time"
                />
                <input value="Přidat film" type="submit" />
            </form>
        </section>
    );
};

export default AddMovie;
