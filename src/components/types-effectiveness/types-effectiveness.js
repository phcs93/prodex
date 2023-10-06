/**
 * @param {Pokemon} pokemon
 */
function renderTypesEffectiveness(pokemon) {

    const typeEnum = Object.values(Globals.Database.Types).reduce((acc, type) => { acc[type.name] = type.id; return acc; }, {});

    return `

        <div class="types-effectiveness">
            
            <div data-type-id="${typeEnum.Normal}"></div>
            <div data-type-id="${typeEnum.Fire}"></div>
            <div data-type-id="${typeEnum.Water}"></div>
            <div data-type-id="${typeEnum.Electric}"></div>
            <div data-type-id="${typeEnum.Grass}"></div>
            <div data-type-id="${typeEnum.Ice}"></div>
            <div data-type-id="${typeEnum.Fighting}"></div>
            <div data-type-id="${typeEnum.Poison}"></div>
            <div data-type-id="${typeEnum.Ground}"></div>
        
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Normal-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Fire-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Water-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Electric-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Grass-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Ice-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Fighting-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Poison-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Ground-1]}"></div>
        
            <div data-type-id="${typeEnum.Flying}"></div>
            <div data-type-id="${typeEnum.Psychic}"></div>
            <div data-type-id="${typeEnum.Bug}"></div>
            <div data-type-id="${typeEnum.Rock}"></div>
            <div data-type-id="${typeEnum.Ghost}"></div>
            <div data-type-id="${typeEnum.Dragon}"></div>
            <div data-type-id="${typeEnum.Dark}"></div>
            <div data-type-id="${typeEnum.Steel}"></div>
            <div data-type-id="${typeEnum.Fairy}"></div>
        
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Flying-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Psychic-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Bug-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Rock-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Ghost-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Dragon-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Dark-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Steel-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[typeEnum.Fairy-1]}"></div>
        
        </div>
        
    `;

}