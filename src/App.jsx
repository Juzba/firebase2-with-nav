import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarShared from './pages/NavbarShared';
import Home from './pages/Home';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import Error from './pages/Error';
import MovieInfo from './pages/MovieInfo';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavbarShared />}>
                    <Route index element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/addmovie" element={<AddMovie />} />
                    <Route path="/movieinfo/:id" element={<MovieInfo />} />
                    <Route path="/*" element={<Error />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
