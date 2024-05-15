import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Request from './pages/Request.jsx'
import App from './App.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import MoviesPage from './pages/MoviesPage.jsx'
import TvShowsPage from './pages/TvShowsPage.jsx'
import LandingPage from './pages/LandingPage.jsx'


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
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
