/**
 * @param {Pokemon} pokemon
 * @param {UserSettings} userSettings
 */
function renderPokemonHeader(pokemon, userSettings) {

    let name = pokemon.name.toLowerCase();
    let type = "normal";

    if (userSettings.gender === "F") {
        name += "-f";
    }

    if (userSettings.shiny) {
        type = "shiny";
    }

    return `
        <div class="pokemon-header flex-columns">

            <img src="https://raw.githubusercontent.com/phcs93/poke-3d-sprites/main/${pokemon.id}.gif" alt="">

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
