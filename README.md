# Prodex

A tool for building the perfect Pokémon team.

You can access the app here:  
https://phcs93.github.io/prodex/

It features a wide variety of filters and charts to help you find the best match for your team.

This project is a new version of an older project I've made:  
https://github.com/phcs93/pokefy/

# Credits

All data was obtained from `PokeAPI`:  
https://pokeapi.co/

I've actually built a tool to extract and transform the CSV data directly from their repository:  
https://github.com/phcs93/poke-api-etl/

All 2D sprites also from `PokeAPI`:  
https://github.com/PokeAPI/sprites/

Almost all 3D sprites were obtained from `PkParaíso`:  
https://www.pkparaiso.com/

I've reorganized and rehosted them here (more credits in the repo):  
https://github.com/phcs93/poke-3d-sprites/

Pokemon footprint images from KierranFalloon (veekun + pokecommunity):  
https://github.com/KierranFalloon/FootprintAPI/

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