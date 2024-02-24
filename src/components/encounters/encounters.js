function showEncountersPopup (pokemonId) {  

    window.scrollTo(0, 0);

    Swal.fire({
        position: "top",
        width: "300px",
        showConfirmButton: false,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            htmlContainer: "custom-swal-html",
        },
        showClass: {
            popup: "animate__animated animate__fadeIn animate__faster"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut animate__faster"
        },
        html: renderEncounters(pokemonId)
    });

}

function renderEncounters (pokemonId) {

    const pokemon = Globals.Database.Pokemons[pokemonId];
    const versionId = Globals.Parameters.VersionId;  
    const encounters = pokemon.encounters[versionId];

    const encountersHTML = encounters.map(e => {

        if (e.isEvolve) {
            return `
                <div>
                    <div class="encounter flex-rows">
                        <label style="line-height: 24px; height: 24px;">EVOLVE ${e.pokemonsIds.map(pid => Globals.Database.Pokemons[pid].name.toUpperCase()).join(", ")}</label>
                    </div>
                </div>
            `;
        }

        const getRarityColor = (rarity) => {
            if (rarity < 10) return "red";
            if (rarity < 30) return "orange";
            if (rarity < 50) return "yellow";
            if (rarity < 100) return "green";
        };

        return `
            <div>
                <div class="encounter flex-rows">
                    <label style="line-height: 24px; height: 24px;">${Globals.Database.Locations[e.locationId].name.toUpperCase()}</label>
                </div>            
                <div class="flex-rows encounter-info">
                    <div class="flex-columns gap">
                        <div class="grow"><label style="line-height: 24px; height: 24px;">${Globals.Database.EncounterMethods[e.methodId].name.toUpperCase()}</label></div>
                        <div><label style="line-height: 24px; height: 24px;">LVL ${e.minlvl}-${e.maxlvl}</label></div>
                        <div><label style="line-height: 24px; height: 24px;" class="encounter-rarity" data-rarity-color="${getRarityColor(e.rarity)}">${e.rarity}%</label></div>
                    </div>
                    ${e.conditionIds.map(ecid => `<hr><label style="line-height: 24px; height: 24px;">${Globals.Database.EncounterConditions[ecid].name.toUpperCase()}</label>`)}
                </div>
            </div>
        `;

    });

    return `
        <div class="flex-rows gap padding grow">
            ${encountersHTML.join("")}
        </div>
    `;
    
}

function canPokemonBeEncountered(pokemonId) {
    const pokemon = Globals.Database.Pokemons[pokemonId];
    const versionId = Globals.Parameters.VersionId;  
    const encounters = pokemon.encounters[versionId];
    return !!encounters;
}

function isOnlyEvolving (pokemonId) {
    const pokemon = Globals.Database.Pokemons[pokemonId];
    const versionId = Globals.Parameters.VersionId;  
    const encounters = pokemon.encounters[versionId];
    return encounters.length === 1 && encounters.every(e => e.isEvolve) ? encounters[0] : null;
}