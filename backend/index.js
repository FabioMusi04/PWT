import express from 'express';
import cors from 'cors';
import environment from './config.js';
import db from './src/services/db/index.js';

const app = express();

const __dirname = import.meta.dirname;


app.use(cors({
    origin: environment.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.static(__dirname + '/assets'));


import PokemonClass from './src/api/pokemons/class.js';
import TrainerClass from './src/api/trainers/class.js';
import MovesClass from './src/api/moves/class.js';

import pokemons from './src/api/pokemons/index.js';
import trainers from './src/api/trainers/index.js';
import tournaments from './src/api/tournaments/index.js';
import auth from './src/api/auth/index.js';

app.use('/auth', auth);
app.use('/pokemons', pokemons);
app.use('/trainers', trainers);
app.use('/tournaments', tournaments);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.listen(environment.PORT, async() => {
    PokemonClass.LoadPokemonsData();
    TrainerClass.LoadTrainersData();
    MovesClass.LoadMovesData();
    console.log('Data loaded');

    //await db.connectToMongoDB();

    console.log(`Server is running on http://localhost:${environment.PORT}`);
});