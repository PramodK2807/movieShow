import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavourite } from '../Context/Favourite';

const MovieList = ({ img, title, id }) => {
  let [favourite, setFavourite] = useFavourite();
  let [exist, setExist] = useState();

  useEffect(() => {
    const existingMovies = JSON.parse(localStorage.getItem('favourite')) || [];
    const isExist = existingMovies.some((movie) => movie.id === id);
    setExist(isExist);
  }, [id]);

  const setFavouriteItem = async (img, title, id) => {
    const exist = await favourite.find((m) => m.id === id);
    if (!exist) {
      const newFavorite = [...favourite, { id, img, title }];
      localStorage.setItem('favourite', JSON.stringify(newFavorite));
      setFavourite(newFavorite);
      setExist(true);
      alert(`${title} is added to favorites`);
    } else {
      const updatedFavorites = favourite.filter((m) => m.id !== id);
      localStorage.setItem('favourite', JSON.stringify(updatedFavorites));
      setFavourite(updatedFavorites);
      setExist(false);
      alert(`${title} is removed from favorites`);
    }
  };
  return (
    <div className='col-6 col-md-4 col-lg-3 movie_list' key={id}>
      <div className='rounded border p-1'>
        <img className='w-100 rounded img-fluid' src={img} alt={title} />
        <h2 className='my-3 font-size-16 font-size-md-22 font-size-lg-28 fw-bold'>
          {title}
        </h2>
        <button className='w-50 border border-light rounded-pill bg-success text-light fw-bold py-1'>
          <Link
            className='text-decoration-none text-light'
            to={`/details/${id}`}
          >
            {' '}
            Details
          </Link>
        </button>
        <button
          onClick={() => setFavouriteItem(img, title, id)}
          className='w-50 border border-light rounded-pill bg-success text-light fw-bold py-1'
        >
          {exist ? (
            <>
              Remove <span className='text-danger'>&#10084;</span>{' '}
            </>
          ) : (
            <>
              Add <span className='text-dark'>&#10084;</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieList;
