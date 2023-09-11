/**
 * @typedef {{
 *   index: number,
 *   id: number,
 *   pokedexId: number,
 *   name: string,
 *   specie: string,
 *   form: string,
 *   introducedInGeneration: number,
 *   types: number[],
 *   eggGroups: number[],
 *   abilities: number[],
 *   height: number,
 *   weight: number,
 *   colorId: number,
 *   shapeId: number,
 *   habitatId: number,
 *   baseExperience: number,
 *   baseHappiness : number,
 *   captureRate: number,
 *   genderRate: number[],
 *   hatchCounter: number,
 *   growthRateId: number,
 *   evolutionChainId: number,
 *   typeEfficacy: number[],
 *   flags: {
 *     isBaby: boolean,
 *     isLegendary: boolean,
 *     isMythical: boolean,
 *     isMega: boolean,
 *     isRegional: boolean,
 *     isGmax: boolean,
 *     isTotem: boolean,
 *     hasGenderDifferences: boolean,
 *     formsSwitchable: boolean
 *   },
 *   items: Object.<string, [{ 
 *     id: number, 
 *     rarity: number 
 *   }]>
 *   moves: Object.<string, [{
 *     id: number, 
 *     level: number, 
 *     method: number 
 *   }]>
 *   encounters: Object.<string, [{ 
 *     location: number, 
 *     method: number, 
 *     conditions: number[], 
 *     minlvl: number, 
 *     maxlvl: number, 
 *     rarity: number
 *   }]>
 *   stats: {
 *     hp: { base: number, min: number, max: number, ev: number }
 *     atk: { base: number, min: number, max: number, ev: number }
 *     def: { base: number, min: number, max: number, ev: number }
 *     spatk: { base: number, min: number, max: number, ev: number }
 *     spdef: { base: number, min: number, max: number, ev: number }
 *     speed: { base: number, min: number, max: number, ev: number }
 *     total: number
 *   }
 * }} Pokemon
 */