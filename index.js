Globals = function (database, parameters) {

    const createProxy = p => new Proxy({
        Version: p?.Version || 1,
        Team: new Array(6).fill(null).map((_, i) => new Proxy({
            id: p?.Team[i]?.id || null,
            ability: p?.Team[i]?.ability || null,
            nature: p?.Team[i]?.nature || null,
            gender: p?.Team[i]?.gender || null,
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
            console.log("[PROXY]", param, "=", value);
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
            Globals.Parameters.Team[i].id = Math.floor(Math.random() * 1000);
        }
    }

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

    const generationToVersionDictionary = Object.values(versions).groupBy(v => versionGroups[v.versionGroup].generation);

    const optgroups = Object.keys(generationToVersionDictionary).map(generationId => {
        return `
            <optgroup label="${generations[generationId]}">
                ${generationToVersionDictionary[generationId].map(v => `<option value="${v.id}">${v.name}</option>`).join("")}
            </optgroup>
        `;
    });

    element.innerHTML = optgroups.join("\r\n");

    element.value = Globals.Parameters.Version;

    element.onchange = e => {

        const version = parseInt(e.target.value);

        if (Globals.Parameters.Team.some(p => p.id)) {
            const choice = confirm("Changing the game version will reset your team. Are you sure you want to change the game version?");
            if (choice) {
                Globals.Reset();
                Globals.Parameters.Version = version;
            }
        } else {
            Globals.Parameters.Version = version;
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
                ${renderPokemon(Globals.Database.Pokemons[pokemonId], Globals.Parameters.Team[i])}
            `;

        } else {
            
            // clear box

            // render button
            document.getElementById(`team-slot-${slot}`).innerHTML = `
                <button class="add-pokemon" onclick="showFilterSwal()">ADD POKEMON</button>
            `;

        }

    }

}

function showFilterSwal () {

    //const slotNumber = parseInt(e.target.closest("div.pokemon").id.split("-")[2]);

    // Swal.fire({
    //     confirmButtonText: "Close",
    //     html: `
    //         <div class="box">
    //             TEAM WIDTH: ${document.getElementById("team").clientWidth}px
    //             SCREEN: W:${window.innerWidth}px H:${window.innerHeight}px
    //         </div>
    //     `
    // });

    Swal.fire({
        showConfirmButton: false,
        customClass: {
            container: "responsive-swal-container",
            popup: "responsive-swal-popup",
            htmlContainer: "responsive-swal-html",
        },
        showClass: {
            popup: "animate__animated animate__fadeIn animate__faster"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut animate__faster"
        },
        html: `        
            <div class="flex-rows">

                <div class="flex-columns gap grow wrap">

                    <div class="flex-rows fixed-width gap">
                        <button>Filter</button>
                        <button>Cancel</button>
                    </div>

                    <div class="grid grow">
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                        <div class="box">pokemon</div>
                    </div>

                </div>

            </div>
        `
    });

}