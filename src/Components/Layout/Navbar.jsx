import { Link } from 'react-router-dom';
import { useFavourite } from '../../Context/Favourite';

const Navbar = () => {
  const [localData] = useFavourite()
  return (
    <nav className='navbar navbar-expand-md bg-danger fw-bold'>
      <div className='container'>
        <Link className='navbar-brand font-size-30 text-light' to='/'>
          MovieShow
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0 font-size-18'>
            <li className='nav-item'>
              <Link className='nav-link text-light' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-light' to='/favourite'>
                Favourites <span className='border border-light rounded-pill'>{localData.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;