function renderPokemonFilter (version, slot) {

    return `

        <div class="flex-rows">

            <div class="flex-columns grow wrap">

                <div class="flex-rows gap padding box responsive-border-radius">

                    <form onsubmit="event.preventDefault(); filterPokemons(${version}, ${slot})">

                        <div class="flex-rows">
                            <label for="name-filter">NAME</label>
                            <input type="text" name="name-filter" id="name-filter" />
                        </div>

                    </form>

                    <hr>

                    <button onclick="event.preventDefault(); filterPokemons(${version}, ${slot})">Filter</button>
                    <button onclick="Swal.close();">Cancel</button>
                    
                </div>

                <div id="pokemon-grid" class="grid grow padding">

                </div>

            </div>

        </div>

    `;

}

function filterPokemons (version, slot) {

    const name = document.getElementById("name-filter").value;

    const pokemons = Object.values(Globals.Database.Pokemons).filter(p => {

        return p.name.toLowerCase().indexOf(name.toLowerCase()) > -1;

    });

    const pokemonsHTMLs = [];

    for (const pokemon of pokemons) {

        pokemonsHTMLs.push(`
            <div class="box filtered-pokemon" onclick="selectPokemon(${pokemon.id}, ${slot})">
                ${renderPokemonHeader(pokemon, null)}
            </div>
        `);

    }

    document.getElementById("pokemon-grid").innerHTML = pokemonsHTMLs.join("");

}

function selectPokemon (id, slot) {
    Globals.Parameters.Team[slot-1].id = id;
    Swal.close();
}