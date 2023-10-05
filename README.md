# Prodex

A tool for querying and building the perfect Pokémon team.

You can access the app here:  
https://phcs93.github.io/prodex/

It features a wide variety of filters and charts to help you find the best match for your team.

This project is a new version of an older project I've made:  
https://github.com/phcs93/pokefy/

# Credits

All data was obtained (extracted using my `etl.js`) from PokeAPI:  
https://pokeapi.co/

All 2D sprites also from PokeAPI:  
https://github.com/PokeAPI/sprites/

Pokemon footprint images from KierranFalloon (veekun + pokecommunity):  
https://github.com/KierranFalloon/FootprintAPI/

The majority of animated gifs were obtained from PkParaiso:  
https://www.pkparaiso.com/

Some Pikachu alternative forms from Smogon dex:  
https://www.smogon.com/dex/sv/pokemon/pikachu/

Some hisuian sprites from users Flicks and arodriguez810 at smogon forums:  
https://www.smogon.com/forums/threads/custom-3d-animated-renders.3526922/page-15

Generation 9 sprites from users Flicks and arodriguez810 at smogon forums as well:  
https://www.smogon.com/forums/threads/custom-3d-animated-renders.3526922/page-16

Rillaboom Gigantamax and Cinderace Gigantamax from Wikidex:  
https://www.wikidex.net/wiki/Rillaboom  
https://www.wikidex.net/wiki/Cinderace  

Walking Wake and Iron Leaves gifs from Wikidex:  
https://www.wikidex.net/wiki/Ondulagua  
https://www.wikidex.net/wiki/Ferroverdor

# TO-DO

- figure a way to use separate .html files (web loader?)

## filters

- evolution filters (render evolutions when filtering)
  - number of evolutions (depth)
  - number of branches
  - evolution method (items, trading, etc)
    - if item, choose which item to filter by

## database

- determine if pokemon is obtainable in version 
  - by evolution -> DONE
  - by hatching egg  -> DONE
  - by trading from sister version
    - detect if pokemon can be traded from other generations

## moves window

- show pre-evolution moves
- highlight STAB (also highlight damage type based on highest pokemon stat)

## important things

- consider abilities when calculating pokemon weakness (attacking and defending)
- consider generation when filtering move type (some normal moves became fairy)
- determine move damage type by generation
- encounters for regional forms should be the same as their base form (?)
- change "only obtainable" flag to "show from all versions" (remember to unconsider version on moves, held items, etc)
  - actually it would be simpler to just disable all version dependant filters

## add filters

- evolution
  - by item
  - by method
  - by number of evolutions

## team builder 

- select pokemon moves
- also select ability, nature, level, EVs, IVs
- select gender
- select shiny
- hear cry
- show location with both list and map image (like in the game)
- show sprite based on selected generation
  - one spritesheet per generation?
  - one gif collection per generation?

## charts

- calculate team types vulnerabilites and advantages
- number of pokemons team has advantage on by type
- number of pokemons per type
- type effectiveness table
- natures & tastes

## missing sprites / gifs

- [GEN 7] #10094 Pikachu Original Cap [shiny]
- [GEN 7] #10094 Pikachu Original Cap [female]
- [GEN 7] #10094 Pikachu Original Cap [female] [shiny]
- [GEN 7] #10095 Pikachu Hoenn Cap [shiny]
- [GEN 7] #10095 Pikachu Hoenn Cap [female]
- [GEN 7] #10095 Pikachu Hoenn Cap [female] [shiny]
- [GEN 7] #10096 Pikachu Sinnoh Cap [shiny]
- [GEN 7] #10096 Pikachu Sinnoh Cap [female]
- [GEN 7] #10096 Pikachu Sinnoh Cap [female] [shiny]
- [GEN 7] #10097 Pikachu Unova Cap [shiny]
- [GEN 7] #10097 Pikachu Unova Cap [female]
- [GEN 7] #10097 Pikachu Unova Cap [female] [shiny]
- [GEN 7] #10098 Pikachu Kalos Cap [shiny]
- [GEN 7] #10098 Pikachu Kalos Cap [female]
- [GEN 7] #10098 Pikachu Kalos Cap [female] [shiny]
- [GEN 7] #10099 Pikachu Alola Cap [shiny]
- [GEN 7] #10099 Pikachu Alola Cap [female]
- [GEN 7] #10099 Pikachu Alola Cap [female] [shiny]
- [GEN 7] #10148 Pikachu Partner Cap [shiny]
- [GEN 7] #10148 Pikachu Partner Cap [female]
- [GEN 7] #10148 Pikachu Partner Cap [female] [shiny]
- [GEN 7] #10158 Pikachu Starter [shiny]
- [GEN 7] #10158 Pikachu Starter [female]
- [GEN 7] #10158 Pikachu Starter [female] [shiny]
- [GEN 7] #10159 Eevee Starter [shiny]
- [GEN 8] #10160 Pikachu World Cap [shiny]
- [GEN 8] #10160 Pikachu World Cap [female]
- [GEN 8] #10160 Pikachu World Cap [female] [shiny]
- [GEN 9] #10264 Koraidon Limited Build
- [GEN 9] #10264 Koraidon Limited Build [shiny]
- [GEN 9] #10265 Koraidon Sprinting Build
- [GEN 9] #10265 Koraidon Sprinting Build [shiny]
- [GEN 9] #10266 Koraidon Swimming Build
- [GEN 9] #10266 Koraidon Swimming Build [shiny]
- [GEN 9] #10267 Koraidon Gliding Build
- [GEN 9] #10267 Koraidon Gliding Build [shiny]
- [GEN 9] #10268 Miraidon Low Power Mode
- [GEN 9] #10268 Miraidon Low Power Mode [shiny]
- [GEN 9] #10269 Miraidon Drive Mode
- [GEN 9] #10269 Miraidon Drive Mode [shiny]
- [GEN 9] #10270 Miraidon Aquatic Mode
- [GEN 9] #10270 Miraidon Aquatic Mode [shiny]
- [GEN 9] #10271 Miraidon Glide Mode
- [GEN 9] #10271 Miraidon Glide Mode [shiny]
