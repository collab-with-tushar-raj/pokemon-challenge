export default async function handler(req, res) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (response.ok) {
            const data = await response.json();
            const result = await Promise.all(data.results.map(async item => {
                return await fetchPokemonData(item.name);
            }));
            res.status(200).json(result);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch data from PokeAPI' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fetchPokemonData = async (name) => {
    let types = [], stats = [], id = '';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
            const data = await response.json();
            types = data['types'].map(item => item.type.name);
            stats = data['stats'].map(item => item.stat.name);
            id = data['id'];
        } else {
            console.error(`Unable to fetch the details: ${error}`);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
    return { types, stats, id, name };
}