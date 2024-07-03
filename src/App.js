import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CharactersList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetails';
import Navbar from './components/Navbar';
import FavoritesCharacters from './components/FavoritesCharacters';

function Main() {
  const navigate = useNavigate();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/favorites" element={<FavoritesCharacters />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
