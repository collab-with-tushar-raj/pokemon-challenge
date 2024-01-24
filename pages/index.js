import React, { useState, useEffect } from 'react';
import { Card } from '../components/card';

const baseUrl = '/api/api';

export default function Home() {

  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(baseUrl);
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    }
    catch (error) {
      console.error('Error fetching data on the client side:', error);
      setPokemonData([]);
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Pokemon List</h1>

      {isLoading && <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      {!isLoading && <div className='row gy-4 mt-4 card-list'>
        {pokemonData.length > 0 && pokemonData.map((pokemon) => (
          <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.types}
            stats={pokemon.stats} />
        ))}
      </div>}
    </div>
  );
}