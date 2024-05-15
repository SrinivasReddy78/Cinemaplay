import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../context/APIs/apiContext';




const Movies = () => {

    const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
    const moviesData = tmdbDataMap['MoviesRow'] || [];


    const fetchTvShows = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const minDate = new Date(new Date(currentDate).getTime() - (14 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        // console.log(currentDate,minDate);        
        const TvUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&first_air_date.gte=${minDate}&first_air_date.lte=${currentDate}&with_original_language=en&page=1`;
        fetchTmdbData(TvUrl, 'MoviesRow');
    }

    useEffect(() => {
        fetchTvShows()
    }, [])







    return (
        <>
            <section className='w-full px-8 text-white'>
                <div className="label flex items-center justify-between mb-6 font-firstFont">
                    <div className="flex justify-center items-center gap-4">
                        <div className="w-4 h-8 bg-elemColor max-[640px]:h-6"></div>
                        <div className="head text-4xl max-[640px]:text-xl">Latest Movies</div>
                    </div>
                    <Link to={'/movies'}>
                        <div className="more text-xl cursor-pointer max-[640px]:text-xs">See All  &gt; </div>
                    </Link>
                </div>

                <div className="tvRow mb-6 flex font-secondFont items-center gap-4 overflow-x-scroll max-[640px]:gap-3">


                    {moviesData.map(movie => {

                        const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
                        const poster = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : 'https://via.placeholder.com/500x750';

                        return (
                            <div key={movie.id} className="card">
                                <Link to={`/${movie.title}/${year}`}>
                                <div className="card w-52 h-80 overflow-hidden flex-shrink-0 mb-2 max-[640px]:w-40 max-[640px]:h-60 max-[320px]:w-36 max-[320px]:h-56">
                                    <img className='w-full h-full object-cover mb-2 rounded-md'
                                        src={poster} alt={movie.title} />
                                </div>
                                <div className="flex flex-col pl-2 overflow-hidden w-52 max-[640px]:w-40 max-[320px]:w-36">
                                    <div className="title truncate text-center">{movie.title}</div>
                                    <div className="release text-slate-400 text-xs text-center">{movie.release_date}</div>
                                </div>
                                </Link>
                            </div>
                        )
                    })}

                </div>



            </section >
        </>
    )
}

export default Movies
