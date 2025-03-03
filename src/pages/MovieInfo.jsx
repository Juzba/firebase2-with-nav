import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestoreDB } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import Loading from './page_components/Loading';
import './Page_scss/MovieInfo.scss';

const MovieInfo = () => {
    const [movieInfo, setMovieInfo] = useState(false);
    const [error, setError] = useState('');
    console.log(movieInfo);

    const { id } = useParams();

    useEffect(() => {
        const unsub = onSnapshot(
            collection(firestoreDB, 'movies_two'),
            (snapshot) => {
                const oneMovie = snapshot.docs.find((oneDoc) => {
                    return oneDoc.id == id;
                });
                if (oneMovie) {
                    setMovieInfo(oneMovie.data());
                    setError('');
                } else {
                    setError('Film Nenalezen.');
                    setMovieInfo(false);
                }
            },
            (err) => setError(err.message)
        );

        return () => unsub();
    }, [id]);

    return (
        <section className="movie-info">
            <h1>Movie Info</h1>
            {movieInfo && !error ? (
                <div className="movie-card">
                    <h2>{movieInfo.title}</h2>
                    <table>
                        <tr>
                            <th className='left'>Dostupné od věku:</th>
                            <th className='right'>{"+" + movieInfo.minage}</th>
                        </tr>
                        <tr>
                            <th className='left'>Délka filmu:</th>
                            <th className='right'>{movieInfo.time + " min"}</th>
                        </tr>
                    </table>

                    {/* <p>{`Dostupné od věku: +${movieInfo.minage}.`}</p>
                    <p>{`Délka filmu: ${movieInfo.time}min.`}</p> */}
                    <Link to={'/movies'}>Návrat na stránku Movies.</Link>
                </div>
            ) : (
                <div>{error ? <p>{error}</p> : <Loading />}</div>
            )}
        </section>
    );
};

export default MovieInfo;
