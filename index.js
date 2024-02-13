Globals = function (database, parameters) {

    const createProxy = p => new Proxy({
        VersionId: p?.VersionId || 1,
        Team: new Array(6).fill(null).map((_, i) => new Proxy({
            id: p?.Team?.at(i).id || null,
            ability: p?.Team?.at(i).ability || null,
            nature: p?.Team?.at(i).nature || null,
            item: p?.Team?.at(i).item || null,
            gender: p?.Team?.at(i).gender || "M",
            shiny: p?.Team?.at(i).shiny || null,
            moves: new Proxy(new Array(4).fill(null).map((_, m) => p?.Team?.at(i).moves[m] || null), proxyHandler)
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
        this.Parameters = createProxy({VersionId: Globals.Parameters.VersionId});
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

    // set example team if none is set
    if (Globals.Parameters.Team.every(p => !p.id)) {

        Globals.Parameters.VersionId = 1;

        Globals.Parameters.Team[0].id = 25;
        Globals.Parameters.Team[0].nature = 3;
        Globals.Parameters.Team[0].ability = 9;
        Globals.Parameters.Team[0].item = 219;        ;
        Globals.Parameters.Team[0].moves[0] = Globals.Database.Pokemons[25].moves[1].find(l => l.moveId === 84);

        Globals.Parameters.Team[1].id = 1;
        Globals.Parameters.Team[1].nature = 3;
        Globals.Parameters.Team[1].ability = 34;
        Globals.Parameters.Team[1].item = 216;
        Globals.Parameters.Team[1].moves[0] = Globals.Database.Pokemons[1].moves[1].find(l => l.moveId === 75);

        Globals.Parameters.Team[2].id = 4;
        Globals.Parameters.Team[2].nature = 3;
        Globals.Parameters.Team[2].ability = 94;
        Globals.Parameters.Team[2].item = 226;
        Globals.Parameters.Team[2].moves[0] = Globals.Database.Pokemons[4].moves[1].find(l => l.moveId === 52);

        Globals.Parameters.Team[3].id = 7;
        Globals.Parameters.Team[3].nature = 3;
        Globals.Parameters.Team[3].ability = 44;
        Globals.Parameters.Team[3].item = 220;
        Globals.Parameters.Team[3].moves[0] = Globals.Database.Pokemons[7].moves[1].find(l => l.moveId === 55);

        Globals.Parameters.Team[4].id = 16;
        Globals.Parameters.Team[4].nature = 11;
        Globals.Parameters.Team[4].ability = 145;
        Globals.Parameters.Team[4].item = 221;
        Globals.Parameters.Team[4].moves[0] = Globals.Database.Pokemons[16].moves[1].find(l => l.moveId === 16);

        Globals.Parameters.Team[5].id = 12;
        Globals.Parameters.Team[5].nature = 3;
        Globals.Parameters.Team[5].ability = 14;
        Globals.Parameters.Team[5].item = 225;
        Globals.Parameters.Team[5].moves[0] = Globals.Database.Pokemons[12].moves[1].find(l => l.moveId === 93);
        Globals.Parameters.Team[5].gender = "F";

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