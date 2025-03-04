import { Link } from 'react-router-dom';
import Loading from './page_components/Loading';
import './Page_scss/Movies.scss';
import { firestoreDB } from '../firebase/config';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const Movies = () => {
    const [error, setError] = useState('');
    const [dataDB, setDataDB] = useState([]);

    const DeleteMovie = async (id) => {
        await deleteDoc(doc(firestoreDB, 'movies_two', id));
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(firestoreDB, 'movies_two'), (snapshot) => {
            if (snapshot.empty) {
                setError('Databáze je prázdná');
                setDataDB([]);
            } else {
                let newData = [];
                snapshot.docs.forEach((oneDoc) => {
                    newData.push({ id: oneDoc.id, ...oneDoc.data() });
                });
                setDataDB(newData);
                setError('');
            }
        });
        return () => unsub();
    }, []);

    return (
        <section className="movies">
            <h1>Movies</h1>
            {dataDB.length > 0 && !error ? (
                dataDB.map(({ id, title }) => {
                    return (
                        <div key={id} className="one-movie">
                            <h3>{title}</h3>
                            <div>
                                <Link to={`/movieinfo/${id}`}>Více informací</Link>
                                <button onClick={() => DeleteMovie(id)}>Smazat</button>
                            </div>
                        </div>
                    );
                })
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Loading />
            )}
        </section>
    );
};

export default Movies;
