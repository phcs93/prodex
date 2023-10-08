function renderTarget (targetId) {
    return `
        <div class="flex-columns grow">
            <div class="grow">
                <label>TARGET</label>
            </div>
            <label>${Globals.Database.MoveTargets[targetId].name.toUpperCase()}</label>
        </div>
    `;
}