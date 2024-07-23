import csv
import os
import json

csv_file = './trainersPokemonData.csv'
directory = './../assets/trainers/data'

with open(csv_file, 'r') as file:
  reader = csv.reader(file)
  next(reader)

  for row in reader:
    trainer_name = row[0] 

    # Find the file in the directory that contains the trainer's name (might not be the same as the trainer's name)
    file_name = None
    for file in os.listdir(directory):
      if trainer_name.lower() in file:
        file_name = file
        break
    
    if file_name is None:
      print(f'Could not find file for {trainer_name.lower()}')
      continue

    file_path = os.path.join(directory, file_name)

    # Open the file and read the data
    with open(file_path, 'r') as f:
      data = json.load(f)
      data['pokemons'] = []
      for i in range(1, len(row) - 3):
        data['pokemons'].append(row[i])
      
    # Write the updated data back to the file
    with open(file_path, 'w') as f:
      json.dump(data, f, indent=2)

    print(f'Updated {trainer_name}\'s pokemons')

print('Finished updating all trainers\' pokemons')


   