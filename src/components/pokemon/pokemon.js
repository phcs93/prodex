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
            ${pokemonSettings.moves[0] ? renderMove(pokemonSettings.moves[0], versionGroupId) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${slot}, 1)">SELECT MOVE</button>`}
            ${pokemonSettings.moves[1] ? renderMove(pokemonSettings.moves[1], versionGroupId) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${slot}, 2)">SELECT MOVE</button>`}
            ${pokemonSettings.moves[2] ? renderMove(pokemonSettings.moves[2], versionGroupId) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${slot}, 3)">SELECT MOVE</button>`}
            ${pokemonSettings.moves[3] ? renderMove(pokemonSettings.moves[3], versionGroupId) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${slot}, 4)">SELECT MOVE</button>`}
            <hr>
            ${/*renderPokemonDetails(pokemon)*/"&lt;details&gt;"}
            <hr>
            ${/*renderGenderRate(pokemon)*/"&lt;gender-rate&gt;"}
            <hr>
            ${/*renderStats(pokemon)*/"&lt;statse&gt;"}
            <hr>
            ${/*renderTypesEffectiveness(pokemon)*/"&lt;type-weaknesses&gt;"}
            <hr>
            <button onclick="removePokemon(${slot})">REMOVE</button>
        </div>
    `;
}

function showMoveSelectorSwal (slot, moveSlot) {

    Swal.fire({
        width: "80%",
        showConfirmButton: false,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            htmlContainer: "custom-swal-html",
        },
        showClass: {
            popup: "animate__animated animate__fadeIn animate__faster"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut animate__faster"
        },
        html: "testing" //renderMoveFilter(Globals.Parameters.VersionId, slot)
    });

}

function removePokemon (slot) {
    Globals.Parameters.Team[slot].id = null;
}