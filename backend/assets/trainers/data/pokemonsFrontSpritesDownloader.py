from bs4 import *
import requests
import os
 
def download_images(images, folder_name):
   
    count = 0
 
    print(f"Total {len(images)} Image Found!")
 
    if len(images) != 0:
        for i, image in enumerate(images):

            image_link = image.get('href')
            print(image_link)
            if image_link is not None and image_link.endswith('.gif'):
                print(image_link)
                page = requests.get("https://play.pokemonshowdown.com/sprites/ani/"+image_link)
                with open(f"../assets/pokemons/sprites/front/{image_link.split('.gif')[0]}.gif", "wb+") as f:
                    f.write(page.content)
                count = count + 1
        

            
 
        if count == len(images):
            print("All Images Downloaded!")
             
        else:
            print(f"Total {count} Images Downloaded Out of {len(images)}")
 

def main(url):
   
    r = requests.get(url)

    soup = BeautifulSoup(r.text, 'html.parser')
 
    images = soup.findAll('a')

    download_images(images, "g")
 
 
# take url
url = "https://play.pokemonshowdown.com/sprites/ani/"
 
# CALL MAIN FUNCTION
main(url)