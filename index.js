Globals = function (database, parameters) {

    this.Database = database;

    this.ProxyHandler = {
        set: (target, param, value) => {
            console.log("[PROXY]", param, "=", value);
            target[param] = value;
            const url = new URL(window.location);
            url.searchParams.set("parameters", JSON.stringify(Globals.Parameters));
            window.history.pushState(null, "", url.toString());
            render();
        }
    };

    this.Parameters = new Proxy({
        Version: parameters?.Version || 1,
        Team: new Array(6).fill(null).map((_, i) => new Proxy({
            id: parameters?.Team[i]?.id || null,
            ability: parameters?.Team[i]?.ability || null,
            nature: parameters?.Team[i]?.nature || null,
            gender: parameters?.Team[i]?.gender || null,
            shiny: parameters?.Team[i]?.shiny || null,
            moves: new Proxy(new Array(4).fill(null).map((_, m) => parameters?.Team[i]?.moves[m] || null), this.ProxyHandler)
        }, this.ProxyHandler))
    }, this.ProxyHandler);
    
};

document.addEventListener("DOMContentLoaded", async () => {
    
    Globals = new Globals(
        JSON.parse(pako.ungzip(await (await fetch("res/database.bin")).arrayBuffer(), { to: "string" })),
        JSON.parse(new URL(window.location).searchParams.get("parameters"))
    );
    
    Globals.Database.TypeEnum = Object.keys(Globals.Database.Types).reduce((acc, typeId) => { acc[Globals.Database.Types[typeId]] = typeId; return acc; }, {});

    render();

    // randomize
    for (let i = 0; i < 6; i++) {
        if (Math.random() > 0.5) {
            Globals.Parameters.Team[i].id = null;
        } else {
            Globals.Parameters.Team[i].id = Math.floor(Math.random() * 700);
        }
    }

});

function render() {

    renderVersions();

    renderTeam();

}

function renderVersions () {

    const versions = Globals.Database.Versions;
    const versionGroups = Globals.Database.VersionGroups;
    const generations = Globals.Database.Generations;

    const element = document.getElementById("version");

    const generationToVersionDictionary = Object.values(versions).groupBy(v => versionGroups[v.versionGroup].generation);

    const optgroups = Object.keys(generationToVersionDictionary).map(generationId => {
        return `
            <optgroup label="${generations[generationId]}">
                ${generationToVersionDictionary[generationId].map(v => `<option value="${v.id}">${v.name}</option>`).join("")}
            </optgroup>
        `;
    });

    element.innerHTML = optgroups.join("\r\n");

    element.onchange = e => {

        Globals.Parameters.Version = parseInt(e.target.value);

    };

    element.value = Globals.Parameters.Version;

}

function renderTeam() {

    for (const i in Globals.Parameters.Team) {

        const slot = parseInt(i) + 1;

        const pokemonId = Globals.Parameters.Team[i].id;

        if (pokemonId) {

            // clear box

            // render details
            document.getElementById(`team-slot-${slot}`).innerHTML = `
                ${renderPokemon(Globals.Database.Pokemons[pokemonId], Globals.Parameters.Team[i])}
            `;

        } else {
            
            // clear box

            // render button
            document.getElementById(`team-slot-${slot}`).innerHTML = `
                <button class="add-pokemon">ADD POKEMON</button>
            `;

        }

    }

}

function showSwal (slot) {

    const slotNumber = parseInt(e.target.closest("div.pokemon").id.split("-")[2]);

    Swal.fire({
        confirmButtonText: "Close",
        html: `
            <div class="box">
                TEAM WIDTH: ${document.getElementById("team").clientWidth}px
                SCREEN: W:${window.innerWidth}px H:${window.innerHeight}px
            </div>
        `
    });

}