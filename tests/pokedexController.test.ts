import axios from "axios";
import {retrievePkmnData, retrievePkmnEvolutionData} from "../controllers/pokedexController"; // Adjust the path accordingly

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Testing PokedexController API Functions", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })


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
        it("Should respond with a console error message if the pokemon doesn't exist or can't be found", async () => {
            mockedAxios.get.mockRejectedValue({
                response: {
                    status: 404,
                }
            });
            const fakeName = "Gibberish"
            const spy = jest.spyOn(console, "log").mockImplementation();
            await retrievePkmnData(fakeName);
            expect(spy).toHaveBeenCalledWith(`[PokeDex]: Ash ${fakeName} Doesn't exist`);
        });
    });

    describe('Test to handle an axios response error from the pokeapi with the retrievePkmnData function', () => {
        it("Should respond with a console error message if promise fails or connection is lost", async () => {
            mockedAxios.get.mockRejectedValue({
                response: {
                    status: 500,
                }
            });
            const spy = jest.spyOn(console, "log").mockImplementation();
            const fakeName = 'Gibberish';
            await retrievePkmnData(fakeName);
            expect(spy).toHaveBeenCalledWith(`[PokeDex]: Ash I'm unable to search the database for ${fakeName}`);
        });
    });

    describe('Test to handle an axios response error from the pokeapi with the retrievePkmnEvolutionData function', () => {
        it("Should respond with a console error message if pokemon doesn't exist or can't be found", async () => {
            mockedAxios.get.mockRejectedValue({
                response: {
                    status: 404,
                }
            });
            const spy = jest.spyOn(console, "log").mockImplementation();
            const fakeUrl = 'https://pokeapi.co/api/v2/evolution-chain/Gibberish'
            const fakeName = 'Gibberish';
            await retrievePkmnEvolutionData(fakeUrl, fakeName);
            expect(spy).toHaveBeenCalledWith(`[PokeDex]: Ash there is no Evolution data for ${fakeName}`);
        });
    });

    describe('Test to handle an axios response error from the pokeapi with the retrievePkmnEvolutionData function', () => {
        it("Should respond with a console error message if the promise fails or another issue occurs", async () => {
            mockedAxios.get.mockRejectedValue({
                response: {
                    status: 500,
                }
            });
            const spy = jest.spyOn(console, "log").mockImplementation();
            const fakeUrl = 'https://pokeapi.co/api/v2/evolution-chain/Gibberish'
            const fakeName = 'Gibberish';
            await retrievePkmnEvolutionData(fakeUrl, fakeName);
            expect(spy).toHaveBeenCalledWith(`[PokeDex]: Ash I'm unable to search for the Evolution Data in the Database for ${fakeName}`);
        });
    });
});
