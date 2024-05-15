import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import ApiContext from '../context/APIs/apiContext';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home';



const SearchSuggestion = () => {
    const data = useContext(ApiContext);
    const searchRef = useRef(null)
    const suggestionRef = useRef(null);
    const [suggestionOpen, setSuggestionOpen] = useState(false)


    const openSearch = () => {
        document.querySelector('nav').classList.remove('active')
        document.querySelector('.profile').classList.remove('active')
    }

    const handleSearchChange = (e) => {
        let search = e.target.value;
        if (search.length > 1) {
            setSuggestionOpen(true)
            data.setSearchQuery(search);
        }
        else {
            setSuggestionOpen(false)
            data.setSearchQuery('');
        }
    }

    const handleItemClick = () => {
        data.setOpenSearchBar(false);
        setSuggestionOpen(false);
    };


    useEffect(() => {
        const handleCloseSearch = (e) => {
            if (
                (searchRef.current && !searchRef.current.contains(e.target)) &&
                (suggestionRef.current && !suggestionRef.current.contains(e.target)) ||
                e.key === 'Escape'
            ) {
                data.setOpenSearchBar(false);
                setSuggestionOpen(false);
            }
        };

        openSearch();

        document.addEventListener('mousedown', handleCloseSearch);
        document.addEventListener('keydown', handleCloseSearch);
        return () => {
            document.removeEventListener('mousedown', handleCloseSearch);
            document.removeEventListener('keydown', handleCloseSearch);
        };
    }, []);






    return (
        <>

            {data.openSearchBar && (
                <div className="fixed top-0 left-0 z-[100] w-screen h-screen bg-zinc-800 backdrop-blur-sm bg-opacity-50" >
                    <div className="search w-full flex flex-col relative justify-center items-center top-28">
                        <input ref={searchRef} autoFocus type="text" onChange={handleSearchChange} className='w-1/2 py-1 px-2 rounded-sm text-black outline-none border-none max-[991px]:w-11/12' placeholder='Search Here' />
                        {suggestionOpen && (
                            <div ref={suggestionRef} className="suggestions w-1/2 my-2 relative z-[1000] bg-white text-black max-[991px]:w-11/12">
                                <div className='flex flex-col h-80 overflow-y-scroll shadow-sm shadow-zinc-400'>

                                    {Array.isArray(data.omdbData?.Search) && data.omdbData.Search.map(item => {


                                        const url = `/${item.Title}/${item.Year}`;

                                        return (
                                            <Link key={item.imdbID} to={url} onClick={handleItemClick}>
                                                <div className="item flex gap-4 w-full px-3 py-1 border-b border-b-gray-500 items-start justify-evenly cursor-pointer" >
                                                    <img className='w-14 h-14 object-cover object-center' src={item.Poster} alt="" />
                                                    <div className='w-full overflow-hidden'>
                                                        <div className='title text-base text-ellipsis'>{item.Title}</div>
                                                        <div className='text-md text-zinc-500'>{item.Type}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )

                                    })}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            )}
        </>
    )
}

export default SearchSuggestion
