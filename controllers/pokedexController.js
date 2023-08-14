"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePkmnEvolutionData = exports.retrievePkmnData = void 0;
var axios_1 = require("axios");
function retrievePkmnData(pkmnName) {
    var url = "https://pokeapi.co/api/v2/pokemon-species/".concat(pkmnName);
    return axios_1.default.get(url).catch(function () { return console.log("[PokeDex]: Hmm Something went wrong searching for ".concat(pkmnName)); });
}
exports.retrievePkmnData = retrievePkmnData;
function retrievePkmnEvolutionData(pkmnEvolutionChain, pkmnName) {
    return axios_1.default.get(pkmnEvolutionChain).catch(function () { return console.log("[PokeDex]: Hmm I Couldn't find the Evolution Data for ".concat(pkmnName)); });
}
exports.retrievePkmnEvolutionData = retrievePkmnEvolutionData;
//# sourceMappingURL=pokedexController.js.map