/**
 * @param {Pokemon} pokemon
 */
function renderEvolutionChain(pokemon) {

    const chain = Globals.Database.Evolutions[pokemon.evolutionChainId];

    const recursiveRender = e => {
        return `
            <div class="flex-columns grow">
                <div class="flex-rows self-center grow">
                    ${renderPokemonEvolution(Globals.Database.Pokemons[e.specieId], null, e.triggers)}
                </div>
                ${e.evolutions.length > 0 ? `<div class="flex-rows evolutions grow gap">` : "" }
                ${e.evolutions.length > 0 ? e.evolutions.map(_e => recursiveRender(_e)).join("") : "" }
                ${e.evolutions.length > 0 ? `</div>` : "" }
            </div>
        `
    };

    return `
        <div class="evolution-chain flex-columns justify-center">
            ${recursiveRender(chain)}
        </div>        
    `;

}

function renderPokemonEvolution (pokemon, pokemonSettings, triggers) {

    let img = null;

    const female = pokemon.flags.hasGenderDifferences && pokemonSettings?.gender === "F" ? "-f" : "";
    const shiny = pokemonSettings?.shiny ? "_s" : "";

    return `

        <div class="evolution flex-columns grow ${triggers.length > 0 ? "space-between" : ""}" style="width: 100%;" >
        
            <div class="flex-rows justify-center evolution-triggers center-text">
                ${triggers.length > 0 ? `<img class="arrow" style="align-self: center;" src="res/arrow.svg">` : ""}
                ${renderTriggers(triggers)}
            </div>

            <div class="pokemon-header flex-rows" style="align-self: center;">

                <img style="align-self: center; cursor: pointer !important; width: 48px;" src="res/gifs/${pokemon.id}${female}${shiny}.gif" alt="${pokemon.name}" onclick="playCry(this, ${pokemon.id})">

                <div class="flex-rows center-text">
                    <small>#${("0000" + pokemon.pokedexId).slice(-4)}</small>
                    <small style="font-weight: bold;">${pokemon.name}</small>
                    <div class="types flex-rows gap4px" style="margin-top: 4px;">
                        ${pokemon.types.map(typeId => renderType(typeId)).join("")}
                    </div>
                </div>

            </div>

        </div>
        
    `;

}

function renderTriggers (triggers) {

    const renderTrigger = (trigger) => {
        
        const minimumLevel = trigger.minimumLevel ? trigger.minimumLevel : "";
        const triggerItemName = trigger.triggerItemId ? Globals.Database.Items[trigger.triggerItemId].name : "";
        const heldItemId = trigger.heldItemId ? `<img class="item-sprite" data-id="${trigger.heldItemId}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${Globals.Database.Items[trigger.heldItemId].name}"><br>holding<br>${Globals.Database.Items[trigger.heldItemId].name}` : "";
        const genderId = trigger.genderId ? (trigger.genderId === 1 ? "♀" : "♂") : "";
        const minimumAffection = trigger.minimumAffection ? `with ${trigger.minimumAffection} affection` : "";
        const minimumBeauty = trigger.minimumBeauty ? `with ${trigger.minimumBeauty} beauty` : "";
        const minimumHappiness = trigger.minimumHappiness ? `with ${trigger.minimumHappiness} happiness` : "";  
        const knownMove = trigger.knownMoveId ? `knows ${Globals.Database.Moves[trigger.knownMoveId].name}` : "";
        const knownMoveType = trigger.knownMoveTypeId ? `knows a ${Globals.Database.Types[trigger.knownMoveTypeId].name} move` : "";
        const location = trigger.locationId ? `at ${Globals.Database.Locations[trigger.locationId].name}` : "";
        const needsOverworldRain = trigger.needsOverworldRain ? "while raining" : "";
        const turnUpsideDown = trigger.turnUpsideDown ? "turn upside down" : "";
        const partySpecies = trigger.partySpeciesId ? `with a ${Globals.Database.Pokemons[trigger.partySpeciesId].name} in party` : "";
        const partyType  = trigger.partyTypeId ? `with a ${Globals.Database.Types[trigger.partyTypeId].name} pokemon in party` : "";
        const timeOfDay = trigger.timeOfDay ? `at ${trigger.timeOfDay}` : "";
        const tradeSpecies = trigger.tradeSpeciesId ? `trade ${Globals.Database.Pokemons[trigger.tradeSpeciesId].name}` : "";
        const relativePhysicalStats = trigger.relativePhysicalStats ? getrelativePhysicalStatsText(trigger.relativePhysicalStats) : "";

        return `
            <small>${getTriggerLabel(trigger)}</small>
            <small>${minimumLevel}</small>
            <small>${triggerItemName}</small>
            <small>${heldItemId}</small>
            <small>${genderId}</small>
            <small>${minimumAffection}</small>
            <small>${minimumBeauty}</small>
            <small>${minimumHappiness}</small>
            <small>${knownMove}</small>
            <small>${knownMoveType}</small>
            <small>${location}</small>
            <small>${needsOverworldRain}</small>
            <small>${turnUpsideDown}</small>
            <small>${partySpecies}</small>
            <small>${partyType}</small>
            <small>${timeOfDay}</small>
            <small>${tradeSpecies}</small>
            <small>${relativePhysicalStats}</small>
        `;

    };

    return triggers.map(t => renderTrigger(t)).join("--- or ---");

}

function getTriggerLabel (trigger) {
    const triggerId = trigger.evolutionTriggerId;
    switch (triggerId) {
        case 1: return "Level";
        case 3: return `<img class="item-sprite" data-id="${trigger.triggerItemId}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${Globals.Database.Items[trigger.triggerItemId].name}">`
        default: return Globals.Database.EvolutionTriggers[triggerId].name;
    }
}

function getrelativePhysicalStatsText (relativePhysicalStats) {
    switch (relativePhysicalStats) {
        case 1: return "Attack > Defense";
        case -1: return "Attack < Defense";
        default: return "Attack = Defense";
    }
}