import axios from "axios";

export async function retrievePkmnData(pkmnName) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pkmnName}`;
    return axios.get(url).catch(function (error) {
        if(error.response.status === 404) {
            console.log(`[PokeDex]: Ash ${pkmnName} Doesn't exist`);
        }
        else {
            console.log(`[PokeDex]: Ash, I'm having trouble searching for ${pkmnName}`);
        }
    });
}

export async function retrievePkmnEvolutionData(pkmnEvolutionChain, pkmnName) {
    return axios.get(pkmnEvolutionChain).catch( function (error) {
        if (error.response.status === 404) {
            console.log(`[PokeDex]: Ash there is no Evolution data for ${pkmnName}`)
        }
        else {
            console.log(`[PokeDex]: Hmm I Couldn't find the Evolution Data for ${pkmnName}`);
        }
    });
}