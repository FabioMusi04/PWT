import fs from 'fs';
const __dirname = import.meta.dirname;

class Trainer {
  static Trainers = [];
  constructor({...config}) {
    Trainer.Trainers.push(config);
  }

  static LoadTrainersData() {
    for(let file of fs.readdirSync(__dirname + '/../../assets/trainers/sprites/BattleFront')) {
      if (!file.includes('.png')) return;

      let dataFile = fs.readFileSync(__dirname + '/../../assets/trainers/data/' + file.split('.')[0] + '.json');

      if (!dataFile) return;
      
      let data = JSON.parse(dataFile);

      new Trainer({
        name: file.split('.')[0].split('-')[0],
        sprite: '/trainers/sprites/BattleFront/' + file,
        pokemons: data.pokemons,
        id: data.id
      });
    }
  }

  static GetTrainers() {
    return this.Trainers;
  }
}

export default Trainer;