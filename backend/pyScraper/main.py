import requests
import json
import os

for i in range(1, 10):
    url = f"https://pokeapi.co/api/v2/generation/{i}"
    response = requests.get(url)
    if response.status_code == 200:
      data = response.json()

      results = data["pokemon_species"]

      for item in results:
        id = item["url"].replace("/", "").split("pokemon-species")[1]
        item_url = f"https://pokeapi.co/api/v2/pokemon/{id}"

        item_response = requests.get(item_url)

        if item_response.status_code == 200:
          item_data = item_response.json()
          item_name = item_data["name"]


          file_path = f"../assets/pokemons/data/generation {i}/{item_name}.json"
          if not os.path.exists(f"../assets/pokemons/data/generation {i}"):
            os.makedirs(f"../assets/pokemons/data/generation {i}")
        
          with open(file_path, "w") as file:
            json.dump(item_data, file)
        else:
          print(f"Failed to retrieve data for item: {item_url}")
    else:
      print("Failed to retrieve data from the API")