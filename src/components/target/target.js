function renderTarget (targetId) {
    return `
        <div class="target" data-target-id="${targetId}">
            ${Globals.Database.MoveTargets[targetId].toUpperCase().slice(0, 2)}
        </div>
    `;
}