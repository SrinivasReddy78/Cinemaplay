import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { BounceLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import ApiContext from '../context/APIs/apiContext';





const MoviesPage = () => {
  const { tmdbDataMap, fetchTmdbData } = useContext(ApiContext);
  const AllMoviesData = tmdbDataMap['AllMovies'] || [];
  const [currentPage, setCurrentPage] = useState(1);
  const AllPages = tmdbDataMap['AllMovies_totalPages'] || [];
  const first50Pages = Array.from({ length: 50 }, (_, index) => index + 1);
  const limitedPages = first50Pages.slice(0, AllPages.length);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = limitedPages.length;

  const fetchMovies = () => {
    const AllMoviesurl = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_original_language=en&page=${currentPage}`
    fetchTmdbData(AllMoviesurl, 'AllMovies');
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderButtons = () => {
    const visibleButtons = 5; // Number of visible page buttons
    const start = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
    const end = Math.min(start + visibleButtons - 1, totalPages);

    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-12 h-10 bg-elemColor roundeded text-xl text-black max-[640px]:w-10 max-[640px]:h-8 ${currentPage === i ? 'bg-elemColor2 text-white' : ''}`}
        >
          {i}
        </button>
      );
    }

    // if (start > 1) {
    //   buttons.unshift(
    //     <span key="startEllipsis" className=" text-white">
    //       ...
    //     </span>
    //   );
    // }

    if (end < totalPages) {
      buttons.push(
        <span key="endEllipsis" className=" text-white text-xl">
          .......
        </span>
      );
    }

    return buttons;
  };


  useEffect(() => {
    fetchMovies();
  }, [currentPage])


  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [])


  // console.log(AllMoviesData);
  // console.log(AllPages,limitedPages);




  return (
    <>
      <div className="w-full text-secondColor flex flex-col mt-24 px-8 font-secondFont">
        <div className="label flex items-center justify-center gap-2 mb-6">
          <div className="line w-1/4 h-[2px] bg-elemColor"></div>
          <h1 className='text-4xl max-[640px]:text-2xl'>All Movies</h1>
          <div className="line w-1/4 h-[2px] bg-elemColor"></div>
        </div>

        <div className="movie grid gap-3 mb-6 grid-cols-auto-13-fr max-[640px]:grid-cols-auto-7-fr">
          {isLoading ? (
            <div className="loader w-[95vw] h-screen flex flex-col items-center justify-center">
              <div className="loader-icon"><BounceLoader color='#dadada' /></div>
              <div className="text-white text-2xl mt-4">Loading...</div>
            </div>
          ) : (
            !AllMoviesData ? (
              <p className='text-center'>No Movies Found</p>
            ) : (
              AllMoviesData.map((movie, index) => {
                const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
                const poster = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750';
                return (
                  <div key={movie.id} className="card">
                    <Link to={`/${movie.title}/${year}`}>
                      <div className=" h-auto rounded-md overflow-hidden mb-2">
                        <img className='w-full h-full object-cover'
                          src={poster} alt={movie.name} />
                      </div>
                      <div className="title truncate text-xl text-center  max-[640px]:text-sm">{movie.title}</div>
                      <div className="release text-slate-400 text-xs text-center">Release : {movie.release_date}</div>
                    </Link>
                  </div>
                )
              })
            )
          )}
        </div>

        <div className="pagenos flex gap-2 items-center justify-center mb-6">
          <button onClick={handlePrevClick} disabled={currentPage === 1} className="w-10 h-10 text-xl text-center bg-elemColor text-black rounded-full  max-[640px]:w-8 max-[640px]:h-8">
            &lt;
          </button>

          {renderButtons()}

          <button onClick={handleNextClick} disabled={currentPage === totalPages} className="w-10 h-10 text-xl text-center bg-elemColor text-black rounded-full  max-[640px]:w-8 max-[640px]:h-8">
            &gt;
          </button>
        </div>

      </div>
    </>
  )
}

export default MoviesPage
