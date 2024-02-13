/**
 * @param {Pokemon} pokemon
 */
function renderEvolutionChain(pokemon) {

    const chain = Globals.Database.Evolutions[pokemon.evolutionChainId];

    console.log(chain);

    const recursiveRender = e => {
        return `
            <div class="flex-columns">
                ${renderPokemonEvolution(Globals.Database.Pokemons[e.specieId], null, e.triggers)}
                <div class="flex-rows gap evolutions">
                    ${e.evolutions.map(_e => recursiveRender(_e)).join("")}
                </div>
            </div>
        `
    };

    return `
        <div class="evolution-chain flex-columns justify-center">
            ${recursiveRender(chain)}
        </div>        
    `;

}

function renderPokemonEvolution(pokemon, pokemonSettings, triggers) {

    let img = null;

    const female = pokemon.flags.hasGenderDifferences && pokemonSettings?.gender === "F" ? "-f" : "";
    const shiny = pokemonSettings?.shiny ? "_s" : "";

    return `

        <div class="evolution flex-columns">
        
            <div class="evolution-triggers" style="align-self: center;">
                ${triggers.length > 0 ? `<img class="arrow" src="res/arrow.svg">` : ""}
            </div>

            <div class="pokemon-header flex-rows" style="align-self: center;">

                <img style="align-self: center; cursor: pointer !important; width: 48px;" src="res/gifs/${pokemon.id}${female}${shiny}.gif" alt="${pokemon.name}" onclick="playCry(this, ${pokemon.id})">

                <div class="flex-rows center-text">
                    <small>#${("0000" + pokemon.pokedexId).slice(-4)}</small>
                    <small style="font-weight: bold;">${pokemon.name}</small>
                    <div class="types flex-rows gap4px" style="margin-top: 4px;">
                        ${pokemon.types.map(typeId => renderType(typeId)).join("")}
                    </div>
                </div>

            </div>

        </div>
        
    `;

}