import React, { useEffect, useState } from 'react';
import HomeLayout from '../Components/Layout/HomeLayout';
import MovieList from '../Components/MoviesList';
import Loader from '../Components/Loader';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setIsFetched(false);
      fetchMovies();
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchMovies = async () => {
    let data = await fetch(
      `https://www.omdbapi.com/?s=${inputValue}&apikey=a4ec1f0d`
    );
    let movieData = await data.json();
    if (movieData.Search) {
      setMovies(movieData.Search);
    } else {
      setMovies([]);
    }
    setIsFetched(true);
  };

  // Calculate the index range for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <HomeLayout>
      <div className='container'>
        <div className='row mt-4'>
          <div className='col-md-7 d-none d-md-block'></div>
          <div className='col-md-5 text-end'>
            <input
              className='w-100 px-5 py-2 rounded-pill border border-danger'
              type='text'
              placeholder='Search Movies'
              value={inputValue}
              onChange={handleChange}
            />
          </div>
        </div>
        {isFetched ? (
          movies && movies.length > 0 ? (
            <div>
              <div className='row g-2 gx-md-3 gx-lg-4 my-4'>
                {currentMovies.map((movie, index) => (
                  <MovieList
                    key={movie.imdbID || index}
                    id={movie.imdbID}
                    title={movie.Title}
                    img={
                      movie.Poster === 'N/A'
                        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                        : movie.Poster
                    }
                    year={movie.Year}
                  />
                ))}
              </div>
              <div className='text-center'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`btn btn-danger mx-2 ${
                      index + 1 === currentPage ? 'active bg-success' : ''
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <h1 className='text-center mt-5'>No Movies Found</h1>
          )
        ) : (
          <Loader />
        )}
      </div>
    </HomeLayout>
  );
};

export default Homepage;
