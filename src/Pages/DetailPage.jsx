import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from '../Components/Layout/HomeLayout';
import Loader from '../Components/Loader';

const DetailPage = () => {
  let [movies, setMovies] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const params = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    let data = await fetch(
      `https://bmsapi2.onrender.com/movie/detail/${params.id}`
    );
    let result = await data.json();
    if (result) {
      setMovies(result.movie);
    }
    setIsFetched(true);
  };

  return (
    <HomeLayout>
      <div className='container my-5 '>
        <div className='row d-flex align-items-center'>
          {isFetched ? (
            movies.map((m, index) => (
              <>
                <div
                  className='col-md-3 mx-auto my-2 moviepage col-6'
                  key={m._id || index + 1}
                >
                  <img style={{ width: '100%' }} src={m.img} alt={m.title} />
                </div>
                <div className='col-md-8'>
                  <div className='row d-flex justify-content-between align-items-center'>
                    <h1 className='col-7 my-2'>{m.title}</h1>
                    <div className='col-5 text-end'>Year : 2021 &nbsp; </div>
                  </div>
                  <p>{m.movie_description}</p>
                </div>
              </>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </HomeLayout>
  );
};
export default DetailPage;
