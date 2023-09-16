# Prodex

A tool for building the perfect Pokémon team.

It features a wide variety of filters and charts to help you find the best match for your team.

All data was obtained from `PokeAPI` (https://pokeapi.co/).

I've actually built a tool to extract and transform the CSV data directly from their repository (https://github.com/phcs93/poke-api-etl).

All 3D sprites were obtained from https://www.pkparaiso.com/

I've reorganized and rehosted them here: WIP

This project is a new version of an older project I've made: https://github.com/phcs93/pokefy/

# DEMO

https://phcs93.github.io/prodex/

# TO-DO

  - buy me a coffee link

## filter window

  - show pokemon info base on filtered field in the list
    - ex: filter by move learned -> show that move bellow the pokemon card
    - ex: filter by encounter level -> show that encounter bellow pokemon card
    - ex: filter by type -> no need to show since type is the card already
    - ex: order by type weakness -> show type weakness table bellow pokemon card

## moves window

  - show pre-evolution moves
  - highlight STAB (also highlight damage type based on highest pokemon stat)

## important things

  - consider abilities when calculating pokemon weakness (attacking and defending)
  - consider generation when filtering move type (some normal moves became fairy)
  - determine move damage type by generation
  - encounters for regional forms should be the same as their base form (?)
  - remember to properly show corresponding versions on encounters, held items, etc

## add filters

  - evolution
    - by item
    - by method
    - by number of evolutions
  - moves
    - learns moves from type
      - only damaging moves (to filter stuff like sun light)

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
