import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import config from '../config/api'; 
const AddPokemon = () => {
    const [name, setName] = useState('');
    const [baseHappiness, setBaseHappiness] = useState('');
    const [captureRate, setCaptureRate] = useState('');
    const [color, setColor] = useState('');
    const [eggGroups, setEggGroups] = useState('');
    const [evolutionChain, setEvolutionChain] = useState('');
    const [flavorTextEntries, setFlavorTextEntries] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const eggGroupsArray = eggGroups ? eggGroups.split(',').map(group => group.trim()) : [];
        const flavorTextEntriesArray = flavorTextEntries ? flavorTextEntries.split(';').map(entry => {
            const [text, language = '', version = ''] = entry.split(',');
            return {
                flavor_text: text ? text.trim() : '',
                language: language ? language.trim() : '',
                version: version ? version.trim() : ''
            };
        }) : [];
        if (flavorTextEntriesArray.length === 0 || flavorTextEntriesArray.some(entry => !entry.flavor_text || !entry.language || !entry.version)) {
            setError('All fields in flavor text entries are required.');
            setSuccess('');
            return;
        }
        const pokemonData = {
            name,
            base_happiness: parseInt(baseHappiness),
            capture_rate: parseInt(captureRate),
            color,
            egg_groups: eggGroupsArray,
            evolution_chain: evolutionChain,
            flavor_text_entries: flavorTextEntriesArray
        };

        axios.post(`${config.apiBaseUrl}/pokemons`, pokemonData)
            .then(response => {
                setSuccess('Pokemon added successfully!');
                setError('');
                navigate('/');
            })
            .catch(err => {
                setError('Error adding Pokemon.');
                setSuccess('');
            });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                >
                    <FaArrowLeft size={24} />
                </button>
                <h1 className="text-4xl font-extrabold text-center flex-grow">Add Pokemon</h1>
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {success && <div className="text-green-500 text-center mb-4">{success}</div>}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Base Happiness</label>
                        <input
                            type="number"
                            value={baseHappiness}
                            onChange={(e) => setBaseHappiness(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Capture Rate</label>
                        <input
                            type="number"
                            value={captureRate}
                            onChange={(e) => setCaptureRate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Color</label>
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Egg Groups (comma-separated)</label>
                        <input
                            type="text"
                            placeholder={"xyz,xyz,...."}
                            value={eggGroups}
                            onChange={(e) => setEggGroups(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Evolution Chain URL</label>
                        <input
                            type="url"
                            value={evolutionChain}
                            onChange={(e) => setEvolutionChain(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Flavor Text Entries (text, language, version separated by comma; multiple entries separated by semicolon)</label>
                    <textarea
                        value={flavorTextEntries}
                        placeholder={"enter all required field with comma (flavor_text, language, version)"}
                        onChange={(e) => setFlavorTextEntries(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        rows="6"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddPokemon;
