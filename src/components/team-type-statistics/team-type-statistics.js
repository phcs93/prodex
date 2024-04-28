function renderTeamTypeStatistics() {

    const pokemonIds = Globals.Parameters.Team.filter(p => p.id).map(p => p.id);

    const teamDefenses = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (const pokemonId of pokemonIds) {
        const pokemon = Globals.Database.Pokemons[pokemonId];
        const typeEffectiveness = pokemon.typeEfficacy;
        for (let i = 0; i < teamDefenses.length; i++) {
            if (typeEffectiveness[i] < 1) {
                if (typeEffectiveness[i] === 0.5) {
                    teamDefenses[i] += 2;
                } else if (typeEffectiveness[i] === 0.25) {                
                    teamDefenses[i] += 4;
                }                
            } else if (typeEffectiveness[i] > 1) {
                teamDefenses[i] -= typeEffectiveness[i];
            }            
        }
    }

    const teamOffences = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (const slot of Globals.Parameters.Team) {
        if (slot) {
            for (const learn of slot.moves) {
                if (learn) {
                    const move = Globals.Database.Moves[learn.moveId];
                    if (move.damageClassId !== 1) { // only attacks
                        for (const targetTypeId of Object.keys(Globals.Database.TypeEfficacy[move.typeId])) {
                            const value = Globals.Database.TypeEfficacy[move.typeId][targetTypeId];
                            if (value > 1) {
                                teamOffences[targetTypeId-1] += 1;
                            }
                        }
                    }
                }
            }
        }
    }

    return `
        <div class="box flex-rows gap">
            <label class="divider">TEAM TYPE DEFENSES</label>
            <div class="flex-rows gap" style="width: 256px;">
                <small><span class="info">ⓘ</span> negative means your team is vulnerable against that type</small>
                <small><span class="info">ⓘ</span> positive means your team is resistant against that type</small>
                ${renderTypesEffectiveness(teamDefenses, v => v > 0 ? "good" : (v < 0 ? "bad" : "hide"))}
            </div>
            <label class="divider">TEAM TYPE COVERAGE</label>
            <div class="flex-rows gap" style="width: 256px;">
                <small><span class="info">ⓘ</span> number of super effective moves your team has against each type</small>
                ${renderTypesEffectiveness(teamOffences, v => v > 0 ? "good" : "bad")}
            </div>
        </div>
    `;

}