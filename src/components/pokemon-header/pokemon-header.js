/**
 * @param {Pokemon} pokemon
 * @param {PokemonSettings} pokemonSettings
 * @param {boolean} isGif
 */
function renderPokemonHeader(pokemon, pokemonSettings, isGif) {

    let img = null;

    if (isGif) {
        const female = pokemon.flags.hasGenderDifferences && pokemonSettings?.gender === "F" ? "-f" : "";
        const shiny = pokemonSettings?.shiny ? "_s" : "";
        img = `<img src="https://raw.githubusercontent.com/phcs93/prodex/master/res/gifs/${pokemon.id}${female}${shiny}.gif" alt="${pokemon.name}">`;
    } else {
        img = `<img class="pokemon-sprite" data-id="${pokemon.id}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${pokemon.name}">`;
    }

    return `

        <div class="pokemon-header flex-columns">

            ${img}

            <div class="pokemon-id-name-types flex-rows space-between">
                <small>#${("0000"+pokemon.pokedexId).slice(-4)}</small>
                <strong>${pokemon.name}</strong>
                <div class="types flex-columns" style="margin-top: auto;">
                    ${pokemon.types.map(typeId => renderType(typeId)).join("")}
                </div>
            </div>

        </div>
        
    `;
    
}