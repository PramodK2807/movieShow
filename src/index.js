import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '../src/assets/styles/bootstrapBreakpoint.scss';
import '../src/assets/styles/main.scss';
import { SearchProvider } from './Context/Search';
import { FavouriteProvider } from './Context/Favourite';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FavouriteProvider>
    <SearchProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </SearchProvider>
  </FavouriteProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
