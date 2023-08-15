import axios from "axios";
import {retrievePkmnData, retrievePkmnEvolutionData} from "../controllers/pokedexController"; // Adjust the path accordingly

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Testing PokedexController API Functions", () => {

    describe("Test to call the retreivePkmnData function, for retrieving data from the pokeapi", () => {
        it("Should return a response from the api successfully", async () => {
            const mockResponse = {data: "Bulbasaur data"};
            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const responseData = await retrievePkmnData("bulbasaur");

            // @ts-ignore
            expect(responseData.data).toBe("Bulbasaur data");
            expect(mockedAxios.get).toHaveBeenCalledWith(
                "https://pokeapi.co/api/v2/pokemon-species/bulbasaur"
            );
        });
    });

    describe("Test to call the retrievePkmnEvolutionData function, retrieving data from the pokeapi", () => {
        it("Should return a response from the api successfully", async () => {
            const mockResponse = {
                data: {
                    name: "bulbasaur",
                    chain: ["bulbasaur", "ivysaur", "venusaur"],
                }
            };
            mockedAxios.get.mockResolvedValueOnce(mockResponse)
            const pkmnName = 'bulbasaur'
            const evolutionUrl = "https://pokeapi.co/api/v2/evolution-chain/1"
            const responseData = await retrievePkmnEvolutionData(evolutionUrl, pkmnName);
            // @ts-ignore
            expect(responseData.data.name).toBe(pkmnName);
            // @ts-ignore
            expect(responseData.data.chain.length).toEqual(3);
            expect(mockedAxios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/evolution-chain/1");
        });
    });

    describe('Test to handle an axios response error from the pokeapi with the retrievePkmnData function', () => {
        it("Should respond with a console error message", async () => {
            
        });
    });
});
