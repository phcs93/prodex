function showMoveSelectorSwal (teamSlot, moveSlot) {

    const pokemonId = Globals.Parameters.Team[teamSlot-1].id;
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
        html: renderMoveSelector(pokemonId, versionGroupId, teamSlot, moveSlot),
        didOpen: () => document.activeElement.blur()
    });

    filterMoves(pokemonId, versionGroupId, teamSlot, moveSlot);

}

function renderMoveSelector (pokemonId, versionGroupId, teamSlot, moveSlot) {

    return `
        <div class="flex-rows gap padding">
            <div class="flex-rows">
                <label for="move-filter">FILTER</label>
                <input type="text" name="move-filter" id="move-filter" oninput="filterMoves(${pokemonId}, ${versionGroupId}, ${teamSlot}, ${moveSlot});" />
            </div>
            <button class="select-move-button" onclick="selectEmptyMove(${teamSlot}, ${moveSlot})">NONE</button>
            <div id="move-list" class="flex-rows gap">
                
            </div>
        </div>
    `;
    
}

function filterMoves (pokemonId, versionGroupId, teamSlot, moveSlot) {

    const filter = document.getElementById("move-filter").value.toUpperCase();

    const setMovesIds = Globals.Parameters.Team[teamSlot-1].moves.filter(l => l).map(l => l.moveId);
    const learns = Object.values(Globals.Database.Pokemons[pokemonId].moves[versionGroupId]);
    const generationId = Globals.Database.VersionGroups[versionGroupId].generationId;

    const damageClassIdToText = {
        "1": "STATUS",
        "2": "PHYSICAL",
        "3": "SPECIAL"
    };

    const moves = learns.filter(l => (
        // name
        filter.split(" ").some(f => Globals.Database.Moves[l.moveId].name.toUpperCase().indexOf(f) > -1) ||
        // type
        filter.split(" ").some(f => Globals.Database.Types[Globals.Database.Moves[l.moveId].typeId].name.toUpperCase().indexOf(f) > -1) ||
        // damage class
        filter.split(" ").some(f => damageClassIdToText[determineDamageClass(Globals.Database.Moves[l.moveId].typeId, Globals.Database.Moves[l.moveId].damageClassId, generationId)].indexOf(f) > -1) ||
        // effect
        filter.split(" ").some(f => formatMoveEffect(Globals.Database.Moves[l.moveId]).toUpperCase().indexOf(f) > -1) || 
        // target
        filter.split(" ").some(f => Globals.Database.MoveTargets[Globals.Database.Moves[l.moveId].targetId].name.toUpperCase().indexOf(f) > -1)
    ));

    const movesHTML = moves.orderBy(l => l.preEvolution ? 0 : l.methodId).map(learn => renderMove(pokemonId, learn, versionGroupId, `selectMove(${teamSlot}, ${moveSlot}, ${learn.moveId}, ${learn.methodId}, ${learn.level}, ${learn.preEvolution ? "true" : "false"}, ${learn.preEvolution ? learn.pokemonId : "0"})`, setMovesIds.includes(learn.moveId)));

    document.getElementById("move-list").innerHTML = movesHTML.join("");

}

function selectMove (teamSlot, moveSlot, moveId, methodId, level, preEvolution, pokemonId) {
    Globals.Parameters.Team[teamSlot - 1].moves[moveSlot - 1] = {
        moveId: moveId, 
        methodId, 
        level,
        preEvolution,
        pokemonId
    };
    Swal.close();
}

function selectEmptyMove (teamSlot, moveSlot) {
    Globals.Parameters.Team[teamSlot - 1].moves[moveSlot - 1] = null;
    Swal.close();
}