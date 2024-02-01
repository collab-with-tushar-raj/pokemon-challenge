import { PrismaClient, Pokemon, Types } from "@prisma/client";

const prisma = new PrismaClient();

type Stat = {
  stat: {
    name: string;
  };
};

type Data = {
  type: {
    name: string;
  };
};

const fetchPokemonData = async (name: string) => {
  let types,
    attack,
    defense,
    hp,
    speed,
    specialAttack,
    specialDefense,
    pokemonId = "";
  try {
    const response: any = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (response.ok) {
      const data: any = await response.json();
      types = data.types.map((item: Data) => item.type.name);
      pokemonId = data.id;
      const stats = data.stats;
      attack = stats.find((stat: Stat) => stat.stat.name === "attack")
        ? stats.find((stat: Stat) => stat.stat.name === "attack").base_stat
        : 0;
      defense = stats.find((stat: Stat) => stat.stat.name === "defense")
        ? stats.find((stat: Stat) => stat.stat.name === "defense").base_stat
        : 0;
      hp = stats.find((stat: Stat) => stat.stat.name === "hp")
        ? stats.find((stat: Stat) => stat.stat.name === "hp").base_stat
        : 0;
      speed = stats.find((stat: Stat) => stat.stat.name === "speed")
        ? stats.find((stat: Stat) => stat.stat.name === "speed").base_stat
        : 0;
      specialAttack = stats.find(
        (stat: Stat) => stat.stat.name === "special-attack"
      )
        ? stats.find((stat: Stat) => stat.stat.name === "special-attack")
            .base_stat
        : 0;
      specialDefense = stats.find(
        (stat: Stat) => stat.stat.name === "special-defense"
      )
        ? stats.find((stat: Stat) => stat.stat.name === "special-defense")
            .base_stat
        : 0;
    } else {
      console.error(`Unable to fetch the details`);
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
  return {
    types,
    pokemonId,
    name,
    attack,
    defense,
    hp,
    speed,
    specialAttack,
    specialDefense,
  };
};

const fetchPokemonDetails = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data: any = await response.json();
  const results = await Promise.all(
    data.results.map(async (item: any) => {
      const pokemonDetails = await fetchPokemonData(item.name);
      return pokemonDetails;
    })
  );
  return results;
};

const fetchTypes = (pokemon: any): Types[] => {
  return pokemon["types"].map((type: string) => {
    return {
      name: type,
      pokemonId: pokemon.id,
    };
  });
};

async function main() {
  try {
    const pokemonData: any = await fetchPokemonDetails();
    for (const pokemon of pokemonData) {
      await prisma.pokemon.upsert({
        where: { pokemonId: pokemon.pokemonId },
        update: {},
        create: {
          pokemonId: pokemon.pokemonId,
          attack: pokemon.attack,
          defense: pokemon.defense,
          hp: pokemon.hp,
          specialAttack: pokemon.specialAttack,
          specialDefense: pokemon.specialDefense,
          name: pokemon.name,
          speed: pokemon.speed,
          types: {
            create: fetchTypes(pokemon),
          },
        },
      });
    }
  } catch (error) {
    console.error("Error during upsert operation:", error);
    await prisma.$disconnect();
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
