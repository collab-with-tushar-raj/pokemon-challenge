import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }
        const result = await prisma.pokemon.findMany({
            where: {
                name: {
                    contains: name.toLowerCase()
                },
            },
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching data on the client side:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}