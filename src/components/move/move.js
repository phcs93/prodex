function renderMove (learn, versionGroupId) {

    const move = Globals.Database.Moves[learn.id];
    const method = formatLearnMethodName(learn, versionGroupId);

    return `
        <div class="move flex-rows">
            <div class="flex-columns align-center">
                <div class="grow">
                    <label>${method}</label>
                </div>  
                <div>
                    <label>${move.name.toUpperCase()}</label>
                </div>                
            </div>
            <div class="flex-columns align-center">
            <div class="grow"></div>
                <div>
                    ${renderTarget(move.targetId)}
                </div>
                <div>
                    ${renderDamageClass(move.damageClassId)}
                </div>                
                <div>
                    ${renderType(move.typeId)}
                </div>   
            </div>
            <div class="flex-columns align-center">
                <small>PWR</small>
                <small>${move.power}</small>
                <small>ACC</small>
                <small>${move.accuracy}</small>
                <small>PP</small>
                <small>${move.pp}</small>
            </div>
        </div>
    `;

}

function formatLearnMethodName (learn, versionGroupId) {
    switch (learn.method) {
        case 1: return `LV ${learn.level}`;
        case 2: return `EGG`;
        case 3: return `TUTOR`; 
        case 4: {
            const machineName = Globals.Database.Items[Globals.Database.Machines[versionGroupId][learn.id]].name;
            return `${machineName.slice(0, 2).toUpperCase()} ${machineName.slice(2)}`
        }
        default: return Globals.Database.MoveLearnMethods[learn.method];
    }    
}