import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const pokemons = await prisma.pokemon.findMany({
            include: {
                types: true
            },
            orderBy: {
                ['pokemonId']: 'asc'
            }
        });
        if (pokemons.length === 0) {
            res.status(404).json({ error: 'No Pokemon found' });
        } else {
            const result = pokemons.map(pokemon => {
                const types = pokemon.types.map(type => type.name);
                return {
                    pokemonId: pokemon.pokemonId,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                    hp: pokemon.hp,
                    name: pokemon.name,
                    specialAttack: pokemon.specialAttack,
                    specialDefense: pokemon.specialDefense,
                    speed: pokemon.speed,
                    types
                }
            })
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}