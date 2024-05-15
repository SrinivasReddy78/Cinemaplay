import ApiContext from "./apiContext";
import { useEffect, useState } from 'react'



const ApiState = (props) => {
    const [omdbData, setOmdbData] = useState({})
    const [searchQuery, setSearchQuery] = useState('');
    const [tmdbDataMap, setTmdbDataMap] = useState({});
    const [currentLocation, setCurrentLocation] = useState('/');
    // const [previousRoute, setPreviousRoute] = useState(null)
    const [url, setUrl] = useState('')
    const [CName, setCName] = useState('')
    const [error, setError] = useState('');
    const [openSearchBar, setOpenSearchBar] = useState(false)
    

    const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;
    const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
    const omdbApiUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchQuery}`;

    const fetchOmdbData = async () => {
        try {
            let response = await fetch(omdbApiUrl);
            let data = await response.json();
            if (data && !data.Error) {
                setTimeout(() => {
                    setOmdbData(data)
                }, 800);
            } else {
                setError('Movie not found!');
            }
        } catch (error) {
            setError('Error fetching data. Please try again.');
        }
    }


    const fetchTmdbData = async (fetchUrl, componentName) => {
        try {
            let response = await fetch(`${fetchUrl}&api_key=${tmdbApiKey}`);
            let data = await response.json();
            // console.log('API Response for', componentName, ':', data); 
    
            if (data && !data.Error) {
                // Update the tmdbDataMap with the fetched data for the specific URL
                setTmdbDataMap((prevData) => ({
                    ...prevData,
                    [componentName]: data.results || data.genres,
                    [`${componentName}_totalPages`]: data.total_pages,
                }));
            } else {
                setError('Error fetching TMDB data.');
            }
        } catch (error) {
            setError('Error fetching TMDB data. Please try again later.');
        }
    };
    
    



    useEffect(() => {
        if (searchQuery) {
            fetchOmdbData();
        }
    }, [searchQuery]);


    useEffect(() => {
        if (url) {
            fetchTmdbData(url, CName);
        }
    }, [url]);
    
    
// Add a function to get tmdbData based on a specific component
// const getTmdbData = (componentName) => tmdbDataMap[componentName] || [];

    // console.log(tmdbDataMap);


    const values = { omdbData, setSearchQuery, error, tmdbDataMap, fetchTmdbData, setCName, setUrl,openSearchBar,setOpenSearchBar}

    return (
        <ApiContext.Provider value={values}>
            {props.children}
        </ApiContext.Provider>
    )
}




export default ApiState;