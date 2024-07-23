import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

const __dirname = import.meta.dirname;


app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(express.static(__dirname + '/assets'));


import PokemonClass from './src/pokemons/class.js';
import TrainerClass from './src/trainers/class.js';

import pokemons from './src/pokemons/index.js';
import trainers from './src/trainers/index.js';
import tournaments from './src/tournaments/index.js';
import auth from './src/auth/index.js';

app.use('/auth', auth);
app.use('/pokemons', pokemons);
app.use('/trainers', trainers);
app.use('/tournaments', tournaments);

app.listen(port, () => {
    PokemonClass.LoadPokemonsData();
    TrainerClass.LoadTrainersData();
    console.log(`Server is running on http://localhost:${port}`);
});