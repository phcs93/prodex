function renderPokemonFilter (version, slot) {

    const typeOptions = Object.keys(Globals.Database.Types).map(t => `<option value="${t}">${Globals.Database.Types[t]}</option>`).join("");
    
    // characteristics
    const abilitieOptions = Object.keys(Globals.Database.Abilities).orderBy(a => Globals.Database.Abilities[a]).map(a => `<option value="${a}">${Globals.Database.Abilities[a]}</option>`).join("");
    const heldItemOptions = Object.keys(Globals.Database.Items).filter(i => Globals.Database.Items[i].type === 1).orderBy(i => Globals.Database.Items[i].name).map(i => `<option value="${i}">${Globals.Database.Items[i].name}</option>`).join("");
    const habitatOptions = Object.keys(Globals.Database.Habitats).map(h => `<option value="${h}">${Globals.Database.Habitats[h]}</option>`).join("");
    const shapeOptions = Object.keys(Globals.Database.Shapes).map(s => `<option value="${s}">${Globals.Database.Shapes[s]}</option>`).join("");
    const colorOptions = Object.keys(Globals.Database.Colors).map(c => `<option value="${c}">${Globals.Database.Colors[c]}</option>`).join("");
    const eggGroupsOptions = Object.keys(Globals.Database.EggGroups).map(e => `<option value="${e}">${Globals.Database.EggGroups[e]}</option>`).join("");

    // moves
    const moveOptions = Object.values(Globals.Database.Moves).orderBy(m => m.name).map(m => `<option value="${m.id}">${m.name}</option>`).join("");
    const learnMethodOptions = Object.keys(Globals.Database.MoveLearnMethods).map(m => `<option value="${m}">${Globals.Database.MoveLearnMethods[m]}</option>`).join("");

    // encounter
    const encounterMethodOptions = Object.keys(Globals.Database.EncounterMethods).map(m => `<option value="${m}">${Globals.Database.EncounterMethods[m]}</option>`).join("");
    const encounterConditionOptions = Object.keys(Globals.Database.EncounterConditions).map(c => `<option value="${c}">${Globals.Database.EncounterConditions[c]}</option>`).join("");

    const locationsGroupedByRegion = Object.values(Globals.Database.Locations).groupBy(l => l.regionId);

    const locationOptions = Object.keys(locationsGroupedByRegion).map(regionId => {        
        return `
            <optgroup label="${Globals.Database.Regions[regionId]}">
                ${locationsGroupedByRegion[regionId].orderBy(l => l.name).map(l => `<option value="${l.id}">${l.name}</option>`).join("")}
            </optgroup>
        `;
    });

    return `

        <div class="flex-rows">

            <div class="flex-columns grow wrap">

                <div class="flex-rows gap padding box responsive-border-radius">

                    <form onsubmit="event.preventDefault(); filterPokemons(${version}, ${slot});">

                        <div class="flex-rows gap">

                            <div class="flex-rows">
                                <label for="name-filter">NAME</label>
                                <input type="text" name="name-filter" id="name-filter" />
                            </div>

                            <div class="flex-rows">
                                <label for="generation-filter">INTRODUCED IN GENERATION</label>
                                <input type="number" name="generation-filter" id="generation-filter" />
                            </div>

                            <div class="flex-columns">
                                <div class="flex-rows grow">
                                    <label for="type1-filter">TYPE 1</label>
                                    <select name="type1-filter" id="type1-filter" class="input-left-half">
                                        <option value="">---</option>
                                        ${typeOptions}
                                    </select>
                                </div>
                                <div class="flex-rows grow">
                                    <label for="type-filter">TYPE 2</label>
                                    <select name="type2-filter" id="type2-filter" class="input-right-half">
                                        <option value="">---</option>
                                        ${typeOptions}
                                    </select>
                                </div>
                            </div>

                            <details>

                                <summary>CHARACTERISTICS FILTERS</summary>

                                <div class="flex-rows gap">

                                    <div class="flex-rows">
                                        <label for="ability-filter">ABILITY</label>
                                        <select name="ability-filter" id="ability-filter">
                                            <option value="">---</option>
                                            ${abilitieOptions}
                                        </select>
                                    </div>
                                    
                                    <div class="flex-rows">
                                        <label for="held-item-filter">HELD ITEM</label>
                                        <select name="held-item-filter" id="held-item-filter">
                                            <option value="">---</option>
                                            ${heldItemOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="habitat-filter">HABITAT</label>
                                        <select name="habitat-filter" id="habitat-filter">
                                            <option value="">---</option>
                                            ${habitatOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="shape-filter">SHAPE</label>
                                        <select name="shape-filter" id="shape-filter">
                                            <option value="">---</option>
                                            ${shapeOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="color-filter">COLOR</label>
                                        <select name="color-filter" id="color-filter">
                                            <option value="">---</option>
                                            ${colorOptions}
                                        </select>
                                    </div>

                                    <div class="flex-columns">
                                        <div class="flex-rows grow">
                                            <label for="egg-group1-filter">EGG GROUP 1</label>
                                            <select name="egg-group1-filter" id="egg-group1-filter" class="input-left-half">
                                                <option value="">---</option>
                                                ${eggGroupsOptions}
                                            </select>
                                        </div>
                                        <div class="flex-rows grow">
                                            <label for="egg-group2-filter">EGG GROUP 2</label>
                                            <select name="egg-group2-filter" id="egg-group2-filter" class="input-right-half">
                                                <option value="">---</option>
                                                ${eggGroupsOptions}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="evolutions-filter">NUMBER OF EVOLUTIONS (disabled)</label>
                                        <input type="number" name="evolutions-filter" id="evolutions-filter" />
                                    </div>

                                </div>

                            </details>

                            <details>

                                <summary>MOVE FILTERS</summary>

                                <div class="flex-rows gap">

                                    <div class="flex-rows">
                                        <label for="move-filter">LEARNS MOVES</label>
                                        <select name="move1-filter" id="move1-filter">
                                            <option value="">---</option>
                                            ${moveOptions}
                                        </select>
                                        <select name="move2-filter" id="move2-filter">
                                            <option value="">---</option>
                                            ${moveOptions}
                                        </select>
                                        <select name="move3-filter" id="move3-filter">
                                            <option value="">---</option>
                                            ${moveOptions}
                                        </select>
                                        <select name="move4-filter" id="move4-filter">
                                            <option value="">---</option>
                                            ${moveOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="learn-method-filter">LEARN METHOD</label>
                                        <select name="learn-method-filter" id="learn-method-filter">
                                            <option value="">---</option>
                                            ${learnMethodOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="move-filter">LEARNS MOVES FROM TYPES</label>
                                        <select name="move-from-type1-filter" id="move-from-type1-filter">
                                            <option value="">---</option>
                                            ${typeOptions}
                                        </select>
                                        <select name="move-from-type2-filter" id="move-from-type2-filter">
                                            <option value="">---</option>
                                            ${typeOptions}
                                        </select>
                                        <select name="move-from-type3-filter" id="move-from-type3-filter">
                                            <option value="">---</option>
                                            ${typeOptions}
                                        </select>
                                        <select name="move-from-type4-filter" id="move-from-type4-filter">
                                            <option value="">---</option>
                                            ${typeOptions}
                                        </select>
                                    </div>

                                    <label class="el-switch">
                                        <input type="checkbox" name="only-attacks-filter" id="only-attacks-filter" />
                                        <span class="el-switch-style"></span>
                                        <label for="only-attacks-filter">ONLY ATTACK MOVES</label>
                                    </label>

                                </div>

                            </details>

                            <details>

                                <summary>ENCOUNTER FILTERS</summary>

                                <div class="flex-rows gap">

                                    <div class="flex-rows grow">
                                        <label for="max-encounter-level-filter">MAXIMUM ENCOUNTER LEVEL</label>
                                        <input type="number" name="max-encounter-level-filter" id="max-encounter-level-filter" min="0" max="100" step="1" />
                                    </div>

                                    <div class="flex-rows">
                                        <label for="encounter-method-filter">ENCOUNTER METHOD</label>
                                        <select name="encounter-method-filter" id="encounter-method-filter">
                                            <option value="">---</option>
                                            ${encounterMethodOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="encounter-condition-filter">ENCOUNTER CONDITION</label>
                                        <select name="encounter-condition-filter" id="encounter-condition-filter">
                                            <option value="">---</option>
                                            ${encounterConditionOptions}
                                        </select>
                                    </div>

                                    <div class="flex-rows">
                                        <label for="encounter-location-filter">ENCOUNTER LOCATION</label>
                                        <select name="encounter-location-filter" id="encounter-location-filter">
                                            <option value="">---</option>
                                            ${locationOptions}
                                        </select>
                                    </div>

                                </div>

                            </details>

                            <label class="el-switch">
                                <input type="checkbox" name="only-obtainable-filter" id="only-obtainable-filter" checked="true" />
                                <span class="el-switch-style"></span>
                                <label for="only-obtainable-filter">OBTAINABLE IN "${Globals.Database.Versions[version].name.toUpperCase()}"</label>
                            </label>

                            <hr>

                            <div class="flex-columns">
                                <div class="flex-rows" style="width: 50%;">
                                    <label for="order-filter">ORDER BY</label>
                                    <select name="order-filter" id="order-filter" class="input-left-half">
                                        <option value="id">ID</option>
                                        <option value="name">Name</option>
                                        <option value="generation">Generation</option>
                                        <option value="weight">Weight</option>
                                        <option value="height">Height</option>
                                        <option value="base-exp">Base Experience</option>
                                        <option value="capture-rate">Capture Rate</option>
                                        <option value="base-happiness">Base Happiness</option>
                                        <option value="growth-rate">Growth Rate</option>
                                        <option value="hatch-counter">Hatch Counter</option>
                                        <option value="gender-rate">Gender Rate</option>
                                        <option value="hp">HP</option>
                                        <option value="atk">Attack</option>
                                        <option value="def">Defense</option>
                                        <option value="sp-atk">Sp.Atk</option>
                                        <option value="sp-def">Sp.Def</option>
                                        <option value="speed">Speed</option>
                                        <option value="total">Total Stats</option>
                                        <option value="ev-hp">HP EV Yield</option>
                                        <option value="ev-atk">Attack EV Yield</option>
                                        <option value="ev-def">Defense EV Yield</option>
                                        <option value="ev-sp-atk">Sp.Atk EV Yield</option>
                                        <option value="ev-sp-def">Sp.Def EV Yield</option>
                                        <option value="ev-speed">Speed EV Yield</option>
                                        <option value="weakness">Type Weaknesses</option>
                                    </select>
                                </div>
                                <div class="flex-rows" style="width: 50%;">
                                    <label for="direction-filter">DIRECTION</label>
                                    <select name="direction-filter" id="direction-filter" class="input-right-half">
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <input type="submit" style="display: none;" />

                    </form>

                    <hr>

                    <div class="flex-rows gap">
                        <button type="button" class="primary" onclick="filterPokemons(${version}, ${slot}); event.preventDefault();">FILTER</button>
                        <button type="button" onclick="Swal.close();">CANCEL</button>
                    </div>                    
                    
                </div>

                <div class="flex-rows grow padding gap">

                    <label id="number-of-matches" style="text-align: center !important; font-size: 24px;"></label>

                    <div id="pokemon-grid" class="grid">

                    </div>

                </div>

            </div>

        </div>

    `;

}

function filterPokemons (version, slot) {

    const versionGroupId = Globals.Database.Versions[version].versionGroup;
    const versionGroup = Globals.Database.VersionGroups[versionGroupId];

    // common filters
    const name = document.getElementById("name-filter").value;
    const generation = parseInt(document.getElementById("generation-filter").value);
    const type1 = parseInt(document.getElementById("type1-filter").value);
    const type2 = parseInt(document.getElementById("type2-filter").value);

    // characteristics filters
    const ability = parseInt(document.getElementById("ability-filter").value);
    const heldItem = parseInt(document.getElementById("held-item-filter").value);

    // move filters
    const move1 = parseInt(document.getElementById("move1-filter").value);
    const move2 = parseInt(document.getElementById("move2-filter").value);
    const move3 = parseInt(document.getElementById("move3-filter").value);
    const move4 = parseInt(document.getElementById("move4-filter").value);
    const movesFromType1 = parseInt(document.getElementById("move-from-type1-filter").value);
    const movesFromType2 = parseInt(document.getElementById("move-from-type2-filter").value);
    const movesFromType3 = parseInt(document.getElementById("move-from-type3-filter").value);
    const movesFromType4 = parseInt(document.getElementById("move-from-type4-filter").value);
    const learnMethod = parseInt(document.getElementById("learn-method-filter").value);
    const onlyAttacks = document.getElementById("only-attacks-filter").checked;

    // encounter filters
    const maxEcounterLevel = parseInt(document.getElementById("max-encounter-level-filter").value);
    const encounterMethod = parseInt(document.getElementById("encounter-method-filter").value);
    const encounterCondition = parseInt(document.getElementById("encounter-condition-filter").value);
    const encounterLocation = parseInt(document.getElementById("encounter-location-filter").value);

    // special filters
    const onlyObtainable = document.getElementById("only-obtainable-filter").checked;

    // order by
    const order = document.getElementById("order-filter").value;
    const direction = document.getElementById("direction-filter").value;

    const filteredPokemons = [];

    for (const pokemon of Object.values(Globals.Database.Pokemons)) {

        let show = true;
        const matches = [];

        // common filters
        if (name) {
            if (pokemon.name.toUpperCase().indexOf(name.toUpperCase()) > -1) {
                matches.push(`NAME INCLUDES "${name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        if (generation) {
            if (pokemon.introducedInGeneration === generation) {
                matches.push(`INTRODUCED IN GENERATION "${generation}"`);
            } else {
                show = false;
            }
        }

        if (type1) {
            if (pokemon.types.includes(type1)) {
                matches.push(`IS OF TYPE "${Globals.Database.Types[type1].toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        if (type2) {
            if (pokemon.types.includes(type2)) {
                matches.push(`IS OF TYPE "${Globals.Database.Types[type2].toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        // characteristics filters
        if (ability) {
            if (pokemon.abilities.includes(ability)) {
                const index = pokemon.abilities.indexOf(ability);
                if (index < 2) {
                    matches.push(`ABILITY ${index+1} IS "${Globals.Database.Abilities[ability].toUpperCase()}"`);
                } else {
                    matches.push(`HIDDEN ABILITY IS "${Globals.Database.Abilities[ability].toUpperCase()}"`);
                }                
            } else {
                show = false;
            }
        }

        if (heldItem) {
            if (pokemon.items[version]?.some(i => i.id === heldItem)) {
                const rarity = pokemon.items[version].filter(i => i.id === heldItem)[0].rarity;
                matches.push(`${rarity}% CHANCE OF HOLDING "${Globals.Database.Items[heldItem].name.toUpperCase()}" IN "${Globals.Database.Versions[version].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        // move filters        
        if (move1) {
            const match = checkIfPokemonLearnsMove(pokemon, move1, versionGroup, learnMethod);
            if (match) {                
                matches.push(match);
            } else {
                show = false;
            }
        }
        if (move2) {
            const match = checkIfPokemonLearnsMove(pokemon, move2, versionGroup, learnMethod);
            if (match) {                
                matches.push(match);
            } else {
                show = false;
            }
        }
        if (move3) {
            const match = checkIfPokemonLearnsMove(pokemon, move3, versionGroup, learnMethod);
            if (match) {                
                matches.push(match);
            } else {
                show = false;
            }
        }
        if (move4) {
            const match = checkIfPokemonLearnsMove(pokemon, move4, versionGroup, learnMethod);
            if (match) {                
                matches.push(match);
            } else {
                show = false;
            }
        }

        if (movesFromType1) {
            const match = checkIfPokemonLearnsMovesFromType(pokemon, movesFromType1, versionGroup, learnMethod, onlyAttacks);
            if (match.length > 0) {                
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (movesFromType2) {
            const match = checkIfPokemonLearnsMovesFromType(pokemon, movesFromType2, versionGroup, learnMethod, onlyAttacks);
            if (match.length > 0) {                
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (movesFromType3) {
            const match = checkIfPokemonLearnsMovesFromType(pokemon, movesFromType3, versionGroup, learnMethod, onlyAttacks);
            if (match.length > 0) {                
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (movesFromType4) {
            const match = checkIfPokemonLearnsMovesFromType(pokemon, movesFromType4, versionGroup, learnMethod, onlyAttacks);
            if (match.length > 0) {                
                matches.push(...match);
            } else {
                show = false;
            }
        }

        // encounter filters
        if (maxEcounterLevel || encounterMethod || encounterCondition || encounterLocation) {

            const canEncounter = pokemon.encounters[version]?.filter(e => (
                (!maxEcounterLevel || e.minlvl <= maxEcounterLevel) &&
                (!encounterMethod || e.method === encounterMethod) &&
                (!encounterCondition || e.conditions.includes(encounterCondition)) &&
                (!encounterLocation || e.location === encounterLocation)
            ));
            
            const match = canEncounter?.reduce((acc, e) => {
                const method = Globals.Database.EncounterMethods[e.method].toUpperCase();
                const conditions = e.conditions.map(c => Globals.Database.EncounterConditions[c].toUpperCase());
                acc.push(`FOUND IN "${Globals.Database.Locations[e.location].name.toUpperCase()}"`)
                acc.push(`AT LEVEL "${e.minlvl}~${e.maxlvl}" VIA "${method}" ${conditions.length > 0 ? `(${conditions.join(", ")})` : ""} IN "${Globals.Database.Versions[version].name.toUpperCase()}"`)
                acc.push("---");
                return acc;
            }, []);

            if (match && match.length > 0) {       
                matches.push(...match);
            } else {
                show = false;
            }
        }

        // special filters
        if (onlyObtainable) {
            if (pokemon.encounters[version]?.length > 0) {
                matches.push(`OBTAINABLE IN "${Globals.Database.Versions[version].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        if (show) {
            pokemon.matches = matches
            filteredPokemons.push(pokemon);
        }        
    }

    let getOrderByValue = null;
    let formatOrderByValue = v => v;

    switch (order) {

        case "id": getOrderByValue = p => p.pokedexId; break;
        case "name": getOrderByValue = p => p.name; break;
        case "generation": getOrderByValue = p => p.introducedInGeneration; break;
        case "weight": { 
            getOrderByValue = p => p.weight;
            formatOrderByValue = v => renderWeight(v);
            break;
        }
        case "height": {
            getOrderByValue = p => p.height;
            formatOrderByValue = v => renderHeight(v);
            break;
        }

        // min encounter level
        // case "base-exp": getOrderByValue = p => p[PokemonIndexes.BaseExperience]; break;
        // case "capture-rate": getOrderByValue = p => p[PokemonIndexes.CaptureRate]; break;
        // case "base-happiness": getOrderByValue = p => p[PokemonIndexes.BaseHappiness]; break;
        // case "growth-rate": getOrderByValue = p => growthRateToNumberDictionary[p[PokemonIndexes.GrowthRateId]]; break;
        // case "hatch-counter": getOrderByValue = p => p[PokemonIndexes.HatchCounter]; break;

        // case "gender-rate": getOrderByValue = p => p[PokemonIndexes.GenderRate][0] === 0 && p[PokemonIndexes.GenderRate][1] === 0 ? 101 : p[PokemonIndexes.GenderRate][1]; break;

        // case "hp": getOrderByValue = p => p[PokemonIndexes.Stats][0][0]; break;
        // case "atk": getOrderByValue = p => p[PokemonIndexes.Stats][1][0]; break;
        // case "def": getOrderByValue = p => p[PokemonIndexes.Stats][2][0]; break;
        // case "sp-atk": getOrderByValue = p => p[PokemonIndexes.Stats][3][0]; break;
        // case "sp-def": getOrderByValue = p => p[PokemonIndexes.Stats][4][0]; break;
        // case "speed": getOrderByValue = p => p[PokemonIndexes.Stats][5][0]; break;
        // case "total": getOrderByValue = p => p[PokemonIndexes.Stats][6]; break;

        // case "ev-hp": getOrderByValue = p => p[PokemonIndexes.Stats][0][3]; break;
        // case "ev-atk": getOrderByValue = p => p[PokemonIndexes.Stats][1][3]; break;
        // case "ev-def": getOrderByValue = p => p[PokemonIndexes.Stats][2][3]; break;
        // case "ev-sp-atk": getOrderByValue = p => p[PokemonIndexes.Stats][3][3]; break;
        // case "ev-sp-def": getOrderByValue = p => p[PokemonIndexes.Stats][4][3]; break;
        // case "ev-speed": getOrderByValue = p => p[PokemonIndexes.Stats][5][3]; break;

        // case "weakness": getOrderByValue = p => p[PokemonIndexes.TypeEfficacy].sum(v => v); break;

    }

    const orderedPokemons = direction === "asc" ? Object.values(filteredPokemons).orderBy(getOrderByValue) : Object.values(filteredPokemons).orderByDesc(getOrderByValue);

    const pokemonsHTMLs = orderedPokemons.map(pokemon => {
        let orderByValueHTML = "";
        if (order !== "id" && order !== "name") {
            orderByValueHTML = `
                ${pokemon.matches.length > 0 ? "<hr>": ""}
                <label>${order.toUpperCase()} = ${formatOrderByValue(getOrderByValue(pokemon))}</label>
            `;
        }
        return `
            <div>
                <div class="flex-rows gap box filtered-pokemon" onclick="selectPokemon(${pokemon.id}, ${slot})">
                    ${renderPokemonHeader(pokemon, null, false)}
                </div>
                <div class="filter-matches flex-rows">${pokemon.matches.map(m => `<label>${m}</label>`).join("")}${orderByValueHTML}</div>
            </div>
        `;
    });

    document.getElementById("number-of-matches").innerHTML = `FOUND ${pokemonsHTMLs.length} MATCHES`;
    document.getElementById("pokemon-grid").innerHTML = pokemonsHTMLs.join("");

}

function checkIfPokemonLearnsMove (pokemon, moveId, versionGroup, learnMethodId) {
    const learns = pokemon.moves[versionGroup.id]?.filter(m => m.id === moveId)[0];
    if (learns && (!learnMethodId || learnMethodId === learns.method)) {
        const move = Globals.Database.Moves[learns.id];
        switch (learns.method) {
            // by level up
            case 1: {
                return `LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" AT LEVEL "${learns.level}" IN "${versionGroup.name.toUpperCase()}"`; 
            }
            // by machine
            case 4: {
                const itemId = Globals.Database.Machines[versionGroup.id][move.id];
                const machineName = Globals.Database.Items[itemId].name.toUpperCase();
                return `LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" FROM "${machineName}" IN "${versionGroup.name.toUpperCase()}"`; 
            }
            // anything else
            default: {
                return `LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" FROM "${Globals.Database.MoveLearnMethods[learns.method].toUpperCase()}" IN "${versionGroup.name.toUpperCase()}"`; 
            }
        }      
    } else {
        return null;
    }
}

function checkIfPokemonLearnsMovesFromType (pokemon, typeId, versionGroup, learnMethodId, onlyAttacks) {

    const learns = pokemon.moves[versionGroup.id]?.filter(learn => {
        const move = Globals.Database.Moves[learn.id];
        return (
            move.typeId === typeId &&
            (!learnMethodId || learnMethodId === learn.method) &&
            (!onlyAttacks || [2,3].includes(move.damageClassId))
        );
    });

    if (learns && learns.length > 0) {
        const matches = [];
        for (const learn of learns) {
            const move = Globals.Database.Moves[learn.id];
            switch (learn.method) {
                // by level up
                case 1: {
                    matches.push(`LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" AT LEVEL "${learn.level}" IN "${versionGroup.name.toUpperCase()}"`);
                    break;
                }
                // by machine
                case 4: {
                    const itemId = Globals.Database.Machines[versionGroup.id][move.id];                    
                    const machineName = Globals.Database.Items[itemId].name.toUpperCase();
                    matches.push(`LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" FROM "${machineName}" IN "${versionGroup.name.toUpperCase()}"`);
                    break;
                }
                // anything else
                default: {
                    matches.push(`LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" FROM "${Globals.Database.MoveLearnMethods[learn.method].toUpperCase()}" IN "${versionGroup.name.toUpperCase()}"`);
                    break;
                }
            }
        }
        return matches;
    } else {
        return [];
    }

}

function selectPokemon (id, slot) {
    Globals.Parameters.Team[slot-1].id = id;
    Swal.close();
}