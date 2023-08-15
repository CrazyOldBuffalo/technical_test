

import { readLineInterfaceExported, getPkmnNameExported, printEvolutionDataExported } from '../index';
import {retrievePkmnData, retrievePkmnEvolutionData} from "../controllers/pokedexController";
import * as readline from 'readline';
import * as process from 'process';


jest.mock('readline');
jest.mock('process')
jest.mock('../controllers/pokedexController');

describe('Testing the main application', () => {
    let mockQuestion = jest.mock;

    beforeAll(() => {
        mockQuestion = jest.fn();

        (readline.createInterface as jest.Mock).mockReturnValue({
            question: mockQuestion,
            close: jest.fn(),
        });
    });

    describe('')





})
