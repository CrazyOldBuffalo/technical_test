import axios from "axios";

export async function retrievePkmnData(pkmnName) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pkmnName}`;
    return axios.get(url).catch(() => console.log(`[PokeDex]: Hmm Something went wrong searching for ${pkmnName}`));
}

export async function retrievePkmnEvolutionData(pkmnEvolutionChain, pkmnName) {
    return axios.get(pkmnEvolutionChain).catch(() => console.log(`[PokeDex]: Hmm I Couldn't find the Evolution Data for ${pkmnName}`));
}