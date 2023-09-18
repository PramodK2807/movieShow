import { useEffect, useState } from 'react';
import HomeLayout from '../Components/Layout/HomeLayout';
import MovieList from '../Components/MoviesList';
import Loader from '../Components/Loader';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    let data = await fetch('https://bmsapi2.onrender.com/movies');
    let movie = await data.json();
    setMovies(movie.movies);
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
        {isFetched ? (
          movies.length > 0 ? (
            <div>
              <div className='row g-2 gx-md-3 gx-lg-4 my-4'>
                {currentMovies.map((movie, index) => (
                  <MovieList
                    key={movie._id || index}
                    id={movie._id}
                    title={movie.title}
                    img={movie.img}
                    description={movie.description}
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
            <h1>No Movies Found</h1>
          )
        ) : (
          <Loader />
        )}
      </div>
    </HomeLayout>
  );
};

export default Homepage;
