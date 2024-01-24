import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (response.ok) {
            const data = await response.json();
            await Promise.all(data.results.map(async item => {
                const { pokemonId, name, types, attack, defense, hp, speed, specialAttack,
                    specialDefense } = await fetchPokemonData(item.name);
                await prisma.pokemon.create({
                    data: {
                        pokemonId, name, types, attack, defense, hp, speed, specialAttack, specialDefense
                    }
                })
            }));
            res.status(200).send('Successfully inserted 151 records');
        } else {
            res.status(response.status).json({ error: 'Failed to fetch data from PokeAPI' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}

const fetchPokemonData = async (name) => {
    let types = [], attack, defense, hp, speed, specialAttack, specialDefense, pokemonId = '';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
            const data = await response.json();
            types = data['types'].map(item => item.type.name).join(',');
            pokemonId = data['id'];
            const stats = data['stats'];
            attack = stats.find(stat => stat.stat.name === 'attack') ?
                stats.find(stat => stat.stat.name === 'attack').base_stat : 0;
            defense = stats.find(stat => stat.stat.name === 'defense') ?
                stats.find(stat => stat.stat.name === 'defense').base_stat : 0;
            hp = stats.find(stat => stat.stat.name === 'hp') ?
                stats.find(stat => stat.stat.name === 'hp').base_stat : 0;
            speed = stats.find(stat => stat.stat.name === 'speed') ?
                stats.find(stat => stat.stat.name === 'speed').base_stat : 0;
            specialAttack = stats.find(stat => stat.stat.name === 'special-attack') ?
                stats.find(stat => stat.stat.name === 'special-attack').base_stat : 0;
            specialDefense = stats.find(stat => stat.stat.name === 'special-defense') ?
                stats.find(stat => stat.stat.name === 'special-defense').base_stat : 0;
        } else {
            console.error(`Unable to fetch the details: ${error}`);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
    return { types, pokemonId, name, attack, defense, hp, speed, specialAttack, specialDefense };
}