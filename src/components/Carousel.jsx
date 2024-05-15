import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ApiContext from '../context/APIs/apiContext';
import { Link } from 'react-router-dom';
import './Carousel.css'

const Carousel = () => {
    const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
    const sliderRef = useRef(null);

    // Access data for 'carousel' component from tmdbDataMap
    const carouselData = tmdbDataMap['carousel'];
    // Slice the data if it exists
    const slicedCarouselData = carouselData ? carouselData.slice(0, 10) : [];

    const prevSlide = () => {
        if (sliderRef.current.scrollLeft === 0) {
            sliderRef.current.scrollLeft = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
        } else {
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
        }
    };

    const nextSlide = () => {
        if (sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >= sliderRef.current.scrollWidth) {
            sliderRef.current.scrollLeft = 0;
        } else {
            sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
        }
    };

    const fetch = () => {
        fetchTmdbData('https://api.themoviedb.org/3/movie/now_playing?', 'carousel')
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 3000);

        fetch();


        return () => {
            clearInterval(intervalId);
        };

    }, []);



    return (
        <>
            <div className="slidercon w-screen h-screen select-none relative max-[640px]:h-[40vh] max-[991px]:h-[80vh]">

                <div className="slider flex overflow-x-auto " ref={sliderRef}>
                    {slicedCarouselData.map((movie, index) => {
                        const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
                        // console.log(year)
                        // let year = release_date.substring(0, 4);
                        const poster = movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                            : 'https://via.placeholder.com/1280x720';
                        return (<div key={movie.id} className="slide flex-shrink-0 w-screen h-screen relative max-[640px]:h-[40vh] max-[991px]:h-[80vh]">
                            <img className='w-full h-full object-cover object-top absolute inset-0'
                                src={poster} alt={movie.title} />
                            <div className="content absolute left-32 top-1/3 z-20 text-white flex flex-col gap-4 w-1/2 font-secondFont max-[640px]:w-3/4 max-[640px]:left-10 max-[640px]:top-[22%] max-[640px]:gap-1 max-[991px]:left-20 max-[991px]:gap-2">
                                <div className="count text-lg border-b border-yellow-300 w-32 text-center max-[991px]:text-xs max-[991px]:w-24"># {index + 1} Spotlight</div>
                                <div className="title text-5xl capitalize font-semibold max-[991px]:text-2xl max-[991px]:truncate">{movie.title}</div>
                                <div className="info flex gap-3 max-[991px]:text-xs max-[991px]:gap-2">
                                    <div className="type">Movie</div>
                                    <div className="year">{movie.release_date}</div>
                                    <div className="popularity">Popularity : {movie.popularity}</div>
                                </div>
                                <div className="des max-[991px]:text-xs max-[991px]:line-clamp-2">{movie.overview}</div>
                                <div className="btns flex gap-5 mt-2">
                                    <button className='px-2 py-1 bg-red-500 text-slate-200 rounded-sm max-[991px]:text-sm'>Watch Now</button>
                                    <Link  to={`/${movie.title}/${year}`}>
                                        <button className='px-2 py-1 bg-red-500 text-slate-200 rounded-sm max-[991px]:text-sm'>Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}


                </div>
                {/* Navigation Buttons */}
                <button className="prev-btn absolute top-1/2 left-2 z-20 transform -translate-y-1/2 bg-zinc-600 bg-opacity-30 text-zinc-400 hover:bg-opacity-100 hover:text-white px-3 py-3 rounded-sm" onClick={prevSlide}>
                    <FaChevronLeft />
                </button>
                <button className="next-btn absolute top-1/2 right-2 z-20 transform -translate-y-1/2 bg-zinc-600 bg-opacity-30 text-zinc-400 hover:bg-opacity-100 hover:text-white px-3 py-3 rounded-sm" onClick={nextSlide}>
                    <FaChevronRight />
                </button>

            </div>


        </>
    )
}

export default Carousel



