import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const pokemons = await prisma.pokemon.findMany({
            orderBy: {
                ['pokemonId']: 'asc'
            }
        });
        console.log(pokemons);
        if (pokemons.length === 0) {
            res.status(404).json({ error: 'No Pokemon found' });
        } else {
            res.status(200).json(pokemons);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}