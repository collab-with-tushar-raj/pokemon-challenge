import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const { sortBy, sortOrder } = req.query;

        const result = await prisma.pokemon.findMany({
            orderBy: {
                [sortBy.toLowerCase()]: sortOrder === 'desc' ? 'desc' : 'asc',
            }
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error sorting Pokémon data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}