function renderChecklist () {

    const entryHazardMoveIds = [
        191, // spikes 
        446, // stealth rock
        390, // toxic spikes
        564, // sticky web
        830, // stone axe
    ];

    const hasEntryHazard = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => entryHazardMoveIds.includes(m.moveId)));

    return `
       <div>ENTRY HAZARD = ${hasEntryHazard}</div>
    `;

}

/*
    let checklist = {
      'General': {
        'Entry Hazard': store.doesTeamHaveMoves([
          'spikes',
          'stealthrock',
          'toxicspikes',
          'stickyweb',
          'stoneaxe',
        ]), 
        'Spinner/Defogger': store.doesTeamHaveMoves([
          'rapidspin',
          'defog',
          'courtchange',
          'tidyup',
          'mortalspin',
        ]), 
        'Reliable Recovery': store.doesTeamHaveMoves([
          'healorder',
          'floralhealing',
          'milkdrink',
          'moonlight',
          'morningsun',
          'recover',
          'roost',
          'shoreup',
          'softboiled',
          'strengthsap',
          'synthesis',
        ]) || this.hasWishAndProtect(),
      },
      'Defensive': {
        'Cleric': store.doesTeamHaveMoves(['aromatherapy', 'healbell']), 
        'Status Move': store.anyStatusMoves, 
        'Phazer': store.doesTeamHaveMoves([
          'circlethrow',
          'dragontail',
          'roar',
          'whirlwind',
        ]),
      },
      'Offensive': {
        'Boosting Move': store.anyBoostingMoves, 
        'Volt-turn Move': store.doesTeamHaveMove('voltswitch')
          || store.doesTeamHaveMove('uturn')
          || store.doesTeamHaveMove('flipturn'), 
        'Choice Item': store.doesTeamHaveItems([
          'choicescarf',
          'choiceband',
          'choicespecs',
        ]),
      },
    }
*/