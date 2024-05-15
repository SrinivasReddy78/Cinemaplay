import React from 'react'
import { useState, useEffect, useContext } from 'react'
import ApiContext from '../context/APIs/apiContext';
import { Link } from 'react-router-dom';







const GenersFilter = () => {
    const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
    const [selectedType, setSelectedType] = useState('movie');
    const [genreid, setGenreId] = useState({});
    const [clickedGenres, setClickedGenres] = useState({});
    const [unselectedGenres, setUnselectedGenres] = useState([]);
    const genreData = tmdbDataMap['GenreList'] || [];
    const geners = genreData.filter(item => item.id !== 10749);
    const genreMovies = tmdbDataMap['GenreMovies'] || [];

    const fetchGeners = () => {
        const genreUrl = `https://api.themoviedb.org/3/genre/${selectedType}/list?`
        fetchTmdbData(genreUrl, 'GenreList');
    }

    const handleGenreClick = (id, name) => {
        if (!genreid[id]) {
            setGenreId({ ...genreid, [id]: name });
            setClickedGenres({ ...clickedGenres, [id]: true }); // Mark the clicked genre for styling
            setUnselectedGenres(prevGenres => prevGenres.filter(genreId => genreId !== id)); // Remove clicked genre ID from unselectedGenres
        }
    };

    const clearGenres = () => {
        setGenreId({});
        setClickedGenres({}); // Reset the clicked genres for styling
        setUnselectedGenres([]);
    }

    const genreBasedMovies = () => {
        const genreParams = Object.keys(genreid).join(',');
        const noGeners = unselectedGenres.join(',');
        const formatDate = (date) => new Date(date).toISOString().split('T')[0];
        const formattedDate = formatDate(new Date());
        // console.log(genreParams);
        // console.log(noGeners);
        const discoverUrl = `https://api.themoviedb.org/3/discover/${selectedType}?with_genres=${genreParams}&without_genres=${noGeners}&primary_release_date.lte=${formattedDate}&include_adult=false&certification.lte=G`;
        fetchTmdbData(discoverUrl, 'GenreMovies');
    }

    useEffect(() => {
        fetchGeners();
    }, [selectedType])

    useEffect(() => {
        if (Object.keys(genreid).length > 0) {
            genreBasedMovies();
        }
    }, [genreid]);

    useEffect(() => {
        // Filter out selected genres from the complete list of genres
        const unselected = genreData.filter(genre => !clickedGenres[genre.id]);
        setUnselectedGenres(unselected.map(genre => genre.id));
    }, [clickedGenres]);


    // console.log(genreData);
    // console.log(genreid);
    // console.log(clickedGenres);
    // console.log(unselectedGenres);
    // console.log(genreMovies);

    return (
        <>
            <section className='w-full px-8 text-white'>
                <div className="label flex items-center gap-4 justify-start mb-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-4 h-8 bg-elemColor"></div>
                        <div className="head text-5xl max-[320px]:text-4xl">Geners</div>
                    </div>
                    <div className="select flex gap-2 bg-zinc-950 h-12 w-40 px-2 items-center justify-around rounded-md max-[640px]:w-32">
                        <div className={`day ${selectedType === 'movie' ? 'bg-elemColor text-zinc-900' : ''} px-2 py-1 rounded-md cursor-pointer max-[640px]:text-sm`}
                            onClick={() => setSelectedType('movie')}>Movie</div>
                        <div className={`week ${selectedType === 'tv' ? 'bg-elemColor text-zinc-900' : ''} px-2 py-1 rounded-md cursor-pointer max-[640px]:text-sm`}
                            onClick={() => setSelectedType('tv')}>Tv</div>
                    </div>
                </div>

                <div className="geners-btn grid gap-2 mb-6 grid-cols-auto-9-fr max-[640px]:grid-cols-auto-7-fr" >

                    {geners.map((genre, index) => {
                        return (
                            <button key={index}
                                className={` h-10 text-center text-base font-secondFont font-medium rounded-md truncate max-[640px]:text-sm max-[640px]:font-semibold ${clickedGenres[genre.id] ? 'bg-blue-500 text-white' : 'bg-elemColor text-black'}`} onClick={() => handleGenreClick(genre.id, genre.name)}>
                                {genre.name}
                            </button>
                        )
                    })}
                    <button className=' h-10 bg-black text-center text-base font-secondFont font-medium rounded-md' onClick={clearGenres}>Clear</button>

                </div>

                <div className="Genre-movies" >

                    {Object.keys(clickedGenres).length === 0 ? (
                        <div className=" h-[768px] max-[640px]:h-[500px] flex items-center justify-center text-center">Click on any genre button to display {selectedType} of that Genre</div>
                    ) : (
                        <div className="grid gap-3 mb-6 grid-cols-auto-9-fr max-[640px]:grid-cols-auto-7-fr">
                            {genreMovies.map((movie) => {
                                const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
                                const poster = movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                    : 'https://via.placeholder.com/500x750';
                                const dateText = selectedType === 'movie' ? `Release : ${movie.release_date}` : `Aired : ${movie.first_air_date}`;
                                const Titles = selectedType === 'movie' ? `${movie.title}` : `${movie.name}`;

                                return (
                                    <div key={movie.id} className="genre-card">
                                        <Link to={`/${movie.title}/${year}`}>
                                            <div className=" rounded-md overflow-hidden ">
                                                <img className='w-full h-full object-cover mb-2' src={poster} alt={Titles} />
                                            </div>
                                            <div className=" title truncate text-center ">{Titles}</div>
                                            <div className=" release text-slate-400 text-xs text-center ">{dateText}</div></Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}














                </div>
            </section >
        </>
    )
}

export default GenersFilter 
