import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, message } from 'antd';
import 'antd/dist/reset.css';
import config from '../config/api'; 

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${config.apiBaseUrl}/pokemons`)
            .then(response => {
                setPokemons(response.data.pokemons);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the pokemons!", error);
                setLoading(false);
            });
    }, []);

    const handleAddPokemon = () => {
        navigate('/add-pokemon');
    };

    const handleEditPokemon = (id) => {
        navigate(`/update-pokemon/${id}`);
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this Pokémon?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => handleDeletePokemon(id),
        });
    };

    const handleDeletePokemon = (id) => {
        axios.delete(`${config.apiBaseUrl}/pokemons/${id}`)
            .then(response => {
                setPokemons(pokemons.filter(pokemon => pokemon._id !== id));
                message.success('Pokemon deleted successfully!');
            })
            .catch(error => {
                console.error("There was an error deleting the pokemon!", error);
                message.error('Error deleting Pokémon.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-800 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text py-2">
                    Pokemon List
                </h1>
                <button
                    onClick={handleAddPokemon}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add Pokemon
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {pokemons.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-xl text-gray-700">No data found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pokemons.map(pokemon => (
                                <div key={pokemon._id} className="p-6 bg-white shadow-xl rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
                                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">{pokemon.name}</h2>
                                    <p className="text-gray-700"><strong>Base Happiness:</strong> {pokemon.base_happiness}</p>
                                    <p className="text-gray-700"><strong>Capture Rate:</strong> {pokemon.capture_rate}</p>
                                    <p className="text-gray-700"><strong>Color:</strong> {pokemon.color}</p>
                                    <p className="text-gray-700"><strong>Egg Groups:</strong> {pokemon.egg_groups.join(', ')}</p>
                                    <p className="text-gray-700"><strong>Evolution Chain:</strong> <a href={pokemon.evolution_chain} className="text-blue-500 underline hover:text-blue-600">Link</a></p>
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-gray-800">Flavor Text Entries:</h3>
                                        {pokemon.flavor_text_entries.map(entry => (
                                            <p key={entry._id} className="text-gray-600"><strong>{entry.version}:</strong> {entry.flavor_text} <em>({entry.language})</em></p>
                                        ))}
                                    </div>
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <button
                                            onClick={() => handleEditPokemon(pokemon._id)}
                                            className="text-yellow-500 hover:text-yellow-600 transition-transform transform hover:scale-110"
                                            aria-label="Edit Pokémon"
                                        >
                                            <FaEdit size={20} />
                                        </button>
                                        <button
                                            onClick={() => showDeleteConfirm(pokemon._id)}
                                            className="text-red-500 hover:text-red-600 transition-transform transform hover:scale-110"
                                            aria-label="Delete Pokémon"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PokemonList;
