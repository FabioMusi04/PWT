import Router from 'express';
import Trainer from './class.js';
import Pokemon from '../pokemons/class.js';
import Moves from '../moves/class.js';
import _ from 'lodash';

const app = Router();

app.get('/', (req, res) => {
  const { limit, skip, count, search } = req.query;

  let trainers = Trainer.GetTrainers();

  if (search) {
    trainers = _.filter(trainers, (trainer) => {
      return trainers.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (skip) {
    trainers = _.slice(trainers, parseInt(skip));
  }

  if (limit) {
    trainers = _.take(trainers, parseInt(limit));
  }

  if (count) {
    return res.json({ count: trainers.length, trainers: trainers });
  }

  return res.json({ trainers: trainers });
});


app.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'Missing id' });
  }
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
  }
  const trainer = _.find(Trainer.GetTrainers(), { id: parseInt(id) });
  if (!trainer) {
    res.status(404).json({ error: 'Trainer not found' });
  }

  for (const pokemon of trainer.pokemons) {
    if (typeof pokemon !== 'string') {
      return res.json(trainer);
    }
    const pokemonData = _.find(Pokemon.GetPokemons(), { name: pokemon.toLowerCase() });
    if (!pokemonData) {
      continue;
    }
    pokemonData.currentHp = 100;
    pokemonData.hp = 100;

    let moves = _.cloneDeep(pokemonData.moves);
    pokemonData.moves = [];
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * moves.length);
      const moveInfo = _.find(Moves.GetMoves(), (m) => {
        return m.name.toLowerCase() === moves[randomIndex].move.name.toLowerCase();
      });
      if (!moveInfo) {
        i--;
        continue;
      }
      pokemonData.moves.push(moveInfo);
      moves.splice(randomIndex, 1);
    }
    trainer.pokemons[trainer.pokemons.indexOf(pokemon)] = pokemonData;
  }

  trainer.pokemons = _.filter(trainer.pokemons, (pokemon) => {
    return typeof pokemon === 'object';
  });

  return res.json(trainer);
});

export default app;