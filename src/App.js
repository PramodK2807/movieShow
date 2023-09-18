import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Favourite from './Pages/Favourite';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route exact path='/favourite' element={<Favourite />} />
    </Routes>
  );
}

export default App;
