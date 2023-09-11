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
        <div class="flex-rows">
            
        </div>
        <table class="pokemon-details">
            <tr>
                <th>Ability 1</th>
                <td>${getAbilityName(pokemon.abilities[0])}</td>
                <th>Ability 2</th>
                <td>${getAbilityName(pokemon.abilities[1])}</td>
            </tr>
            <tr>
                <th>Hidden Ability</th>
                <td>${getAbilityName(pokemon.abilities[2])}</td>
                <th></th>
                <td></td>
            </tr>
            <tr>
                <th>Height</th>
                <td>${pokemon.height} m (#'#")</td>
                <th>Weight</th>
                <td>${pokemon.weight} Kg (# lbs)</td>
            </tr>
            <tr>
                <th>Experience</th>
                <td>${pokemon.baseExperience}</td>
                <th>Catch Rate</th>
                <td>${pokemon.captureRate} (#% with normal pokeball and full hp in gen X)</td>
            </tr>
            <tr>
                <th>Happiness</th>
                <td>${pokemon.baseHappiness} (normal?)</td>
                <th>Growth Rate</th>
                <td>${getGrowthRateName(pokemon.growthRateId)}</td>
            </tr>
            <tr>
                <th>Egg Groups</th>
                <td>${getEggGroupsNames(pokemon.eggGroups)}</td>
                <th>Shape (and footprint)</th>
                <td>${getShapeName(pokemon.shapeId)} (and foorprint icons)</td>
            </tr>
            <tr>
                <th>Habitat</th>
                <td>${getHabitatName(pokemon.habitatId)} (footprint?)</td>
                <th>Color</th>
                <td>${getColorName(pokemon.colorId)} (show square color)</td>
            </tr>
            <tr>
                <th>Specie</th>
                <td>${pokemon.specie}</td>
                <th>Hatch Counter</th>
                <td>${pokemon.hatchCounter} cycles (# thousands of steps)</td>
            </tr>
            <tr>
                <th>Generation</th>
                <td>${pokemon.introducedInGeneration}</td>
                <th>Evolution Chain Id</th>
                <td>${pokemon.evolutionChainId}</td>
            </tr>
        </table>
    `;
}