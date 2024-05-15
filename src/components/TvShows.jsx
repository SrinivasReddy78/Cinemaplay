import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../context/APIs/apiContext';




const TvShows = () => {
    const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
    const TvshowData = tmdbDataMap['TvShows'] || [];
    const filteredShows = TvshowData.filter(show => show.genre_ids.length > 0);


    const fetchTvShows = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const minDate = new Date(new Date(currentDate).getTime() - (14 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        // console.log(currentDate,minDate);        
        const TvUrl = `https://api.themoviedb.org/3/discover/tv?language=en-US&first_air_date.gte=${minDate}&first_air_date.lte=${currentDate}&with_original_language=en&page=1`;
        fetchTmdbData(TvUrl, 'TvShows');
    }

    useEffect(() => {
        fetchTvShows()
    }, [])

    // console.log(filteredShows);

    return (
        <>
            <section className='w-full px-8 text-white'>
                <div className="label flex items-center justify-between gap-2 mb-6 font-firstFont">
                    <div className="flex justify-center items-center gap-4">
                        <div className="w-4 h-8 bg-elemColor max-[640px]:h-6"></div>
                        <div className="head text-4xl max-[640px]:text-xl">Latest Tv Shows</div>
                    </div>
                    <Link to={'/series'}>
                        <div className="more text-xl cursor-pointer max-[640px]:text-xs">See All  &gt; </div>
                    </Link>
                </div>

                <div className="tvRow mb-6 flex font-secondFont items-center gap-4 overflow-x-scroll max-[640px]:gap-3">


                    {filteredShows.map(show => {
                        const year = show.first_air_date.slice(0, 4)
                        const poster = show.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                            : 'https://via.placeholder.com/500x750';

                        return (
                            <Link className='' key={show.id} to={`/${show.name}/${year}`}>
                                <div className="card w-52 h-80 overflow-hidden flex-shrink-0 mb-2 max-[640px]:w-40 max-[640px]:h-60 max-[320px]:w-36 max-[320px]:h-56">
                                    <img className='w-full h-full object-cover mb-2 rounded-md'
                                        src={poster} alt={show.name} />
                                </div>
                                <div className="flex flex-col pl-2 overflow-hidden w-52 max-[640px]:w-40 max-[320px]:w-36">
                                    <div className="title truncate text-center">{show.name}</div>
                                    <div className="release text-slate-400 text-xs text-center">{show.first_air_date}</div>
                                </div>
                            </Link>
                        )
                    })}

                </div>



            </section>
        </>
    )
}

export default TvShows
