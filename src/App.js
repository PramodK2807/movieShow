import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Favourite from './Pages/Favourite';
import DetailPage from './Pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/favourite' element={<Favourite />} />
      <Route path='/details/:id' element={<DetailPage />} />
    </Routes>
  );
}

export default App;
