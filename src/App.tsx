import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './components/Header';
import Home from './routes/Home';
import Search from './routes/Search';
import Tv from './routes/Tv';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
