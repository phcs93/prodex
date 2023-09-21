function renderPokemonFilter (version, slot) {

    return `

        <div class="flex-rows">

            <div class="flex-columns grow wrap">

                <div class="flex-rows gap padding box responsive-border-radius">

                    <form onsubmit="event.preventDefault(); filterPokemons(${version}, ${slot});">

                        <div class="flex-rows gap">

                            <div class="flex-rows">
                                <label for="name-filter">NAME</label>
                                <input type="text" name="name-filter" id="name-filter" />
                            </div>

                            <div class="flex-rows">
                                <label for="generation-filter">INTRODUCED IN GENERATION</label>
                                <input type="text" name="generation-filter" id="generation-filter" />
                            </div>

                            <div class="flex-rows">

                                <details>

                                    <summary>CHARACTERISTICS FILTERS</summary>

                                    <div class="flex-rows gap">

                                    </div>

                                </details>

                            </div>

                            <div class="flex-rows">

                                <details>

                                    <summary>MOVE FILTERS</summary>

                                    <div class="flex-rows gap">

                                    </div>

                                </details>

                            </div>

                            <div class="flex-rows">

                                <details>

                                    <summary>ENCOUNTER FILTERS</summary>

                                    <div class="flex-rows gap">

                                       

                                    </div>

                                </details>

                            </div>

                            <label class="el-switch">
                                <input type="checkbox" name="only-obtainable-filter" id="only-obtainable-filter" checked="true" />
                                <span class="el-switch-style"></span>
                                <label for="only-obtainable-filter">OBTAINABLE IN "${Globals.Database.Versions[version].name.toUpperCase()}"</label>
                            </label>

                        </div>

                        <input type="submit" style="display: none;" />

                    </form>

                    <hr>

                    <div class="flex-rows gap">
                        <button type="button" onclick="filterPokemons(${version}, ${slot}); event.preventDefault();">FILTER</button>
                        <button type="button" onclick="Swal.close();">CANCEL</button>
                    </div>                    
                    
                </div>

                <div id="pokemon-grid" class="grid grow padding">

                </div>

            </div>

        </div>

    `;

}

function filterPokemons (version, slot) {

    const name = document.getElementById("name-filter").value;
    const generation = parseInt(document.getElementById("generation-filter").value);
    const onlyObtainable = document.getElementById("only-obtainable-filter").checked;

    const pokemonsHTMLs = [];

    for (const pokemon of Object.values(Globals.Database.Pokemons)) {

        let show = true;
        const matches = [];

        if (name) {
            if (pokemon.name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
                matches.push(`NAME INCLUDES "${name}"`);
            } else {
                show = false;
            }
        }

        if (generation) {
            if (pokemon.introducedInGeneration === generation) {
                matches.push(`INTRODUCED IN GENERATION "${generation}"`);
            } else {
                show = false;
            }
        }

        if (onlyObtainable) {
            if (pokemon.encounters[version]?.length > 0) {
                matches.push(`OBTAINABLE IN "${Globals.Database.Versions[version].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        if (show) {
            pokemonsHTMLs.push(`
                <div class="flex-rows gap box filtered-pokemon" onclick="selectPokemon(${pokemon.id}, ${slot})">
                    ${renderPokemonHeader(pokemon, null, false)}
                    ${matches.length > 0 ? "<hr>" : ""}
                    ${matches.map(m => `<label>${m}</label>`).join("")}
                </div>
            `);
        }

    }

    document.getElementById("pokemon-grid").innerHTML = pokemonsHTMLs.join("");

}

function selectPokemon (id, slot) {
    Globals.Parameters.Team[slot-1].id = id;
    Swal.close();
}