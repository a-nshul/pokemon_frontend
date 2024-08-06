import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import AddPokemon from './components/AddPokemon';
import UpdatePokemon from './components/UpdatePokemon';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/add-pokemon" element={<AddPokemon />} />
                <Route path="/update-pokemon/:id" element={<UpdatePokemon />} />
            </Routes>
        </Router>
    );
};

export default App;
