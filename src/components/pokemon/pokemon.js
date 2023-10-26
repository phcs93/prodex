/**
 * @param {Pokemon} pokemon
 * @param {PokemonSettings} pokemonSettings
 */
function renderPokemon (pokemon, pokemonSettings, teamSlot, versionId) {
    const versionGroupId = Globals.Database.Versions[versionId].versionGroupId;
    return `
        <div class="pokemon flex-rows gap">

            ${renderPokemonHeader(pokemon, pokemonSettings, true)}

            <hr>

            <div class="flex-rows gap pokemon-build">
                ${pokemonSettings.moves[0] ? renderMove(pokemonSettings.moves[0], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 1)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 1)">SELECT MOVE</button>`}
                ${pokemonSettings.moves[1] ? renderMove(pokemonSettings.moves[1], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 2)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 2)">SELECT MOVE</button>`}
                ${pokemonSettings.moves[2] ? renderMove(pokemonSettings.moves[2], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 3)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 3)">SELECT MOVE</button>`}
                ${pokemonSettings.moves[3] ? renderMove(pokemonSettings.moves[3], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 4)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 4)">SELECT MOVE</button>`}
            </div>

            <div class="flex-rows gap pokemon-details">
                ${/*renderPokemonDetails(pokemon)*/"&lt;details&gt;"}
                <hr>
                ${renderGenderRate(pokemon)}
                <hr>
                ${renderStats(pokemon)}
                <hr>
                ${renderTypesEffectiveness(pokemon)}
            </div>
            
            <hr>

            <button onclick="removePokemon(${teamSlot})">REMOVE</button>

        </div>
    `;
}

function removePokemon (teamSlot) {
    Globals.Parameters.Team[teamSlot-1].id = null;
}