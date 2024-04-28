function renderChecklist() {

    const entryHazardMoveIds = [
        191, // spikes 
        446, // stealth rock
        390, // toxic spikes
        564, // sticky web
        830, // stone axe
    ];
    const hasEntryHazard = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => entryHazardMoveIds.includes(m.moveId)));

    const spinnerDeffogerMoveIds = [
        229, // rapid spin 
        432, // defog
        756, // court change
        882, // tidy up
        866, // mortal spin
    ];
    const hasSpinnerDeffoger = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => spinnerDeffogerMoveIds.includes(m.moveId)));
 
    const reliableRecoveryMoveIds = [
        105, // recover
        135, // soft boiled
        208, // milk drink
        234, // morning sun
        235, // synthesis
        236, // moonlight
        355, // roost
        456, // heal order
        659, // shore up 
        666, // floral healing
        668, // strength sap
    ];
    const wishAndProtectIds = [
        182, // protect
        273, // wish
    ];
    const hasReliableRecovery = Globals.Parameters.Team.some(p => (
        p.moves.filter(m => m).some(m => reliableRecoveryMoveIds.includes(m.moveId)) ||
        wishAndProtectIds.every(id => p.moves.filter(m => m).some(m => m.moveId === id))
    )); 

    const clericMoveIds = [
        215, // heal bell
        312, // aromatherapy
    ];
    const hasCleric = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => clericMoveIds.includes(m.moveId)));

    const ailmentStatusMoveIds = Object.values(Globals.Database.Moves).filter(m => m.meta && [1,4].includes(m.meta.metaCategoryId)).map(m => m.id);
    const hasStatus = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => ailmentStatusMoveIds.includes(m.moveId)));

    const phazerMoveIds = [
        18, // whirlwind
        46, // roar
        509, // circle throw
        525, // dragon tail
    ];
    const hasPhazer = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => phazerMoveIds.includes(m.moveId)));

    const boostingMoveIds = Object.values(Globals.Database.Moves).filter(m => m.meta && [2].includes(m.meta.metaCategoryId)).map(m => m.id);
    const hasBoosting = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => boostingMoveIds.includes(m.moveId)));

    const voltTurnMoveIds = [
        369, // u turn
        521, // volt switch
        812, // flip turn
    ];
    const hasVoltTurn = Globals.Parameters.Team.some(p => p.moves.filter(m => m).some(m => voltTurnMoveIds.includes(m.moveId)));

    const choiceItemIds = [
        197, // choice band
        264, // choice scarf
        274, // choice specs
    ];
    const hasChoiceItem = Globals.Parameters.Team.some(p => choiceItemIds.includes(p.item));

    return `
        <div class="box">
            <label class="divider">TEAM CHECKLIST</label>
            <div data-boolean="${hasEntryHazard}"><label>ENTRY HAZARD</label></div>
            <div data-boolean="${hasSpinnerDeffoger}"><label>SPINNER/DEFFOGER</label></div>
            <div data-boolean="${hasReliableRecovery}"><label>RELIABLE RECOVERY</label></div>
            <div data-boolean="${hasCleric}"><label>CLERIC</label></div>
            <div data-boolean="${hasStatus}"><label>STATUS</label></div>
            <div data-boolean="${hasPhazer}"><label>PHAZER</label></div>
            <div data-boolean="${hasBoosting}"><label>BOOSTING</label></div>
            <div data-boolean="${hasVoltTurn}"><label>VOLT-TURN</label></div>
            <div data-boolean="${hasChoiceItem}"><label>CHOICE ITEM</label></div>
       </div>
    `;

}