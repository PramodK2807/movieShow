import React, { useEffect } from 'react';
const MovieList = ({ img, title, id, year }) => {
  useEffect(() => {}, []);

  const setFavouriteItem = async (img, title, id, year) => {
    try {
      let data = await fetch(`${process.env.REACT_APP_MOVIE_API}`, {
        method: 'POST',
        body: JSON.stringify({ img, title, id, year }),
        headers: { 'Content-Type': 'application/json' },
      });

      let result = await data.json();
      if (result.success) {
        alert(result.msg);
      } else if (result.error) {
        alert(result.msg);
      }
    } catch (error) {
      alert("Smothing went wrong");
      return false
    }
  };

  const deleteFavouriteItem = async (id, title) => {
    try {
      let data = await fetch(`${process.env.REACT_APP_MOVIE_API}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, title }),
        headers: { 'Content-Type': 'application/json' },
      });

      let response = await data.json();
      if (response.success) {
        alert(response.msg);
      } else {
        alert(response.msg);
        return false;
      }
    } catch (error) {
      alert("Something went wrong")
    }
  };
  return (
    <div className='col-6 col-md-4 col-lg-3 movie_list' key={id}>
      <div className='rounded border p-1'>
        <img className='w-100 rounded img-fluid' src={img} alt={title} />
        <h2 className='my-3 font-size-12 font-size-md-16 font-size-lg-20 fw-bold'>
          {title}
        </h2>
        <p> Realese Year : {year}</p>
        <div>
          <button
            onClick={() => setFavouriteItem(img, title, id, year)}
            className='w-50 border border-light rounded-pill bg-success text-light fw-bold py-1'
          >
            Fav <span className='text-danger'>&#10084;</span>
          </button>
          <button
            onClick={() => deleteFavouriteItem(id, title)}
            className='w-50 border border-light rounded-pill bg-danger text-light fw-bold py-1'
          >
            Delete Fav
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
