/**
 * @param {Pokemon} pokemon
 * @param {PokemonSettings} pokemonSettings
 */
function renderPokemon (pokemon, pokemonSettings, slot, versionId) {
    const versionGroupId = Globals.Database.Versions[versionId].versionGroupId;
    return `
        <div class="pokemon flex-rows gap">
            ${renderPokemonHeader(pokemon, pokemonSettings, true)}
            <hr>
            ${/*renderPokemonDetails(pokemon)*/"&lt;details&gt;"}
            <hr>
            ${renderGenderRate(pokemon)}
            <hr>
            ${renderStats(pokemon)}
            <hr>
            ${renderTypesEffectiveness(pokemon)}
            <hr>
            &lt;moves&gt;
            <hr>
            <button onclick="removePokemon(${slot})">REMOVE</button>
        </div>
    `;
}
/*
${pokemonSettings.moves[0] ? renderMove(pokemonSettings.moves[0], versionGroupId) : ""}
${pokemonSettings.moves[1] ? renderMove(pokemonSettings.moves[1], versionGroupId) : ""}
${pokemonSettings.moves[2] ? renderMove(pokemonSettings.moves[2], versionGroupId) : ""}
${pokemonSettings.moves[3] ? renderMove(pokemonSettings.moves[3], versionGroupId) : ""}
*/

function removePokemon (slot) {
    Globals.Parameters.Team[slot].id = null;
}