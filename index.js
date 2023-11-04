Globals = function (database, parameters) {

    const createProxy = p => new Proxy({
        VersionId: p?.VersionId || 1,
        Team: new Array(6).fill(null).map((_, i) => new Proxy({
            id: p?.Team[i]?.id || null,
            ability: p?.Team[i]?.ability || null,
            nature: p?.Team[i]?.nature || null,
            gender: p?.Team[i]?.gender || "M",
            shiny: p?.Team[i]?.shiny || null,
            moves: new Proxy(new Array(4).fill(null).map((_, m) => p?.Team[i]?.moves[m] || null), proxyHandler)
        }, proxyHandler))
    }, proxyHandler);

    const updateUrl = () => {
        const url = new URL(window.location);
        url.searchParams.set("parameters", JSON.stringify(this.Parameters));
        window.history.pushState(null, "", url.toString());
    };

    const proxyHandler = {
        set: (target, param, value) => {
            //console.log("[PROXY]", param, "=", value);
            target[param] = value;
            updateUrl();
            render();
        }
    };

    this.Parameters = createProxy(parameters);

    this.Database = database;

    this.Reset = () => {        
        this.Parameters = createProxy();
        updateUrl();        
        render();
        
    }
    
};

document.addEventListener("DOMContentLoaded", async () => {
    
    Globals = new Globals(
        JSON.parse(pako.ungzip(await (await fetch("res/database.gzip")).arrayBuffer(), { to: "string" })),
        JSON.parse(new URL(window.location).searchParams.get("parameters"))
    );

    render();

    // randomize team
    Globals.Reset();
    Globals.Parameters.VersionId = Math.floor(Math.random() * 24) + 1;
    for (let i = 0; i < 6; i++) {
        if (Math.random() > 0.5/*false*/) {
            Globals.Parameters.Team[i].id = null;
        } else {
            Globals.Parameters.Team[i].id = Math.floor(Math.random() * 100);

            // set moves randomly
            for (let m = 0; m < Math.floor(Math.random() * 5); m++) {
                if (/*Math.random() > 0.8*/true) {
                    const versionGroupId = Globals.Database.Versions[Globals.Parameters.VersionId].versionGroupId;
                    const learns = Globals.Database.Pokemons[Globals.Parameters.Team[i].id].moves[versionGroupId];
                    if (learns) {
                        Globals.Parameters.Team[i].moves[m] = learns[Math.floor(Math.random() * Object.keys(learns).length)];
                    }
                }
            }

        }
    }

    window.onpopstate = function(e) {
        if (Swal.getPopup()) {
            Swal.close();
            e.preventDefault();
        }
    };

});

function reset () {
    if (confirm("Are you sure you want to reset the team?")) {
        Globals.Reset();
    }
}

function render () {

    renderVersions();

    renderTeam();

}

function renderVersions () {

    const versions = Globals.Database.Versions;
    const versionGroups = Globals.Database.VersionGroups;
    const generations = Globals.Database.Generations;

    const element = document.getElementById("version");

    const generationToVersionDictionary = Object.values(versions).groupBy(v => versionGroups[v.versionGroupId].generationId);

    const optgroups = Object.keys(generationToVersionDictionary).map(generationId => {
        return `
            <optgroup label="${generations[generationId].name}">
                ${generationToVersionDictionary[generationId].map(v => `<option value="${v.id}">${v.name}</option>`).join("")}
            </optgroup>
        `;
    });

    element.innerHTML = optgroups.join("\r\n");

    element.value = Globals.Parameters.VersionId;

    element.onchange = e => {

        const versionId = parseInt(e.target.value);

        if (Globals.Parameters.Team.some(p => p.id)) {
            const choice = confirm("Changing the game version will reset your team. Are you sure you want to change the game version?");
            if (choice) {
                Globals.Reset();
                Globals.Parameters.VersionId = versionId;
            }
        } else {
            Globals.Parameters.VersionId = versionId;
        }        

    };

}

function renderTeam () {

    for (const i in Globals.Parameters.Team) {

        const slot = parseInt(i) + 1;

        const pokemonId = Globals.Parameters.Team[i].id;

        if (pokemonId) {

            // clear box

            // render details
            document.getElementById(`team-slot-${slot}`).innerHTML = `
                ${renderPokemon(Globals.Database.Pokemons[pokemonId], Globals.Parameters.Team[i], slot, Globals.Parameters.VersionId)}
            `;

        } else {
            
            // clear box

            // render button
            document.getElementById(`team-slot-${slot}`).innerHTML = `
                <button class="add-pokemon" onclick="showPokemonFilterSwal(${slot})">ADD POKEMON</button>
            `;

        }

    }

}