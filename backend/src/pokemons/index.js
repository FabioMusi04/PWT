import Router from 'express';
import Pokemon from './class.js';
import _ from 'lodash';

const app = Router();


app.get('/', (req, res) => {
  const { generation, limit, skip, count, search } = req.query;

  let pokemons = Pokemon.GetPokemons();

  console.log(generation, limit, skip, count, search);

  if (generation) {
    pokemons = _.filter(pokemons, { generation: parseInt(generation) });
  }

  if (search) {
    pokemons = _.filter(pokemons, (pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  
  if (skip) {
    pokemons = _.slice(pokemons, parseInt(skip));
  }

  if (limit) {
    pokemons = _.take(pokemons, parseInt(limit));
  }

  if (count) {
    return res.json({ count: pokemons.length, pokemons: pokemons });
  }

  return res.json({ pokemons: pokemons });
});


app.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'Missing id' });
  }
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
  }
  const pokemon = _.find(Pokemon.GetPokemons(), { id: parseInt(id) });
  if (!pokemon) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
  res.json(pokemon);
});

export default app;