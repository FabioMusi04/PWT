import os
import json

# Directory path
directory = './../assets/trainers/sprites/BattleFront'

# Initialize trainers list
trainers = []

# Read directory
for filename in os.listdir(directory):
  if filename.endswith('.jpg') or filename.endswith('.png'):
    # Extract name from file name
    name = filename.split('.')[0]
    # Create trainer dictionary
    trainer = {
      'id': len(trainers) + 1,
      'name': name,
      'pokemons': []
    }

    # Add trainer to list
    trainers.append(trainer)

    
    # Create JSON file
    with open('./../assets/trainers/data/' + trainer['name'] + '.json', 'w') as file:
      json.dump(trainer, file, indent=4)
