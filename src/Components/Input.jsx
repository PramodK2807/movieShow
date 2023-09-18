import React from 'react';
import { useSearch } from '../Context/Search';

const Input = () => {
  const [search, setSearch] = useSearch();

  const handleInputChange = async (newKeyword) => {
    const result = await fetch(
      `https://bmsapi2.onrender.com/search/${newKeyword}`
    );
    let data = await result.json();
    setSearch({ ...search, keyword: newKeyword, result: data });
    console.log(search);
  };

  const handleChange = (e) => {
    const newKeyword = e.target.value;
    handleInputChange(newKeyword);
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-7 d-none d-md-block'></div>
        <div className='col-md-5 text-end'>
          <input
            className='w-100 px-5 py-2 rounded-pill border border-danger'
            type='text'
            placeholder='Search Movies'
            value={search.keyword}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
