from bs4 import *
import requests
import os
 
def download_images(images, folder_name):
   
    count = 0
 
    print(f"Total {len(images)} Image Found!")
 
    if len(images) != 0:
        for i, image in enumerate(images):

            image_link = image.get('src')
            if image_link is not None:
                # Open the URL image, set stream to True, this will return the stream content.
                page = requests.get("https://play.pokemonshowdown.com/sprites/trainers/"+image_link)
                with open(f"./assets/trainers/sprites/{image_link.split('.png')[0]}.png", "wb+") as f:
                    f.write(page.content)
                count = count + 1
        

            
 
        if count == len(images):
            print("All Images Downloaded!")
             
        else:
            print(f"Total {count} Images Downloaded Out of {len(images)}")
 

def main(url):
   
    r = requests.get(url)

    soup = BeautifulSoup(r.text, 'html.parser')
 
    images = soup.findAll('img')

    download_images(images, "g")
 
 
# take url
url = "https://play.pokemonshowdown.com/sprites/trainers/"
 
# CALL MAIN FUNCTION
main(url)