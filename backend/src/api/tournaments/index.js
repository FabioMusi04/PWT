import Router from 'express';
import Trainer from '../trainers/class.js';
import _ from 'lodash';

const app = Router();

app.get('/', (req, res) => {
  let trainers = Trainer.GetTrainers();

  let tournament = [];
  let trainersCopy = _.cloneDeep(trainers);

  for(let i = 0; i < 31; i++){
    let randomIndex = Math.floor(Math.random() * trainersCopy.length);
    let randomTrainer = trainersCopy[randomIndex];
    
    let hasAllPokemon = randomTrainer.pokemons.length === 6;
    if (!hasAllPokemon) {
      i--;
      continue;
    }

    let found = _.find(tournament, (t) => {
      return t.name.startsWith(randomTrainer.name);
    });

    if(!found){
      trainersCopy.splice(randomIndex, 1);
      tournament.push(randomTrainer);
    } else {
      i--;
    }
  }

  tournament.push({
    name: 'player',
    sprite: '/trainers/sprites/BattleFront/player.png',
    pokemons: []
  });

  let bracket = [];

  tournament = _.shuffle(tournament);

  for(let i = 0; i < 16; i++){
    bracket.push({
      player1: tournament[i],
      player2: tournament[31 - i]
    });
  }

  return res.json({ bracket: bracket });
});

export default app;