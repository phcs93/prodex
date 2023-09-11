/**
 * @param {Pokemon} pokemon
 * @param {UserSettings} userSettings
 */
function renderPokemon (pokemon, userSettings) {
    return `
        <div class="pokemon flex-rows">
            ${renderPokemonHeader(pokemon, userSettings)}
            <hr>
            ${/*renderPokemonDetails(pokemon)*/""}
            <hr>
            ${renderPokemonGenderRate(pokemon)}
            <hr>
            ${renderPokemonStats(pokemon)}
            <hr>
            ${renderPokemonTypesEffectiveness(pokemon)}
        </div>
    `;
}