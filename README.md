# Prodex

A tool for querying and building the perfect Pokémon team.

You can access the app here:  
https://phcs93.github.io/prodex/

It features a wide variety of filters and charts to help you find the best match for your team.

# Credits

All data was obtained from PokeAPI:  
https://pokeapi.co/ (https://github.com/PokeAPI/pokeapi)

All 2D sprites also from PokeAPI:  
https://github.com/PokeAPI/sprites/

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

Pokemon footprints and cries from veekun:  
https://veekun.com/dex/downloads

Team checklist inspired (basically stolen) from:  
https://mypokemonteam.com/

# TO-DO

- currently using "short" descriptions for moves, abilities and items, consider using the full dsecription somewhere for better information (Levitate for example, it says only "evades moves", when it actually makes you immune to ground type moves).

- disable version specific filters when "obtainable" flag is false

- nickname on build view

- ev/iv calculator on build view
  - like done [here](https://www.pokeos.com/team-builder/)

- allow filtering by evolution trigger fields (time of day, affection, etc)
- allow filtering by evolution flags (has branches, etc)

- make item selector popup (like moves) and show icons and descriptions
- make ability selector popup (like moves) and show icons and descriptions
- make nature selector popup (like moves) and show icons and descriptions

- show move learning method icons (where?)
- show encounter icons (easy)

- improve the evolution chain display
  - change pokemon instead of playing the cry when cliking the sprite
  - improve eevee chain display

- consider abilities when calculating pokemon weakness (attacking and defending)
- consider items when calculating pokemon weakness (attacking and defending)
- consider generation when filtering move type (some normal moves became fairy type)

- drag & drop moves in build view
  - check which team members can learn

- generation specifics
  - there are some moves that changed type/effect, some pokemons changed stats, etc

- encounters for regional forms should be the same as their base form (?)

- detect if pokemon can be obtainble at version by trading ([too much work](https://pokemondb.net/pokebase/233293/what-games-can-i-trade-transfer-my-pokemon-to?show=329604#a329604))

- figure out a way to use separate .html files (web loader?)

- search pokemon by voice

- show the map of the region corresponding to the selected version when visualizing pokemon encounter details
  - just like this guy did here: https://simplyblgdev.github.io/Pokemon/Kanto

- build oponent team
  - preset trainers (elite 4, etc)
  - simulate battle

- WTH are formats?
- WTH are strategies?
- WTH is [pokémon showdown](https://play.pokemonshowdown.com/)?

- I could really improve the UX/UI in general but I don't have time for this anymore

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

## missing cries

- from id 722 onwards

## missing footprints

- I think newer generations don't use footprints anymore
