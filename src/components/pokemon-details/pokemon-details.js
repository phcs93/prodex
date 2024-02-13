/**
 * @param {Pokemon} pokemon
 */
function renderPokemonDetails (pokemon) {

    const getAbilityName = (abilityId) => {
        if (!abilityId) return "---";
        return Globals.Database.Abilities[abilityId].name;
    };
    
    const getGrowthRateName = (growthRateId) => {
        return Globals.Database.GrowthRates[growthRateId].name;
    };
    
    const getEggGroupsNames = (eggGroupsIds) => {
        return eggGroupsIds.map(id => Globals.Database.EggGroups[id].name).join(", ");
    };
    
    const getShapeName = (shapeId) => {
        return Globals.Database.Shapes[shapeId]?.name;
    };
    
    const getHabitatName = (habitatId) => {
        if (!habitatId) return "---";
        return Globals.Database.Habitats[habitatId].name;
    };
    
    const getColorName = (colorId) => {
        return Globals.Database.Colors[colorId].name;
    };

    return `

        <div class="flex-rows pokemon-details">

            <div class="flex-columns">
                <label style="">Generation</label>
                <label>${pokemon.introducedInGeneration}</label>
            </div>
            <div class="flex-columns">
                <label>Species</label>
                <label>${pokemon.specie}</label>
            </div>
            <div class="flex-columns">
                <label>Height</label>
                <label>${renderHeight(pokemon.height)}</label>
            </div>
            <div class="flex-columns">
                <label>Weight</label>
                <label>${renderWeight(pokemon.weight)}</label>
            </div>
            <div class="flex-columns">
                <label>Experience</label>
                <label>${pokemon.baseExperience}</label>
            </div>
            <div class="flex-columns">
                <label>Catch Rate</label>
                <label>${renderCaptureRate(pokemon.captureRate)} </label>
            </div>
            <div class="flex-columns">
                <label>Happiness</label>
                <label>${pokemon.baseHappiness}</label>
            </div>
            <div class="flex-columns">
                <label>Growth Rate</label>
                <label>${getGrowthRateName(pokemon.growthRateId)}</label>
            </div>
            <div class="flex-columns">
                <label>Egg Groups</label>
                <label>${getEggGroupsNames(pokemon.eggGroups)}</label>
            </div>
            <div class="flex-columns">
                <label>Hatch Counter</label>
                <label>${pokemon.hatchCounter} cycles (${pokemon.hatchCounter * 255} steps)</label>
            </div>
            <div class="flex-columns">
                <label>Ability 1</label>
                <label>${getAbilityName(pokemon.abilities[0])}</label>
            </div>
            <div class="flex-columns">
                <label>Ability 2</label>
                <label>${getAbilityName(pokemon.abilities[1])}</label>
            </div>
            <div class="flex-columns">
                <label>Hidden Ability</label>
                <label>${getAbilityName(pokemon.abilities[2])}</label>
            </div>
            <div class="flex-columns">
                <label>Color</label>
                <label class="color" data-color-id="${pokemon.colorId}">${getColorName(pokemon.colorId)}</label>
            </div>

            <br>
            <hr>
            <br>

            <div class="flex-columns grow">

                <div class="flex-rows grow align-center" style="width: 33%;">
                    <label>HABITAT</label>
                    <div class="habitat" data-habitat-id="${pokemon.habitatId}"></div>
                    <label style="text-align: center;">${getHabitatName(pokemon.habitatId).toUpperCase()}</label>
                </div>

                <div class="flex-rows grow align-center" style="width: 33%;">
                    <label>SHAPE</label>
                    <div class="shape" data-shape-id="${pokemon.shapeId}"></div>
                    <label style="text-align: center;">${getShapeName(pokemon.shapeId)?.toUpperCase()}</label>
                </div>
                            
                <div class="flex-rows grow align-center" style="width: 33%;">
                    <label>FOOTPRINT</label>
                    <img class="footprint-sprite" data-id="${pokemon.id}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                    <label style="text-align: center;">---</label>
                </div>

            </div>

        </div>

    `;

}

function renderHeight (height) {
    const feet = height * 3.28084;
    const inches = (feet % 1) * 12;
    return `${height} m (${parseInt(feet)}'${parseInt(inches)}")`;
}

function renderWeight (weight) {
    return `${weight} kg (${(weight * 2.205).toFixed(2)} lbs)`;
}

function renderCaptureRate (captureRate) {
    const C = captureRate;
    const S = 1;
    const B = 1;
    return `${captureRate} (${(((((C*B)/3)*S)/255)*100).toFixed(2)}%)`;
}

function renderGrowthRate (growthRateId) {
    switch (growthRateId) {
        case 1: return "Slow";
        case 2: return "Medium Fast";
        case 3: return "Fast";
        case 4: return "Medium Slow";
        case 5: return "Erratic";
        case 6: return "Fluctuating";
    }
}

function getGrowthRateOrder (growthRateId) {
    switch (growthRateId) {
        case 5: return 1; // erratic      
        case 3: return 2; // fast         
        case 2: return 3; // medium fast  
        case 4: return 4; // medium slow  
        case 1: return 5; // slow         
        case 6: return 6; // fluctuating  
    }
}
