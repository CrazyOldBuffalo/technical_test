import axios from "axios";
import {retrievePkmnData, retrievePkmnEvolutionData} from "./controllers/pokedexController"; // Adjust the path accordingly

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Pokemon API functions", () => {
    afterEach(() => {
        // Clear all mock data after every test
        jest.clearAllMocks();
    });

    describe("retrievePkmnData", () => {
        it("should successfully fetch pokemon data", async () => {
            const mockResponse = { data: "Bulbasaur data" };
            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const response = await retrievePkmnData("bulbasaur");

            // @ts-ignore
            expect(response.data).toBe("Bulbasaur data");
            expect(mockedAxios.get).toHaveBeenCalledWith(
                "https://pokeapi.co/api/v2/pokemon-species/bulbasaur"
            );
        });

        it("should handle errors gracefully", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

            const consoleSpy = jest.spyOn(console, "log").mockImplementation();

            await retrievePkmnData("bulbasaur");

            expect(consoleSpy).toHaveBeenCalledWith(
                "[PokeDex]: Hmm Something went wrong searching for bulbasaur"
            );
        });
    });

    describe("retrievePkmnEvolutionData", () => {
        it("should successfully fetch pokemon evolution data", async () => {
            const mockResponse = { data: "Bulbasaur evolution data" };
            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const response = await retrievePkmnEvolutionData(
                "https://pokeapi.co/api/v2/evolution-chain/1",
                "bulbasaur"
            );

            // @ts-ignore
            expect(response.data).toBe("Bulbasaur evolution data");
            expect(mockedAxios.get).toHaveBeenCalledWith(
                "https://pokeapi.co/api/v2/evolution-chain/1"
            );
        });

        it("should handle errors gracefully when fetching evolution data", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

            const consoleSpy = jest.spyOn(console, "log").mockImplementation();

            await retrievePkmnEvolutionData(
                "https://pokeapi.co/api/v2/evolution-chain/1",
                "bulbasaur"
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                "[PokeDex]: Hmm I Couldn't find the Evolution Data for bulbasaur"
            );
        });
    });
});
