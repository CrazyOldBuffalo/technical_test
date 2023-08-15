import axios from "axios";
import {
    evolution404Error,
    evolution500Error,
    data404Error,
    data500Error,
} from './errors'

export async function retrievePkmnData(pkmnName) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pkmnName}`;
    return axios.get(url).catch(function (error) {
        if(error.response.status === 404) {
            console.log(data404Error(pkmnName));
        }
        if(error.response.status === 500) {
            console.log(data500Error(pkmnName));
        }
    });
}

export async function retrievePkmnEvolutionData(pkmnEvolutionChain, pkmnName) {
    return axios.get(pkmnEvolutionChain).catch( function (error) {
        if (error.response.status === 404) {
            console.log(evolution404Error(pkmnName));
        }
        if (error.response.status === 500) {
            console.log(evolution500Error(pkmnName));
        }
    });
}