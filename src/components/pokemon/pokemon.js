/**
 * @param {Pokemon} pokemon
 * @param {PokemonSettings} pokemonSettings
 */
function renderPokemon (pokemon, pokemonSettings, slot) {
    return `
        <div class="pokemon flex-rows gap">
            ${renderPokemonHeader(pokemon, pokemonSettings)}
            <hr>
            ${/*renderPokemonDetails(pokemon)*/""}
            <hr>
            ${/*renderPokemonGenderRate(pokemon)*/""}
            <hr>
            ${renderPokemonStats(pokemon)}
            <hr>
            ${renderPokemonTypesEffectiveness(pokemon)}
            <hr>
            <button onclick="removePokemon(${slot})">REMOVE</button>
        </div>
    `;
}

function removePokemon (slot) {
    Globals.Parameters.Team[slot].id = null;
}