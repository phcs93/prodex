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

                <div class="flex-columns grow">
                    <button class="input-left-half gender-button male ${pokemonSettings.gender === "M" ? "selected" : ""}" onclick="selectGender(${teamSlot}, 'M')">MALE</button>
                    <button class="input-right-half gender-button female ${pokemonSettings.gender === "F" ? "selected" : ""}" onclick="selectGender(${teamSlot}, 'F')">FEMALE</button>
                </div>

                <label class="el-switch">
                    <input type="checkbox" name="shiny" id="shiny" onchange="selectShiny(this, ${teamSlot});" ${pokemonSettings.shiny ? "checked" : ""} />
                    <span class="el-switch-style"></span>
                    <label for="shiny">SHINY</label>
                </label>

                <hr>

                <div class="flex-rows grow">
                    <label for="nature">NATURE</label>
                    <select name="nature" id="nature" onchange="selectNature(this, ${teamSlot});">
                        <option value="">---</option>
                        ${Object.values(Globals.Database.Natures).map(n => `<optgroup label="-${Globals.Database.Natures[n.id].decreasedStat} +${Globals.Database.Natures[n.id].increasedStat}"><option value="${n.id}" ${pokemonSettings.nature === n.id ? "selected": ""}>${Globals.Database.Natures[n.id].name}</option></optgroup>`).join("")}
                    </select>
                    <div class="flex-rows nature-info">${pokemonSettings.nature ? `<label>-${Globals.Database.Natures[pokemonSettings.nature].decreasedStat} +${Globals.Database.Natures[pokemonSettings.nature].increasedStat}</label>` : ""}</div>
                </div>

                <div class="flex-rows grow">
                    <label for="ability">ABILITY</label>
                    <select name="ability" id="ability" onchange="selectAbility(this, ${teamSlot});">
                        <option value="">---</option>
                        ${pokemon.abilities.map((id,i) => ({id,i})).filter(a => a.id).map(a => `<option value="${a.id}" ${pokemonSettings.ability === a.id ? "selected": ""}>${Globals.Database.Abilities[a.id].name}${a.i === 2 ? " (hidden)" : ""}</option>`).join("")}
                    </select>
                    <div class="flex-rows ability-info">${pokemonSettings.ability ? `<small>${formatAbilityDescription(Globals.Database.Abilities[pokemonSettings.ability])}</small>` : ""}</div>
                </div>

                <hr>

                <div class="flex-rows grow">
                    <label>MOVES</label>
                    <div class="flex-rows gap">
                        ${pokemonSettings.moves[0] ? renderMove(pokemon.id, pokemonSettings.moves[0], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 1)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 1)">SELECT MOVE</button>`}
                        ${pokemonSettings.moves[1] ? renderMove(pokemon.id, pokemonSettings.moves[1], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 2)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 2)">SELECT MOVE</button>`}
                        ${pokemonSettings.moves[2] ? renderMove(pokemon.id, pokemonSettings.moves[2], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 3)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 3)">SELECT MOVE</button>`}
                        ${pokemonSettings.moves[3] ? renderMove(pokemon.id, pokemonSettings.moves[3], versionGroupId, `showMoveSelectorSwal(${teamSlot}, 4)`) : `<button class="select-move-button" onclick="showMoveSelectorSwal(${teamSlot}, 4)">SELECT MOVE</button>`}
                    </div>
                </div>

            </div>

            <div class="flex-rows gap pokemon-details">
                ${renderPokemonDetails(pokemon)}
                <hr>
                ${renderGenderRate(pokemon)}
                <hr>
                ${renderStats(pokemon)}
                <hr>
                ${renderTypesEffectiveness(pokemon)}
                <hr>
                &lt;evolutions&gt;
                <hr>
                &lt;locations&gt;
                <hr>
                &lt;held-items&gt;
                <hr>
                &lt;moves?&gt;
            </div>
            
            <hr>

            <button onclick="removePokemon(${teamSlot})">REMOVE</button>

        </div>
    `;

}

function selectGender (teamSlot, gender) {
    Globals.Parameters.Team[teamSlot - 1].gender = gender
}

function selectShiny (e, teamSlot) {
    Globals.Parameters.Team[teamSlot - 1].shiny = e.checked;
}

function selectAbility (e, teamSlot) {
    Globals.Parameters.Team[teamSlot - 1].ability = parseInt(e.value);
}

function selectNature (e, teamSlot) {
    Globals.Parameters.Team[teamSlot - 1].nature = parseInt(e.value);
}

function formatAbilityDescription (ability) {
    return ability.description.replace(/\{.*?\}/g, "").replace(/\[/g, "").replace(/\]/g, "");
}

function removePokemon (teamSlot) {
    Globals.Parameters.Team[teamSlot-1].id = null;
}