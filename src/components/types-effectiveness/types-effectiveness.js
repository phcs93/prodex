/**
 * @param {Pokemon} pokemon
 */
function renderTypesEffectiveness(pokemon) {

    return `

        <div class="types-effectiveness">
            
            <div data-type-id="${Globals.Database.TypeEnum.Normal}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Fire}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Water}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Electric}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Grass}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Ice}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Fighting}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Poison}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Ground}"></div>
        
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Normal-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Fire-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Water-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Electric-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Grass-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Ice-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Fighting-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Poison-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Ground-1]}"></div>
        
            <div data-type-id="${Globals.Database.TypeEnum.Flying}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Psychic}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Bug}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Rock}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Ghost}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Dragon}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Dark}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Steel}"></div>
            <div data-type-id="${Globals.Database.TypeEnum.Fairy}"></div>
        
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Flying-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Psychic-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Bug-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Rock-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Ghost-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Dragon-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Dark-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Steel-1]}"></div>
            <div data-effectiveness="${pokemon.typeEfficacy[Globals.Database.TypeEnum.Fairy-1]}"></div>
        
        </div>
        
    `;

}