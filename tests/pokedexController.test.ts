import axios from "axios";
import {retrievePkmnData, retrievePkmnEvolutionData} from "../controllers/pokedexController"; // Adjust the path accordingly

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
            const mockResponse = {data: "Bulbasaur data"};
            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const response = await retrievePkmnData("bulbasaur");

            // @ts-ignore
            expect(response.data).toBe("Bulbasaur data");
            expect(mockedAxios.get).toHaveBeenCalledWith(
                "https://pokeapi.co/api/v2/pokemon-species/bulbasaur"
            );
        });
    });
});
