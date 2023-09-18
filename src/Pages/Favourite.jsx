import { useEffect } from 'react';
import HomeLayout from '../Components/Layout/HomeLayout';
import { useFavourite } from '../Context/Favourite';

const Favourite = () => {
  const [favourite, setFavourite] = useFavourite();

  useEffect(() => {}, [favourite]);

  const remove = (mid) => {
    try {
      let myFavourite = [...favourite];
      let index = myFavourite.findIndex((item) => item.id === mid);
      myFavourite.splice(index, 1);
      setFavourite(myFavourite);
      localStorage.setItem('favourite', JSON.stringify(myFavourite));
    } catch (error) {}
  };
  return (
    <HomeLayout>
      <div className='container my-3'>
        <div className='container my-5'>
          <div className='row mx-auto seeall'>
            {favourite?.length > 0 ? (
              favourite.map((m) => (
                <div className='col-md-3 col-6 border'>
                  <div className='img'>
                    <img className='w-100 rounded' src={m.img} alt={m.title} />
                  </div>
                  <p
                    className='title fw-bold fs-5 mt-3 text-center text-dark'
                  >
                    {m.title}
                  </p>

                  <button
                    className='rounded-pill text-light border-success w-100 bg-warning'
                    onClick={() => remove(m.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <h1 className='text-center'>Your Favourite is Empty</h1>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
export default Favourite;
