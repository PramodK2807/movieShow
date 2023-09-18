import { useEffect, useState } from 'react';
import HomeLayout from '../Components/Layout/HomeLayout';

const Favourite = () => {
  const [favourite, setFavourite] = useState([])
  const [deletedMovie, setDeletedMovie] = useState(null);

  useEffect(() => {
    fetchFavMovies();
  }, [deletedMovie]);

  const fetchFavMovies = async () => {
    try {
      let result = await fetch('http://localhost:8000/api/favourites', {
        method: 'GET',
      });
      let res = await result.json();
      setFavourite(res.data.favourites);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMovie = async (id, title) => {
    try {
      let result = await fetch(`http://localhost:8000/api/favourites/${id}`, {
        method: 'DELETE',
      });
      let res = await result.json();

      if (res.success) {
        alert(`${title} is Deleted from Fav`);
        setDeletedMovie(id);
      } else if (res.error === true || 'true') {
        alert('Movie not found in favorites');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeLayout>
      <div className='container my-5'>
        <div className='row'>
          {favourite && favourite?.length > 0 ? (
            favourite.map((m) => (
              <div className='col-lg-3 col-md-4 col-6 border' key={m.id}>
                <div className='img'>
                  <img
                    style={{ height: '350px' }}
                    className='w-100 rounded'
                    src={m.img}
                    alt={m.title}
                  />
                </div>
                <p className='title fw-bold fs-5 mt-3 text-center text-dark'>
                  {m.title}
                </p>

                <button
                  className='rounded-pill text-dark fw-bold py-2 border-success w-100 bg-warning font-size-12 font-size-lg-18 '
                  onClick={() => removeMovie(m.id, m.title)}
                >
                  Remove Fav
                </button>
              </div>
            ))
          ) : (
            <h1 className='text-center'>Your Favourite is Empty</h1>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Favourite;
