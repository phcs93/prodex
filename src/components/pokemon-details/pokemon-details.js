/**
 * @param {Pokemon} pokemon
 */
function renderPokemonDetails (pokemon) {

    const getAbilityName = (abilityId) => {
        if (!abilityId) return "---";
        return Globals.Database.Abilities[abilityId];
    };
    
    const getGrowthRateName = (growthRateId) => {
        return Globals.Database.GrowthRates[growthRateId];
    };
    
    const getEggGroupsNames = (eggGroupsIds) => {
        return eggGroupsIds.map(id => Globals.Database.EggGroups[id]).join(", ");
    };
    
    const getShapeName = (shapeId) => {
        return Globals.Database.Shapes[shapeId];
    };
    
    const getHabitatName = (habitatId) => {
        if (!habitatId) return "---";
        return Globals.Database.Habitats[habitatId];
    };
    
    const getColorName = (colorId) => {
        return Globals.Database.Colors[colorId];
    };

    return `
        <div class="flex-rows pokemon-details">
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
                <label>Catch Rate (*)</label> <!-- (#% normal pokeball + full hp in gen X) -->
                <label>${pokemon.captureRate} </label>
            </div>
            <div class="flex-columns">
                <label>Happiness</label>
                <label>${pokemon.baseHappiness} (normal?)</label>
            </div>
            <div class="flex-columns">
                <label>Growth Rat</label>
                <label>${getGrowthRateName(pokemon.growthRateId)}</label>
            </div>
            <div class="flex-columns">
                <label>Egg Groups</label>
                <label>${getEggGroupsNames(pokemon.eggGroups)}</label>
            </div>
            <div class="flex-columns">
                <label>Shape</label>
                <label>${getShapeName(pokemon.shapeId)} (footprint icon)</label>
            </div>
            <div class="flex-columns">
                <label>Habitat</label>
                <label>${getHabitatName(pokemon.habitatId)} (footprint?)</label>
            </div>
            <div class="flex-columns">
                <label>Color</label>
                <label>${getColorName(pokemon.colorId)} (show square color)</label>
            </div>
            <div class="flex-columns">
                <label>Specie</label>
                <label>${pokemon.specie}</label>
            </div>
            <div class="flex-columns">
                <label>Hatch Counter</label>
                <label>${pokemon.hatchCounter} cycles (# steps)</label> <!-- thousands -->
            </div>
            <div class="flex-columns">
                <label>Generation</label>
                <label>${pokemon.introducedInGeneration}</label>
            </div>
            <!-- <div class="flex-columns">
                <label>Evolution Chain Id</label>
                <label>${pokemon.evolutionChainId}</label>
            </div> -->
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

