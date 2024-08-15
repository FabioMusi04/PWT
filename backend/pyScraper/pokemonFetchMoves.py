import requests
import json
for i in range(1, 935):
    print(f"Fetching move {i}")
    url = f"https://pokeapi.co/api/v2/move/{i}"
    response = requests.get(url)
    data = response.json()
    with open(f"./../assets/pokemons/data/moves/{i}.json", "w") as f:
        json.dump(data, f)
    
    print(f"Move {i} fetched")