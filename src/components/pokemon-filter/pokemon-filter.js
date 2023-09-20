function renderPokemonFilter (version, slot) {

    return `

        <div class="flex-rows">

            <div class="flex-columns gap grow wrap">

                <div class="flex-rows fixed-width gap">

                    <div class="flex-rows">
                        <label for="name-filter">NAME</label>
                        <input type="text" name="name-filter" id="name-filter" />
                    </div>

                    <button onclick="filterPokemons(${version}, ${slot})">Filter</button>
                    <button>Cancel</button>
                    
                </div>

                <div id="pokemon-grid" class="grid grow">

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