function renderMove (pokemonId, learn, versionGroupId, clickCallback, disable) {

    const move = Globals.Database.Moves[learn.moveId];
    const learnMethodName = formatLearnMethodName(learn, versionGroupId);
    const generationId = Globals.Database.VersionGroups[versionGroupId].generationId;
    const damageClassId = determineDamageClass(move.typeId, move.damageClassId, generationId);
    const pokemon = Globals.Database.Pokemons[pokemonId];
    const stab = damageClassId != 1 && pokemon.types.includes(move.typeId);

    // 2 = physical | 3 = special
    const highestAttackAttributeId = pokemon.stats.atk.base === pokemon.stats.spatk.base ? 0 : (pokemon.stats.atk.base > pokemon.stats.spatk.base ? 2 : 3);
    const hadc = highestAttackAttributeId === 0 ? false : (damageClassId === highestAttackAttributeId);

    return `
        <div>
            <div class="move flex-rows ${disable ? "disabled" : ""}" title="${move.effect}" onclick="${!disable ? clickCallback : ""}">
                <div class="flex-columns align-center">
                    <div class="grow">
                        <label>${move.name.toUpperCase()}</label>
                    </div>  
                    <div>
                        ${renderType(move.typeId, stab)}
                    </div>    
                    <div>
                        ${renderDamageClass(damageClassId, hadc)}
                    </div>       
                </div>
                <div class="flex-columns gap">
                    <div style="width: 25%">
                        <label>${learnMethodName}</label>
                    </div>  
                    <div class="flex-columns" style="width: 25%">
                        <label>PWR&nbsp;</label>
                        <label>${move.power || "---"}</label>
                    </div>
                    <div class="flex-columns" style="width: 25%">
                        <label>ACC&nbsp;</label>
                        <label>${move.accuracy || "---"}</label>
                    </div>
                    <div class="flex-columns" style="width: 25%">
                        <label>PP&nbsp;</label>
                        <label>${move.pp}</label>
                    </div>
                </div>                
            </div>            
            <div class="flex-rows move-info">
                <label>TARGET [<span>${Globals.Database.MoveTargets[move.targetId].name.toUpperCase()}</span>]</label>
                <hr>
                <small>${formatMoveEffect(move)}</small>
                ${learn.preEvolution ? `<hr><label style="color: goldenrod;">PRE-EVOLUTION (${Globals.Database.Pokemons[learn.pokemonId].name.toUpperCase()})</label>` : ""}
            </div>
        </div>
    `;

}

function formatLearnMethodName (learn, versionGroupId) {
    switch (learn.methodId) {
        case 1: return `LV ${learn.level}`;
        case 2: return `EGG`;
        case 3: return `TUTOR`; 
        case 4: {
            const machineName = Globals.Database.Items[Globals.Database.Machines[versionGroupId][learn.moveId]].name;
            return `${machineName.slice(0, 2).toUpperCase()} ${machineName.slice(2)}`
        }
        default: return Globals.Database.MoveLearnMethods[learn.method];
    }
}

// determine move damage class based on generation
// in games prior to Generation IV, the type of a damaging move determines whether the move is physical or special
// https://bulbapedia.bulbagarden.net/wiki/Damage_category
function determineDamageClass (typeId, damageClassId, generationId) {
    if (generationId >= 4 || damageClassId === 1) {
        return damageClassId;
    } else {
        switch (typeId) {
            case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: return 2;
            case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: return 3; 
        }
    }
}

function formatMoveEffect (move) {
    return move.effect.replace("$effect_chance", move.effectChance).replace(/\{.*?\}/g, "").replace(/\[/g, "").replace(/\]/g, "");
}