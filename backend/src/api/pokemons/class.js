import fs from 'fs';
import _ from 'lodash';

const __dirname = import.meta.dirname;

class Pokemon {
  static pokemons = [];
  constructor({ ...config }) {
    Pokemon.pokemons.push(config);
  }

  static LoadPokemonsData() {
    for(let dir of fs.readdirSync(__dirname + '/../../../assets/pokemons/data/')) {
      for (let file of fs.readdirSync(__dirname + '/../../../assets/pokemons/data/' + dir)) {
        if (!file.includes('.json')) return;
        const data = JSON.parse(fs.readFileSync(__dirname + '/../../../assets/pokemons/data/' + dir + "/" + file));

        let usefullData = _.pick(data, ['name', 'id', 'height', 'weight', 'types', 'moves', 'stats', 'order']);
        
        const mappedTypes = _.map(usefullData.types, 'type.name');
        const mappedStats = _.map(usefullData.stats, (stat) => {
          return {
            name: stat.stat.name,
            base_stat: stat.base_stat,
            effort: stat.effort
          }
        });
        const spitesFront = '/pokemons/sprites/front/' + usefullData.name + '.gif';
        const spitesBack = '/pokemons/sprites/back/' + usefullData.name + '.gif';

        usefullData.types = mappedTypes;
        usefullData.stats = mappedStats;
        usefullData.sprites = {
          front: spitesFront,
          back: spitesBack
        }
        usefullData.generation = parseInt(dir.split(' ')[1]);
        new Pokemon(usefullData);
      }
    }
  }

  static GetPokemons() {
    return this.pokemons;
  }
}

export default Pokemon;