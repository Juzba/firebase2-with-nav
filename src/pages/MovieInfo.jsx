import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestoreDB } from '../firebase/config';
import { collection, getDoc, doc } from 'firebase/firestore';
import Loading from './page_components/Loading';
import './Page_scss/MovieInfo.scss';

const MovieInfo = () => {
    const [movieInfo, setMovieInfo] = useState(false);
    const [error, setError] = useState('');

    const { id } = useParams();

    useEffect(() => {
        getDoc(doc(firestoreDB, 'movies_two', id))
            .then(
                (docSnap) => {
                    if (docSnap.exists()) {
                        setMovieInfo(docSnap.data());
                        setError('');
                    } else {
                        setError('Film Nenalezen.');
                        setMovieInfo(false);
                    }
                }
            )
            .catch((err) => console.log(err.message));
    }, [id]);

    return (
        <section className="movie-info">
            <h1>Movie Info</h1>
            {movieInfo && !error ? (
                <div className="movie-card">
                    <h2>{movieInfo.title}</h2>

                    <table>
                        <thead>
                            <tr>
                                <th className="left">Dostupné od věku:</th>
                                <th className="right">{movieInfo.minage + ' let'}</th>
                            </tr>
                            <tr>
                                <th className="left">Délka filmu:</th>
                                <th className="right">{movieInfo.time + ' min'}</th>
                            </tr>
                        </thead>
                    </table>
                    <Link to={'/movies'}>Návrat na stránku Movies.</Link>
                </div>
            ) : (
                <div>{error ? <p>{error}</p> : <Loading />}</div>
            )}
        </section>
    );
};

export default MovieInfo;
