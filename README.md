# Home Office Technical Test (Node.js)


## Pokemon Evolution Tool

A basic console application that makes use of a controller `pokedexController.ts` with axios to send a request to the 
pokeapi (<link> https://www.pokeapi.co/api/v2 </link>) to retrieve the data for a specified Pokémon and return its evolution chain.

Built using Typescript.

### Instructions

#### Prerequisites
1. Ensure node is installed on your system of choice, you can download it [here](https://nodejs.org/en"/).
2. Ensure that Typescript is also installed on your system through the command line using node once installed with `npm install -g ts-node typescript '@types/node'`.

#### Running and Setup
The initialise the repo, first download it (and if required extract it).
1. Open the folder within the terminal, such as cmd.
2. Install the dependencies using `npm init` within the terminal or run the build command `npm run build` to set up this for you.
3. Run the application using the `npm run deploy` command in the terminal

#### Use
- Enter the name of any Pokémon you wish to search for when prompted, and it will retrieve and list the full evolution data of it.
- If you enter nothing the program will recognise this and exit, if you enter gibberish (or a non Pokémon name) it will throw an error and exit.
- To run the tests for the application you can do so with `npm test`.


##### Note on Testing
The intention was to produce unit tests for the full application, although this failed due to issues with the testing suite running through the entire application and forcing a readline close,
after some investigation and research I was unable to find a potential solution or workaround and as a result it was dropped. Because of this, only the api controller is tested.