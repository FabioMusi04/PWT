import Router from 'express';
import Trainer from './class.js';
import Pokemon from '../pokemons/class.js';
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
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    pokemonData.currentHp = 100;
    pokemonData.hp = 100;
    trainer.pokemons[trainer.pokemons.indexOf(pokemon)] = pokemonData;
  }
  
  return res.json(trainer);
});

export default app;