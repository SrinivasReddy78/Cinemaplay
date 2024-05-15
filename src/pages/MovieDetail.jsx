import React, { useState, useEffect, useContext } from 'react'
import ApiContext from '../context/APIs/apiContext';
import { useParams } from "react-router-dom";
import { BounceLoader } from 'react-spinners';
import { IoStar, IoStarHalf } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { FaInstagram, FaXTwitter, FaReddit, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { Link } from 'react-router-dom';
// import {  } from "react-icons/fa6";

// Movie Detail Component

const MovieDetail = () => {
  const { title, year } = useParams();
  const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
  const movieTitle = title.replace(/_/g, ' '); // Replace underscores with spaces
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [movieData, setMovieData] = useState([]);
  const [hoveredStars, setHoveredStars] = useState(0);
  const names = ['Bad', 'Average', 'Fine', 'Good', 'Masterpiece'];
  const nameIndex = Math.floor(hoveredStars); // Get the integer part of the hovered stars
  const nameFraction = hoveredStars - nameIndex; // Get the fractional part of the hovered stars
  const name = `${names[nameIndex - 1]}${nameFraction > 0 ? ` (${hoveredStars} stars)` : ''}`;
  const similarMovieData = tmdbDataMap['SimilarMovies'] || [];
  const [imdbID, setImdbID] = useState(null)

  const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;
  const omdbApiUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${movieTitle}&y=${year}`;

  const fetchOmdbData = async () => {
    try {
      const response = await fetch(omdbApiUrl);
      const data = await response.json();
      console.log('OMDB API Data:', data);
      if (data && data.Response === "True") {
        setMovieData(data);
        setImdbID(data.imdbID)
      } else {
        throw new Error('OMDB API Error:', data.Error);
      }
    } catch (error) {
      throw new Error('Error fetching data:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);

      }, 1000);
    }
  }

  const fetchSimilarMovies = async () => {
    // console.log(`infunc imdbId = ${imdbID}`);
    const type = movieData.Type == 'movie' ? 'movie' : 'tv';
    // console.log(type);
    const similarUrl = `https://api.themoviedb.org/3/${type}/${imdbID}/similar?&language=en-US`;
    fetchTmdbData(similarUrl, 'SimilarMovies');
  }


  const handleStarHover = (starIndex) => {
    setHoveredStars(starIndex + 1); // Add 1 to starIndex to get the number of hovered stars
  };

  const handleStarLeave = () => {
    setHoveredStars(0); // Reset hovered stars when mouse leaves the stars
  };



  useEffect(() => {
    fetchOmdbData();
  }, [movieTitle]);

  useEffect(() => {
    if (imdbID) {
      fetchSimilarMovies();
    }
  }, [imdbID])


  // console.log(movieData);
  // console.log(similarMovieData);

  const runtime = movieData.Type === 'movie' ? ` ${movieData.Runtime}` : `Total Seasons : ${movieData.totalSeasons}`;
  return (
    <>
      {isLoading ? ( // Show loader if isLoading is true
        <div className="loader w-screen h-screen flex flex-col items-center justify-center">
          <div className="loader-icon"><BounceLoader color='#dadada' /></div>
          <div className="text-white text-2xl mt-4">Loading...</div>
        </div>
      ) : (
        <section className="w-full text-white font-secondFont mt-24 px-8">

          <div className="movieInfo flex gap-8 mb-6 border-b-2 w-full pb-4 items-center justify-around max-[640px]:flex-col max-[991px]:flex-col">

            <div className="infoPoster rounded-md overflow-hidden w-[300px] h-[447px] max-[991px]:w-[300px] max-[1024px]:w-[500px]">
              <img className='w-full h-full object-cover' src={movieData.Poster} alt={movieData.Title} />
            </div>

            <div className="infoDetails flex flex-col items-start gap-3 max-[640px]:pl-4">
              <div className="">
                <h1 className="text-2xl font-bold underline underline-offset-4 decoration-1 decoration-yellow-400 mb-2" >{movieData.Title}</h1>
                <div className="details flex gap-4 text-lg text-zinc-400 max-[640px]:text-sm">
                  <p>{movieData.Type}</p>
                  <p>{movieData.Year}</p>
                  <p>{runtime}</p>
                </div>
              </div>
              <div className="country ">Language : <span className='text-zinc-400 pl-4'>{movieData.Language}</span></div>
              <div className="director ">Director : <span className='text-zinc-400 pl-4'>{movieData.Director}</span></div>
              <div className="genre ">Genre : <span className='text-zinc-400 pl-4'>{movieData.Genre}</span></div>
              <div className="genre ">Released : <span className='text-zinc-400 pl-4'>{movieData.Released}</span></div>
              <div className="actors ">Actors : <span className='text-zinc-400 pl-4'>{movieData.Actors}</span></div>
              <div className="collec ">Box Office : <span className='text-zinc-400 pl-4'>{movieData.BoxOffice || 'N/A'}</span></div>
              <div className="collec ">Writers : <span className='text-zinc-400 pl-4'>{movieData.Writer}</span></div>
              <div className="ratings flex gap-3 mt-4 max-[640px]:text-xs">
                <div className="imdb px-2 py-1 border rounded">IMDB : {movieData.imdbRating}</div>
                <div className="imdb px-2 py-1 border rounded">
                  Rotten Tomatoes:{' '}
                  {movieData.Ratings && movieData.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes')
                    ? movieData.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes').Value
                    : 'N/A'}
                </div>
              </div>
            </div>

            <div className="rate-share flex flex-col gap-6 items-center justify-evenly max-[640px]:flex-col max-[991px]:flex-row">
              <div className="custom-rating flex flex-col items-center justify-center  border ">
                <div className="rating-text text-lg p-1">Rate this movie</div>
                <div className="stars flex gap-2 border-t-2 p-2 w-full" onMouseLeave={handleStarLeave}>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    let starIcon = <IoIosStarOutline />;
                    if (hoveredStars >= starValue) {
                      starIcon = <IoStar />;
                    } else if (hoveredStars + 0.5 === starValue) {
                      starIcon = <IoStarHalf />;
                    }
                    return (
                      <div
                        key={index}
                        className="star text-4xl "
                        onMouseEnter={() => handleStarHover(index)}
                      >
                        {starIcon}
                      </div>
                    );
                  })}
                </div>
                <div className="rate-info text-center border-t-2 w-full p-2">
                  <div className="label ">{name}</div>
                </div>
              </div>


              <div className="share">
                <div className="share-text text-lg p-1">Share this movie</div>
                <div className="share-icons flex gap-2 p-2 ">
                  <div className="share-icon px-10 py-2 text-2xl bg-blue-400 cursor-pointer hover:-translate-y-2 rounded-sm transition-transform max-[640px]:px-8"><FaFacebook /> </div>
                  <div className="share-icon px-10 py-2 text-2xl bg-zinc-950 cursor-pointer hover:-translate-y-2 rounded-sm transition-transform max-[640px]:px-8"><FaXTwitter /></div>
                  <div className="share-icon px-10 py-2 text-2xl bg-teal-500 cursor-pointer hover:-translate-y-2 rounded-sm transition-transform max-[640px]:px-8"><FaInstagram /></div>
                </div>
                <div className="share-icons flex gap-2 p-2">
                  <div className="share-icon px-10 py-2 text-2xl bg-green-500 cursor-pointer hover:-translate-y-2 rounded-sm transition-transform max-[640px]:px-8"><FaWhatsapp /></div>
                  <div className="share-icon px-10 py-2 text-2xl bg-orange-500 cursor-pointer hover:-translate-y-2 rounded-sm transition-transform max-[640px]:px-8"><FaReddit /></div>
                </div>
              </div>


            </div>

          </div>

          <div className="des flex items-center justify-center mb-6">
            <p className='outline-dotted outline-elemColor text-lg p-3 w-10/12 md:w-4/6 md:text-2xl'>{movieData.Plot}</p>
          </div>

          <div className="similar-movies">
            <div className="label flex gap-4 items-center mb-6">
              <div className="label-line w-4 h-10 bg-elemColor max-[640px]:h-8"></div>
              <div className="label-text text-3xl md:text-5xl">Similar Movies</div>
            </div>

            <div className="similar grid gap-3 mb-6 grid-cols-auto-12-fr max-[640px]:grid-cols-auto-7-fr">
              {similarMovieData.length === 0 ? (
                <div className="w-full h-60 flex items-center justify-center">
                  <p>No Similar {movieData.Type} found</p>
                </div>
              ) : (
                similarMovieData.map(movie => {
                  const year = movie.release_date.slice(0, 4)
                  const poster = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750';

                  return (
                    <div key={movie.id} className="card">
                      <Link to={`/${movie.title}/${year}`}> <div className="rounded-md overflow-hidden mb-2">
                        <img className='w-full h-full object-cover'
                          src={poster} alt={movie.name} />
                      </div>
                        <div className="title truncate text-xl text-center  max-[640px]:text-sm">{movie.title}</div>
                        <div className="release text-slate-400 text-xs text-center">Release : {movie.release_date}</div></Link>
                    </div>
                  )
                })
              )}

            </div>

          </div>


        </section>
      )}
    </>
  )
}

export default MovieDetail