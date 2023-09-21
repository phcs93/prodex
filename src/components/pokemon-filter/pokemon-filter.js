function renderPokemonFilter (version, slot) {

    const typeOptions = Object.keys(Globals.Database.Types).map(t => `<option value="${t}">${Globals.Database.Types[t]}</option>`).join("");

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

                            <div class="flex-columns">
                                <div class="flex-rows grow">
                                    <label for="type1-filter">TYPE 1</label>
                                    <select name="type1-filter" id="type1-filter" class="input-left-half">
                                        <option value="">---</option>
                                        ${typeOptions}
                                    </select>
                                </div>
                                <div class="flex-rows grow">
                                    <label for="type-filter">TYPE 2</label>
                                    <select name="type-filter" id="type2-filter" class="input-right-half">
                                        <option value="">---</option>
                                        ${typeOptions}
                                    </select>
                                </div>
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

                <div class="flex-rows grow padding gap">

                    <label id="number-of-matches" style="text-align: center !important; font-size: 24px;"></label>

                    <div id="pokemon-grid" class="grid">

                    </div>

                </div>

            </div>

        </div>

    `;

}

function filterPokemons (version, slot) {

    const name = document.getElementById("name-filter").value;
    const generation = parseInt(document.getElementById("generation-filter").value);
    const type1 = parseInt(document.getElementById("type1-filter").value);
    const type2 = parseInt(document.getElementById("type2-filter").value);
    const onlyObtainable = document.getElementById("only-obtainable-filter").checked;

    const pokemonsHTMLs = [];

    for (const pokemon of Object.values(Globals.Database.Pokemons)) {

        let show = true;
        const matches = [];

        if (name) {
            if (pokemon.name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
                matches.push(`NAME INCLUDES "${name.toUpperCase()}"`);
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

        if (type1) {
            if (pokemon.types.includes(type1)) {
                matches.push(`IS OF TYPE "${Globals.Database.Types[type1].toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        if (type2) {
            if (pokemon.types.includes(type2)) {
                matches.push(`IS OF TYPE "${Globals.Database.Types[type2].toUpperCase()}"`);
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
                <div>
                    <div class="flex-rows gap box filtered-pokemon" onclick="selectPokemon(${pokemon.id}, ${slot})">
                        ${renderPokemonHeader(pokemon, null, false)}
                    </div>
                    <div class="filter-matches flex-rows">
                        ${matches.map(m => `<label>${m}</label>`).join("")}
                    </div>
                </div>
            `);
        }        
    }

    document.getElementById("number-of-matches").innerHTML = `FOUND ${pokemonsHTMLs.length} MATCHES`;
    document.getElementById("pokemon-grid").innerHTML = pokemonsHTMLs.join("");

}

function selectPokemon (id, slot) {
    Globals.Parameters.Team[slot-1].id = id;
    Swal.close();
}