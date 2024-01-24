import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../components/card';
import debouce from "lodash.debounce";

const baseUrl = '/api/pokemon';

export default function Home() {

  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (searchTerm === '') {
      fetchData();
    } else {
      fetchDataByName();
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApiResponse = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    }
    catch (error) {
      console.error('Error fetching data on the client side:', error);
      setPokemonData([]);
      setIsLoading(false);
    }
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  const fetchData = async () => {
    handleApiResponse(baseUrl);
  };

  const fetchDataByName = async () => {
    handleApiResponse(`${baseUrl}/${searchTerm}`);
  }

  const sortStat = async (sortOrder) => {
    handleApiResponse(`${baseUrl}/sort?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Pokemon List</h1>
      <div className='d-flex mt-5'>
        <div className='d-flex w-75'>
          <div className='d-flex flex-column w-50'>
            <label><b>Find your favourite character</b></label>
            <input
              type='text'
              placeholder='Search by name'
              className='form-control'
              onChange={debouncedResults} />
          </div>
          <div className='d-flex flex-column ms-4'>
            <label><b>Filter</b></label>
            <select className='form-control' onChange={(e) => setSortBy(e.target.value)}>
              <option value=''>Choose Stat</option>
              <option value='Attack'>Attack</option>
              <option value='Defense'>Defense</option>
              <option value='HP'>HP</option>
              <option value='Speed'>Speed</option>
              <option value='Special Attack'>Special Attack</option>
              <option value='Special Defense'>Special Defense</option>
              <option value='Defense'>Defense</option>
            </select>
          </div>
        </div>
        <div className='d-flex flex-column ms-auto'>
          <label><b>Sort By</b></label>
          <select className='form-control' onChange={(e) => sortStat(e.target.value)}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>
      {isLoading && <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      {!isLoading && <div className='row gy-4 mt-4 card-list'>
        {pokemonData.length > 0 && pokemonData.map((pokemon) => (
          <Card key={pokemon.pokemonId} id={pokemon.pokemonId} name={pokemon.name} types={pokemon.types}
            attack={pokemon.attack} defense={pokemon.defense} hp={pokemon.hp} speed={pokemon.speed}
            specialAttack={pokemon.specialAttack} specialDefense={pokemon.specialDefense} />
        ))}
      </div>}
    </div>
  );
}