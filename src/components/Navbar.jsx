import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import './Navbar.css'
import SearchSuggestion from './SearchSuggestion';
import ApiContext from '../context/APIs/apiContext';



const Navbar = () => {
  const data = useContext(ApiContext);
  const [scrolling, setScrolling] = useState(false);
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false)



  const toggleDropdown = () => {
    setisDropdownOpen(prevState => !prevState);
  };



  const handleMenu = () => {
    document.querySelector('nav').classList.add('active')
    document.querySelector('.profile').classList.add('active')
    if (menuOpen == true) {
      document.querySelector('nav').classList.remove('active')
      document.querySelector('.profile').classList.remove('active')
    }
    setMenuOpen(!menuOpen)
  }

  const handleSearchClick = () => {
    setMenuOpen(false)
    setSearchOpen(true);
    data.setOpenSearchBar(!data.openSearchBar);
  }


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center text-secondColor w-full py-3 px-5 font-secondFont select-none transition-colors ${scrolling ? 'bg-[#293132] ' : 'bg-transparent'}`}>
        <Link to={'/home'} className='text-2xl max-[991px]:text-xl'>Cinemaplay</Link>
        <nav>
          <ul className='flex gap-6 text-xl list-none max-[991px]:flex-col max-[991px]:gap-3 max-[991px]:items-center'>
            <Link to="/home" ><li>Home</li></Link>
            <li className='relative max-[640px]:hidden' onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}>
              Category
              {isDropdownOpen &&
                <ul className='absolute top-full left-0 bg-black text-white p-3 text-lg'>
                  <Link to="/movies"><li className='px-4 rounded-sm hover:bg-elemColor2'>Movies</li></Link>
                  <Link to="/series"><li className='px-4 rounded-sm hover:bg-elemColor2'>Series</li></Link>
                </ul>
              }
            </li>
              <Link className='hidden flex-shrink-0 max-[640px]:block' to="/movies"><li className='px-4 rounded-sm'>Movies</li></Link>
              <Link className='hidden flex-shrink-0 max-[640px]:block' to="/series"><li className='px-4 rounded-sm'>Series</li></Link>
            <Link to="/request"><li>Request</li></Link>
          </ul>
        </nav>
        <div className="flex gap-6 items-center">
          <div className='text-4xl cursor-pointer max-[991px]:text-3xl' onClick={handleSearchClick}><IoIosSearch /></div>
          <div className={`profile flex gap-3 items-center`} >
            <div className="username border border-elemColor p-2 rounded-md ">username123456</div>
            <div className="profileimage w-12 h-12 overflow-hidden rounded-full border-2 border-elemColor ">
              <img src="https://i.pinimg.com/564x/31/ca/cf/31cacfc8bceb2011c2f23ea32d2fbfa1.jpg" alt="" className='w-full h-full object-cover object-center' />
            </div>
          </div>
          <div className={`hidden text-2xl border p-2 max-[991px]:block max-[991px]:text-xl`} onClick={handleMenu}>{menuOpen ? <IoIosClose /> : <RxHamburgerMenu />}</div>
        </div>
        {searchOpen && <SearchSuggestion />}
      </header>
    </>
  )
}

export default Navbar


