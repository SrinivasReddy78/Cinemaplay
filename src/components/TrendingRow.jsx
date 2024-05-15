import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ApiContext from '../context/APIs/apiContext';
import { Link } from 'react-router-dom';

const TrendingRow = () => {
  const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
  const [selectedType, setSelectedType] = useState('movie');
  const [day, setDay] = useState('day')


  // Access data for 'carousel' component from tmdbDataMap
  const trendingData = tmdbDataMap['Trending'];

  // Slice the data if it exists
  const slicedTrendingData = trendingData ? trendingData.slice(0, 10) : [];


  useEffect(() => {
    const fetchUrl = `https://api.themoviedb.org/3/trending/${selectedType}/${day}?`;
    fetchTmdbData(fetchUrl, 'Trending');
  }, [selectedType, day]);


// const prevSlide = () => {
  
// }

// const nextSlide = () => {

// }




  return (
    <>
      <div className="label flex items-center justify-start gap-10 font-firstFont text-white px-8 my-6 max-[640px]:gap-4 max-[640px]:flex-col">
        <div className="head flex items-center gap-3">
          <div className="w-4 h-8 rounded-sm bg-elemColor"></div>
          <div className="heading text-5xl max-[640px]:text-4xl">Trending</div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="select flex gap-2 bg-zinc-950 h-12 w-40 px-2 items-center justify-around rounded-md max-[640px]:w-32">
            <div className={`day cursor-pointer px-2 py-1 rounded-md ${day === 'day' ? 'bg-elemColor text-zinc-900' : ''} max-[640px]:text-sm`}
              onClick={() => setDay('day')}>Day</div>
            <div className={`week cursor-pointer px-2 py-1 rounded-md ${day === 'week' ? 'bg-elemColor text-zinc-900' : ''} max-[640px]:text-sm`}
              onClick={() => setDay('week')}>Week</div>
          </div>
          <div className="select flex gap-2 bg-zinc-950 h-12 w-40 px-2 items-center justify-around rounded-md max-[640px]:w-32">
            <div className={`day ${selectedType === 'movie' ? 'bg-elemColor text-zinc-900' : ''} px-2 py-1 rounded-md cursor-pointer max-[640px]:text-sm`}
              onClick={() => setSelectedType('movie')}>Movie</div>
            <div className={`week ${selectedType === 'tv' ? 'bg-elemColor text-zinc-900' : ''} px-2 py-1 rounded-md cursor-pointer max-[640px]:text-sm`}
              onClick={() => setSelectedType('tv')}>Tv</div>
          </div>
        </div>
      </div>

      <div className="row w-[95%] flex gap-5 overflow-x-auto mx-8 h-[21.5rem] p-1 text-secondColor font-secondFont mb-4 max-[640px]:mx-auto max-[640px]:h-[19rem]">

        {slicedTrendingData.map((movie, index) => {
          const year = selectedType === 'movie'
          ? movie.release_date ? movie.release_date.slice(0, 4) : ''
          : movie.first_air_date ? movie.first_air_date.slice(0, 4) : '';
          const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'https://via.placeholder.com/500x750';
          const dateText = selectedType === 'movie' ? `Release : ${movie.release_date}` : `Aired : ${movie.first_air_date}`;
          const Titles = selectedType === 'movie' ? `${movie.title}` : `${movie.name}`;

          return (
            <Link  key={movie.id} to={`/${Titles}/${year}`}>
            <div className="card w-56 h-72 flex-shrink-0 relative max-[640px]:w-40 max-[640px]:h-60 max-[320px]:w-36 max-[320px]:h-56">
              <img className='w-full h-full object-cover mb-2'
                src={poster} alt={Titles} />
              <div className="flex flex-col pl-2 overflow-hidden">
                <div className="title truncate text-center">{Titles}</div>
                <div className="release text-slate-400 text-xs text-center">{dateText}</div>
              </div>
              <div className="num absolute top-2 left-2 bg-elemColor text-black w-10 h-10 text-xl rounded-md flex items-center justify-center max-[640px]:text-lg max-[640px]:w-8 max-[640px]:h-8">{index + 1}</div>
              <div className="absolute bottom-2 right-2 bg-elemColor text-black w-10 h-10 flex items-center justify-center rounded-full">
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
            </Link>
          )
        })}

        {/* Navigation Buttons
        <button className="prev-btn absolute top-[40%] left z-20 transform -translate-y-[40%] bg-zinc-600 bg-opacity-30 text-zinc-400 hover:bg-opacity-100 hover:text-white px-3 py-3 rounded-sm" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="next-btn absolute top-[40%] right-0 z-20 transform -translate-y-[40%] bg-zinc-600 bg-opacity-30 text-zinc-400 hover:bg-opacity-100 hover:text-white px-3 py-3 rounded-sm" onClick={nextSlide}>
          <FaChevronRight />
        </button> */}
      </div>
    </>
  )
}


export default TrendingRow
