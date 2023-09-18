// USER LOGIN OR NOT CHECKING GLOBALLY

import { createContext, useContext, useEffect, useState } from 'react';

const FavouriteContext = createContext();

const FavouriteProvider = ({ children }) => {
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    // localStorage.clear();
    let existingFavourite = localStorage.getItem('favourite');
    if (existingFavourite) {
      setFavourite(JSON.parse(existingFavourite));
    }
  }, []);

  return (
    <FavouriteContext.Provider value={[favourite, setFavourite]}>
      {children}
    </FavouriteContext.Provider>
  );
};

// Custom Hook

const useFavourite = () => useContext(FavouriteContext);

export { useFavourite, FavouriteProvider };
