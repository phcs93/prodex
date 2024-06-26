function renderTypesEffectiveness(typeEfficacy, colorCondition) {

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
        
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Normal-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Normal-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Fire-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Fire-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Water-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Water-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Electric-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Electric-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Grass-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Grass-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Ice-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Ice-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Fighting-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Fighting-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Poison-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Poison-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Ground-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Ground-1]}"></div>
        
            <div data-type-id="${typeEnum.Flying}"></div>
            <div data-type-id="${typeEnum.Psychic}"></div>
            <div data-type-id="${typeEnum.Bug}"></div>
            <div data-type-id="${typeEnum.Rock}"></div>
            <div data-type-id="${typeEnum.Ghost}"></div>
            <div data-type-id="${typeEnum.Dragon}"></div>
            <div data-type-id="${typeEnum.Dark}"></div>
            <div data-type-id="${typeEnum.Steel}"></div>
            <div data-type-id="${typeEnum.Fairy}"></div>
        
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Flying-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Flying-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Psychic-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Psychic-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Bug-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Bug-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Rock-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Rock-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Ghost-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Ghost-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Dragon-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Dragon-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Dark-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Dark-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Steel-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Steel-1]}"></div>
            <div data-color="${colorCondition ? colorCondition(typeEfficacy[typeEnum.Fairy-1]) : ""}" data-effectiveness="${typeEfficacy[typeEnum.Fairy-1]}"></div>
        
        </div>
        
    `;

}