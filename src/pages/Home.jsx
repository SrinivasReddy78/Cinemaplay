import React from 'react'
import Carousel from '../components/Carousel'
import TrendingRow from '../components/TrendingRow'
import GenersFilter from '../components/GenersFilter'
import TvShows from '../components/TvShows'
import Movies from '../components/Movies'

const Home = () => {
    return (
        <>
           <Carousel />
           <TrendingRow />
           <GenersFilter />
           <TvShows />
           <Movies />
        </>
    )
}

export default Home
