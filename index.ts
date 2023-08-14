import * as readline from "readline";
import * as process from "process";
import {retrievePkmnData, retrievePkmnEvolutionData} from "./controllers/pokedexController";
function readLineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

function getPkmnName(rl) {
    return new Promise((resolve) => {
        rl.question(`[PokeDex]: Hi Ash, Please enter the name of a pokemon: `, (pkmnName) => {
            if(!pkmnName) {
                console.log(`[PokeDex]: Ash, no name was entered!`);
                rl.close();
                process.exit(0);
            }
            console.log(`[PokeDex]: Searching for ${pkmnName}`);
            resolve(pkmnName);
        });
    });
}

function parseEvolutionData(evolutionData) {
    return {
        name: evolutionData.species.name,
        variations: evolutionData.evolves_to.map(parseEvolutionData)
    };
}

function printEvolutionData(pkmnEvolutionData, pkmnName) {
    const jsonEvolutionData = parseEvolutionData(pkmnEvolutionData.data.chain);
    console.log(`Here's the data I found for ${pkmnName}`)
    console.log(JSON.stringify(jsonEvolutionData, null, 2));
}

async function main() {
    const rl = readLineInterface();
    try{
        const pkmnName = await getPkmnName(rl);
        const pkmnData = await retrievePkmnData(pkmnName);
        if(!pkmnData) {
            console.log(`[PokeDex]: Ash I couldn't find anything for ${pkmnName}`);
            rl.close();
            process.exit(1);
        }
        const evolutionData = await retrievePkmnEvolutionData(pkmnData.data.evolution_chain.url, pkmnName);
        if (!evolutionData) {
            console.log(`[PokeDex]: Ash I couldn't find any Evolution Data for ${pkmnName}]`);
            rl.close();
            process.exit(1);
        }
        printEvolutionData(evolutionData, pkmnName);
        console.log(`[PokeDex]: Hope this Information Helped!`);
        rl.close();
        process.exit(0);
    }
    catch (error) {
        console.log(`[PokeDex]: An Error Occurred`);
        rl.close();
        process.exit(1);
    }
}

main();