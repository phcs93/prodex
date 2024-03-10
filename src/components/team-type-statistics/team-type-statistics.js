function renderTeamTypeStatistics() {

    const pokemonIds = Globals.Parameters.Team.filter(p => p.id).map(p => p.id);

    const teamDefenses = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (const pokemonId of pokemonIds) {
        const pokemon = Globals.Database.Pokemons[pokemonId];
        const typeEffectiveness = pokemon.typeEfficacy;
        for (let i = 0; i < teamDefenses.length; i++) {
            teamDefenses[i] += typeEffectiveness[i];
        }
    }

    

    return `
        <label class="divider">TEAM TYPE DEFENSES</label>
        <div style="width: 256px;">
            ${renderTypesEffectiveness(teamDefenses)}
        </div>
    `;

}