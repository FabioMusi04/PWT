import fs from 'fs';
import _ from 'lodash';

const __dirname = import.meta.dirname;

class Moves {
  static moves = [];
  constructor({ ...config }) {
    Pokemon.moves.push(config);
  }

  static LoadMovesData() {
    for (let file of fs.readdirSync(__dirname + '/../../../assets/pokemons/data/moves')) {
      if (!file.includes('.json')) return;
      const data = JSON.parse(fs.readFileSync(__dirname + '/../../../assets/pokemons/data/moves/' + file));

      let usefullData = _.pick(data, ['accuracy', 'damage_class.name', 'id', 'meta', 'name', 'power', 'pp', 'priority', 'type.name', 'stat_changes', 'target.name']);

      this.moves.push(usefullData);
    }
  }

  static GetMoves() {
    return this.moves;
  }
}

export default Moves;