import React, { Children, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Request from './pages/Request.jsx'
import App from './App.jsx'
const MovieDetail = lazy(()=> import('./pages/MovieDetail.jsx'))  
const MoviesPage  = lazy(()=> import('./pages/MoviesPage.jsx')) 
const TvShowsPage = lazy(()=> import('./pages/TvShowsPage.jsx'))  
const LandingPage = lazy(()=> import( './pages/LandingPage.jsx')) 


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "request",
        element: <Request />
      },
      {
        path: "movies",

        element: <MoviesPage />
      },
      {
        path: "series",
        element: < TvShowsPage />
      },
      {
        path: ":title/:year",
        element: <MovieDetail />
      },
    ]
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback= { <div className="loader w-screen h-screen flex flex-col items-center justify-center">
          <div className="text-white text-2xl mt-4">Loading...</div>
        </div>}>
    <RouterProvider router={router} />
    </Suspense>
    {/* <App /> */}
  </React.StrictMode>,
)
