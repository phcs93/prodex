function showHeldItemsPopup (pokemonId) {  

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
        html: renderHeldItems(pokemonId)
    });

}

function renderHeldItems (pokemonId) {

    const pokemon = Globals.Database.Pokemons[pokemonId];
    const versionId = Globals.Parameters.VersionId;  
    const items = pokemon.items[versionId];

    const itemsHTML = items.map(i => {

        const getRarityColor = (rarity) => {
            if (rarity < 10) return "red";
            if (rarity < 30) return "orange";
            if (rarity < 50) return "yellow";
            if (rarity < 100) return "green";
        };

        return `
            <div>
                <div class="held-item flex-columns">
                    <div class="flex-columns grow gap">
                        <img class="item-sprite" data-id="${i.id}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${Globals.Database.Items[i.id].name}">
                        <label style="line-height: 30px; height: 30px;">${Globals.Database.Items[i.id].name.toUpperCase()}</label>
                    </div>
                    <div class="self-center">
                        <label style="line-height: 24px; height: 24px;" class="held-item-rarity" data-rarity-color="${getRarityColor(i.rarity)}">${i.rarity}%</label>
                    </div>
                </div>
            </div>
        `;

    });

    return `
        <div class="flex-rows gap padding grow">
            ${itemsHTML.join("")}
        </div>
    `;
    
}

function doesPokemonHoldsItems(pokemonId) {
    const pokemon = Globals.Database.Pokemons[pokemonId];
    const versionId = Globals.Parameters.VersionId;  
    const items = pokemon.items[versionId];
    return !!items;
}