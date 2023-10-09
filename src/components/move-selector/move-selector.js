function showMoveSelectorSwal (teamSlot, moveSlot) {

    const pokemonId = Globals.Parameters.Team[teamSlot].id;
    const versionGroupId = Globals.Database.Versions[Globals.Parameters.VersionId].versionGroupId;

    Swal.fire({
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
        html: renderMoveSelector(pokemonId, versionGroupId, teamSlot, moveSlot)
    });

}

function renderMoveSelector (pokemonId, versionGroupId, teamSlot, moveSlot) {

    const learns = Object.values(Globals.Database.Pokemons[pokemonId].moves[versionGroupId]);

    return `
        <div class="flex-rows gap padding">
            <button class="select-move-button" onclick="selectEmptyMove(${teamSlot}, ${moveSlot})">NONE</button>
            ${learns.map(learn => renderMove(learn, versionGroupId, `selectMove(${teamSlot}, ${moveSlot}, ${learn.id}, ${learn.methodId}, ${learn.level})`)).join("")}
        </div>
    `;
    
}

function selectMove (teamSlot, moveSlot, moveId, methodId, level) {
    Globals.Parameters.Team[teamSlot - 1].moves[moveSlot - 1] = {id: moveId, methodId, level};
    Swal.close();
}

function selectEmptyMove (teamSlot, moveSlot) {
    Globals.Parameters.Team[teamSlot - 1].moves[moveSlot - 1] = null;
    Swal.close();
}