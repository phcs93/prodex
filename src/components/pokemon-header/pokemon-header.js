/**
 * @param {Pokemon} pokemon
 * @param {UserSettings} userSettings
 */
function renderPokemonHeader(pokemon, userSettings) {

    const female = pokemon.flags.hasGenderDifferences && userSettings.gender === "F" ? "-f" : "";
    const shiny = userSettings.shiny ? "_s" : "";

    return `

        <div class="pokemon-header flex-columns">

            <img src="https://raw.githubusercontent.com/phcs93/poke-3d-sprites/main/gifs/${pokemon.id}${female}${shiny}.gif" alt="">

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