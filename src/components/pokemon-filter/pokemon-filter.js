function showPokemonFilterSwal (slot) {

    Swal.fire({
        position: "top",
        width: "80%",
        showConfirmButton: false,
        customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            htmlContainer: "custom-swal-html",
        },
        showClass: {
            popup: "animate__animated animate__fadeIn animate__faster"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut animate__faster"
        },
        html: renderPokemonFilter(Globals.Parameters.VersionId, slot),
        //didOpen: () => document.activeElement.blur()
    });

    filterPokemons(Globals.Parameters.VersionId, slot);

}

function renderPokemonFilter(versionId, slot) {

    const typeOptions = Object.values(Globals.Database.Types).map(t => `<option value="${t.id}">${t.name}</option>`).join("");

    // characteristics
    const abilitieOptions = Object.values(Globals.Database.Abilities).orderBy(a => a.name).map(a => `<option value="${a.id}">${a.name}</option>`).join("");
    const heldItemOptions = Globals.Database.HeldItemIds.map(i => Globals.Database.Items[i]).orderBy(i => i.name).map(i => `<option value="${i.id}">${i.name}</option>`).join("");
    const habitatOptions = Object.values(Globals.Database.Habitats).map(h => `<option value="${h.id}">${h.name}</option>`).join("");
    const shapeOptions = Object.values(Globals.Database.Shapes).map(s => `<option value="${s.id}">${s.name}</option>`).join("");
    const colorOptions = Object.values(Globals.Database.Colors).map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    const eggGroupsOptions = Object.values(Globals.Database.EggGroups).map(e => `<option value="${e.id}">${e.name}</option>`).join("");

    // moves
    const moveOptions = Object.values(Globals.Database.Moves).orderBy(m => m.name).map(m => `<option value="${m.id}">${m.name}</option>`).join("");
    const learnMethodOptions = Object.values(Globals.Database.MoveLearnMethods).map(m => `<option value="${m.id}">${m.name}</option>`).join("");
    const moveTargetOptions = Object.values(Globals.Database.MoveTargets).map(t => `<option value="${t.id}">${t.name}</option>`).join("");

    // encounter
    const encounterMethodOptions = Object.values(Globals.Database.EncounterMethods).map(m => `<option value="${m.id}">${m.name}</option>`).join("");
    const encounterConditionOptions = Object.values(Globals.Database.EncounterConditions).filter(ec => !ec.isDefault || [2, 8].includes(ec.encounterConditionId)).map(c => `<option value="${c.id}">${c.name}</option>`).join("");

    const locationsGroupedByRegion = Object.values(Globals.Database.Locations).groupBy(l => l.regionId);

    const locationOptions = Object.keys(locationsGroupedByRegion).map(regionId => {
        return `
            <optgroup label="${Globals.Database.Regions[regionId].name}">
                ${locationsGroupedByRegion[regionId].orderBy(l => l.name).map(l => `<option value="${l.id}">${l.name}</option>`).join("")}
            </optgroup>
        `;
    });

    // evolution
    const evolutionItemsOptions = Globals.Database.EvolutionItemsIds.map(i => Globals.Database.Items[i]).orderBy(i => i.name).map(i => `<option value="${i.id}">${i.name}</option>`).join("");
    const evolutionTriggerOptions = Object.values(Globals.Database.EvolutionTriggers).orderBy(et => et.name).map(et => `<option value="${et.id}">${et.name}</option>`).join("");

    return `

        <div class="flex-columns grow wrap">

            <div class="flex-rows gap padding box filter-form">

                <div class="flex-rows gap">

                    <div class="flex-rows">
                        <label for="name-filter">NAME</label>
                        <input type="text" name="name-filter" id="name-filter" oninput="filterPokemons(${versionId}, ${slot});" />
                    </div>

                    <div class="flex-rows">
                        <label for="id-filter">ID</label>
                        <input type="number" name="id-filter" id="id-filter" oninput="filterPokemons(${versionId}, ${slot});" />
                    </div>

                    <div class="flex-rows">
                        <label for="generation-filter">INTRODUCED IN GENERATION</label>
                        <input type="number" name="generation-filter" id="generation-filter" oninput="filterPokemons(${versionId}, ${slot});" />
                    </div>

                    <div class="flex-columns">
                        <div class="flex-rows grow">
                            <label for="type1-filter">TYPE 1</label>
                            <select name="type1-filter" id="type1-filter" class="input-left-half" onchange="filterPokemons(${versionId}, ${slot});">
                                <option value="">---</option>
                                ${typeOptions}
                            </select>
                        </div>
                        <div class="flex-rows grow">
                            <label for="type-filter">TYPE 2</label>
                            <select name="type2-filter" id="type2-filter" class="input-right-half" onchange="filterPokemons(${versionId}, ${slot});">
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
                                <select name="ability-filter" id="ability-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${abilitieOptions}
                                </select>
                            </div>
                            
                            <div class="flex-rows">
                                <label for="held-item-filter">HELD ITEM</label>
                                <select name="held-item-filter" id="held-item-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${heldItemOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="habitat-filter">HABITAT</label>
                                <select name="habitat-filter" id="habitat-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${habitatOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="shape-filter">SHAPE</label>
                                <select name="shape-filter" id="shape-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${shapeOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="color-filter">COLOR</label>
                                <select name="color-filter" id="color-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${colorOptions}
                                </select>
                            </div>

                            <div class="flex-columns">
                                <div class="flex-rows grow">
                                    <label for="egg-group1-filter">EGG GROUP 1</label>
                                    <select name="egg-group1-filter" id="egg-group1-filter" class="input-left-half" onchange="filterPokemons(${versionId}, ${slot});">
                                        <option value="">---</option>
                                        ${eggGroupsOptions}
                                    </select>
                                </div>
                                <div class="flex-rows grow">
                                    <label for="egg-group2-filter">EGG GROUP 2</label>
                                    <select name="egg-group2-filter" id="egg-group2-filter" class="input-right-half" onchange="filterPokemons(${versionId}, ${slot});">
                                        <option value="">---</option>
                                        ${eggGroupsOptions}
                                    </select>
                                </div>
                            </div>                                

                        </div>

                    </details>

                    <details>

                        <summary>MOVE FILTERS</summary>

                        <div class="flex-rows gap">

                            <div class="flex-rows">
                                <label for="move-filter">LEARNS MOVES</label>
                                <select name="move1-filter" id="move1-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${moveOptions}
                                </select>
                                <select name="move2-filter" id="move2-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${moveOptions}
                                </select>
                                <select name="move3-filter" id="move3-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${moveOptions}
                                </select>
                                <select name="move4-filter" id="move4-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${moveOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="learn-method-filter">LEARN METHOD</label>
                                <select name="learn-method-filter" id="learn-method-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${learnMethodOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="move-filter">LEARNS MOVES FROM TYPES</label>
                                <select name="move-from-type1-filter" id="move-from-type1-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${typeOptions}
                                </select>
                                <select name="move-from-type2-filter" id="move-from-type2-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${typeOptions}
                                </select>
                                <select name="move-from-type3-filter" id="move-from-type3-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${typeOptions}
                                </select>
                                <select name="move-from-type4-filter" id="move-from-type4-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${typeOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="move-target-filter">MOVE TARGET</label>
                                <select name="move-target-filter" id="move-target-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${moveTargetOptions}
                                </select>
                            </div>

                            <label class="el-switch">
                                <input type="checkbox" name="only-attacks-filter" id="only-attacks-filter" onchange="filterPokemons(${versionId}, ${slot});" />
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
                                <input type="number" name="max-encounter-level-filter" id="max-encounter-level-filter" min="0" max="100" step="1" oninput="filterPokemons(${versionId}, ${slot});" />
                            </div>

                            <div class="flex-rows">
                                <label for="encounter-method-filter">ENCOUNTER METHOD</label>
                                <select name="encounter-method-filter" id="encounter-method-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${encounterMethodOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="encounter-condition-filter">ENCOUNTER CONDITION</label>
                                <select name="encounter-condition-filter" id="encounter-condition-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${encounterConditionOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="encounter-location-filter">ENCOUNTER LOCATION</label>
                                <select name="encounter-location-filter" id="encounter-location-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${locationOptions}
                                </select>
                            </div>

                            <label class="el-switch">
                                <input type="checkbox" name="by-breeding-filter" id="by-breeding-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="by-breeding-filter">BY BREEDING</label>
                            </label>

                            <label class="el-switch">
                                <input type="checkbox" name="by-evolving-filter" id="by-evolving-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="by-evolving-filter">BY EVOLVING</label>
                            </label>

                        </div>

                    </details>

                    <details>

                        <summary>EVOLUTION FILTERS</summary>

                        <div class="flex-rows gap">

                            <div class="flex-rows">
                                <label for="evolutions-filter">NUMBER OF EVOLUTIONS</label>
                                <input type="number" name="evolutions-filter" id="evolutions-filter" oninput="filterPokemons(${versionId}, ${slot});" min="0" max="2" />
                            </div>

                            <div class="flex-rows">
                                <label for="evolution-item-filter">EVOLUTION ITEM</label>
                                <select name="evolution-item-filter" id="evolution-item-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${evolutionItemsOptions}
                                </select>
                            </div>

                            <div class="flex-rows">
                                <label for="evolution-trigger-filter">EVOLUTION TRIGGER</label>
                                <select name="evolution-trigger-filter" id="evolution-trigger-filter" onchange="filterPokemons(${versionId}, ${slot});">
                                    <option value="">---</option>
                                    ${evolutionTriggerOptions}
                                </select>
                            </div>

                        </div>

                    </details>

                    <details>

                        <summary>FLAGS</summary>

                        <div class="flex-rows gap">

                            <label class="el-switch">
                                <input type="checkbox" name="is-baby-filter" id="is-baby-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-baby-filter">IS BABY</label>
                            </label>

                            <label class="el-switch">
                                <input type="checkbox" name="is-legendary-filter" id="is-legendary-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-legendary-filter">IS LEGENDARY</label>
                            </label>
                            
                            <label class="el-switch">
                                <input type="checkbox" name="is-mythical-filter" id="is-mythical-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-mythical-filter">IS MYTHICAL</label>
                            </label>

                            <label class="el-switch">
                                <input type="checkbox" name="is-regional-filter" id="is-regional-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-regional-filter">IS REGIONAL</label>
                            </label>
                            
                            <label class="el-switch">
                                <input type="checkbox" name="is-mega-filter" id="is-mega-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-mega-filter">IS MEGA</label>
                            </label>

                            <label class="el-switch">
                                <input type="checkbox" name="is-totem-filter" id="is-totem-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-totem-filter">IS TOTEM</label>
                            </label>

                            <label class="el-switch">
                                <input type="checkbox" name="is-gmax-filter" id="is-gmax-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="is-gmax-filter">IS GMAX</label>
                            </label>

                            <label class="el-switch">
                                <input type="checkbox" name="has-gender-differences-filter" id="has-gender-differences-filter" onchange="filterPokemons(${versionId}, ${slot});" />
                                <span class="el-switch-style"></span>
                                <label for="has-gender-differences-filter">HAS GENDER DIFFERENCES</label>
                            </label>

                        </div>

                    </details>

                    <hr>

                    <label class="el-switch">
                        <input type="checkbox" name="only-obtainable-filter" id="only-obtainable-filter" checked="true" onchange="filterPokemons(${versionId}, ${slot});" />
                        <span class="el-switch-style"></span>
                        <label for="only-obtainable-filter">OBTAINABLE IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"</label>
                    </label>

                    <hr>

                    <div class="flex-columns">
                        <div class="flex-rows" style="width: 50%;">
                            <label for="order-filter">ORDER BY</label>
                            <select name="order-filter" id="order-filter" class="input-left-half" onchange="filterPokemons(${versionId}, ${slot});">
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
                                <option value="type-weakness">Type Weaknesses</option>
                                <option value="encounter-level">Encounter Level</option>
                            </select>
                        </div>
                        <div class="flex-rows" style="width: 50%;">
                            <label for="direction-filter">DIRECTION</label>
                            <select name="direction-filter" id="direction-filter" class="input-right-half" onchange="filterPokemons(${versionId}, ${slot});">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>

                </div>

                <hr>

                <div class="flex-rows gap">
                    <button class="danger" type="button" onclick="Swal.close();">CLOSE</button>
                </div>
                
            </div>

            <div class="flex-rows grow padding gap fill">

                <label id="number-of-matches" style="text-align: center !important; font-size: 24px;"></label>

                <div id="pokemon-grid" class="grid">

                </div>

            </div>

        </div>

    `;

}

function filterPokemons (versionId, slot) {

    const versionGroupId = Globals.Database.Versions[versionId].versionGroupId;

    // common filters
    const name = document.getElementById("name-filter").value;
    const id = parseInt(document.getElementById("id-filter").value);
    const generationId = parseInt(document.getElementById("generation-filter").value);
    const typeId1 = parseInt(document.getElementById("type1-filter").value);
    const typeId2 = parseInt(document.getElementById("type2-filter").value);

    // characteristics filters
    const abilityId = parseInt(document.getElementById("ability-filter").value);
    const heldItemId = parseInt(document.getElementById("held-item-filter").value);
    const habitatId = parseInt(document.getElementById("habitat-filter").value);
    const shapeId = parseInt(document.getElementById("shape-filter").value);
    const colorId = parseInt(document.getElementById("color-filter").value);
    const eggGroupId1 = parseInt(document.getElementById("egg-group1-filter").value);
    const eggGroupId2 = parseInt(document.getElementById("egg-group2-filter").value);

    // move filters
    const moveId1 = parseInt(document.getElementById("move1-filter").value);
    const moveId2 = parseInt(document.getElementById("move2-filter").value);
    const moveId3 = parseInt(document.getElementById("move3-filter").value);
    const moveId4 = parseInt(document.getElementById("move4-filter").value);
    const movesFromTypeId1 = parseInt(document.getElementById("move-from-type1-filter").value);
    const movesFromTypeId2 = parseInt(document.getElementById("move-from-type2-filter").value);
    const movesFromTypeId3 = parseInt(document.getElementById("move-from-type3-filter").value);
    const movesFromTypeId4 = parseInt(document.getElementById("move-from-type4-filter").value);
    const learnMethodId = parseInt(document.getElementById("learn-method-filter").value);
    const onlyAttacks = document.getElementById("only-attacks-filter").checked;
    const moveTargetId = parseInt(document.getElementById("move-target-filter").value);

    // encounter filters
    const maxEcounterLevel = parseInt(document.getElementById("max-encounter-level-filter").value);
    const encounterMethodId = parseInt(document.getElementById("encounter-method-filter").value);
    const encounterConditionId = parseInt(document.getElementById("encounter-condition-filter").value);
    const encounterLocationId = parseInt(document.getElementById("encounter-location-filter").value);
    const byBreeding = document.getElementById("by-breeding-filter").checked;
    const byEvolving = document.getElementById("by-evolving-filter").checked;

    // evolution filters
    const evolutions = parseInt(document.getElementById("evolutions-filter").value);
    const evolutionItemId = parseInt(document.getElementById("evolution-item-filter").value);
    const evolutionTriggerId = parseInt(document.getElementById("evolution-trigger-filter").value);

    // flags
    const isBaby = document.getElementById("is-baby-filter").checked;
    const isLegendary = document.getElementById("is-legendary-filter").checked;
    const isMythical = document.getElementById("is-mythical-filter").checked;
    const isRegional = document.getElementById("is-regional-filter").checked;
    const isMega = document.getElementById("is-mega-filter").checked;
    const isTotem = document.getElementById("is-totem-filter").checked;
    const isGmax = document.getElementById("is-gmax-filter").checked;
    const hasGenderDifferences = document.getElementById("has-gender-differences-filter").checked;

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
        if (id) {
            if (pokemon.id === id) {
                matches.push(`ID IS "${id}"`);
            } else {
                show = false;
            }
        }
        if (generationId) {
            if (pokemon.introducedInGeneration === generationId) {
                matches.push(`INTRODUCED IN GENERATION "${generationId}"`);
            } else {
                show = false;
            }
        }
        if (typeId1) {
            if (pokemon.types.includes(typeId1)) {
                matches.push(`IS OF TYPE "${Globals.Database.Types[typeId1].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }
        if (typeId2) {
            if (pokemon.types.includes(typeId2)) {
                matches.push(`IS OF TYPE "${Globals.Database.Types[typeId2].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        // characteristics filters
        if (abilityId) {
            if (pokemon.abilities.includes(abilityId)) {
                const index = pokemon.abilities.indexOf(abilityId);
                if (index < 2) {
                    matches.push(`ABILITY ${index + 1} IS "${Globals.Database.Abilities[abilityId].name.toUpperCase()}"`);
                } else {
                    matches.push(`HIDDEN ABILITY IS "${Globals.Database.Abilities[abilityId].name.toUpperCase()}"`);
                }
            } else {
                show = false;
            }
        }
        if (heldItemId) {
            if (pokemon.items[versionId]?.some(i => i.id === heldItemId)) {
                const rarity = pokemon.items[versionId].filter(i => i.id === heldItemId)[0].rarity;
                matches.push(`${rarity}% CHANCE OF HOLDING "${Globals.Database.Items[heldItemId].name.toUpperCase()}" IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }
        if (habitatId) {
            if (pokemon.habitatId === habitatId) {
                matches.push(`LIVES IN HABITAT "${Globals.Database.Habitats[habitatId].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }
        if (shapeId) {
            if (pokemon.shapeId === shapeId) {
                matches.push(`IS OF SHAPE "${Globals.Database.Shapes[shapeId].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }
        if (colorId) {
            if (pokemon.colorId === colorId) {
                matches.push(`IS OF COLOR "${Globals.Database.Colors[colorId].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }
        if (eggGroupId1) {
            if (pokemon.eggGroups.includes(eggGroupId1)) {
                matches.push(`IS OF EGG GROUP "${Globals.Database.EggGroups[eggGroupId1].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }
        if (eggGroupId2) {
            if (pokemon.eggGroups.includes(eggGroupId2)) {
                matches.push(`IS OF EGG GROUP "${Globals.Database.EggGroups[eggGroupId2].name.toUpperCase()}"`);
            } else {
                show = false;
            }
        }

        // evolution filters
        if (evolutions || evolutions === 0) {
            const chain = Globals.Database.Evolutions[pokemon.evolutionChainId];
            if (chain && countEvolutionDepth(chain) === evolutions) {
                matches.push(`EVOLVES "${evolutions}" TIMES (FROM THE START)`);
            } else {
                if (evolutions === 0 && !chain) {
                    matches.push(`HAS NO EVOLUTION CHAIN`);
                } else {
                    show = false;
                }
            }
        }
        if (evolutionItemId) {
            const chain = Globals.Database.Evolutions[pokemon.evolutionChainId];
            if (chain) {
                const hasEvolutionItem = (evolution) => {
                    if (evolution.triggers.some(t => t.heldItemId === evolutionItemId || t.triggerItemId === evolutionItemId)) {
                        return true;
                    } else {
                        for (const e of evolution.evolutions) {
                            if (hasEvolutionItem(e)) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                if (hasEvolutionItem(chain)) {
                    matches.push(`EVOLUTION CHAIN NEEDS "${Globals.Database.Items[evolutionItemId].name.toUpperCase()}"`);
                } else {
                    show = false;
                }
            } else {
                show = false;
            }
        }
        if (evolutionTriggerId) {
            const chain = Globals.Database.Evolutions[pokemon.evolutionChainId];
            if (chain) {
                const hasEvolutionTrigger = (evolution) => {
                    if (evolution.triggers.some(t => t.evolutionTriggerId === evolutionTriggerId)) {
                        return true;
                    } else {
                        for (const e of evolution.evolutions) {
                            if (hasEvolutionTrigger(e)) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                if (hasEvolutionTrigger(chain)) {
                    matches.push(`EVOLUTION CHAIN NEEDS "${Globals.Database.EvolutionTriggers[evolutionTriggerId].name.toUpperCase()}"`);
                } else {
                    show = false;
                }
            } else {
                show = false;
            }
        }

        // move filters        
        if (moveId1) {
            const match = checkIfPokemonLearnsMoves(pokemon, moveId1, null, versionGroupId, learnMethodId, null, null);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (moveId2) {
            const match = checkIfPokemonLearnsMoves(pokemon, moveId2, null, versionGroupId, learnMethodId, null, null);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (moveId3) {
            const match = checkIfPokemonLearnsMoves(pokemon, moveId3, null, versionGroupId, learnMethodId, null, null);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (moveId4) {
            const match = checkIfPokemonLearnsMoves(pokemon, moveId4, null, versionGroupId, learnMethodId, null, null);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }

        if (movesFromTypeId1 || moveTargetId) {
            const match = checkIfPokemonLearnsMoves(pokemon, null, movesFromTypeId1, versionGroupId, learnMethodId, moveTargetId, onlyAttacks);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (movesFromTypeId2 || moveTargetId) {
            const match = checkIfPokemonLearnsMoves(pokemon, null, movesFromTypeId2, versionGroupId, learnMethodId, moveTargetId, onlyAttacks);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (movesFromTypeId3 || moveTargetId) {
            const match = checkIfPokemonLearnsMoves(pokemon, null, movesFromTypeId3, versionGroupId, learnMethodId, moveTargetId, onlyAttacks);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }
        if (movesFromTypeId4 || moveTargetId) {
            const match = checkIfPokemonLearnsMoves(pokemon, null, movesFromTypeId4, versionGroupId, learnMethodId, moveTargetId, onlyAttacks);
            if (match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }
        }

        // encounter filters
        if (maxEcounterLevel || encounterMethodId || encounterConditionId || encounterLocationId || byBreeding || byEvolving) {

            const canEncounter = pokemon.encounters[versionId]?.filter(e => (
                (!maxEcounterLevel || (e.minlvl !== null && e.minlvl <= maxEcounterLevel)) &&
                (!encounterMethodId || e.methodId === encounterMethodId) &&
                (!encounterConditionId || e.conditionIds.includes(encounterConditionId)) &&
                (!encounterLocationId || e.locationId === encounterLocationId) &&
                (!byBreeding || e.isBreed) &&
                (!byEvolving || e.isEvolve)
            ));

            const match = canEncounter?.reduce((acc, e) => {
                if (!e.isBreed && !e.isEvolve) {
                    const methodName = Globals.Database.EncounterMethods[e.methodId].name.toUpperCase();
                    const conditionNames = e.conditionIds.map(c => Globals.Database.EncounterConditions[c].name.toUpperCase());
                    acc.push(`FOUND IN "${Globals.Database.Locations[e.locationId].name.toUpperCase()}"`)
                    acc.push(`AT LEVEL "${e.minlvl}~${e.maxlvl}" VIA "${methodName}" ${conditionNames.length > 0 ? `(${conditionNames.join(", ")})` : ""} IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"`)
                    acc.push("---");
                } else {
                    if (e.isBreed) {
                        acc.push(`BREED ${e.pokemonsIds.map(id => `"${Globals.Database.Pokemons[id].name.toUpperCase()}"`).join(" OR ")} IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"`);
                    } else if (e.isEvolve) {
                        acc.push(`EVOLVE ${e.pokemonsIds.map(id => `"${Globals.Database.Pokemons[id].name.toUpperCase()}"`).join(" OR ")} IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"`);
                    }
                }
                return acc;
            }, []);

            if (match && match.length > 0) {
                matches.push(...match);
            } else {
                show = false;
            }

        }

        // flags
        if (isBaby) {
            if (pokemon.flags.isBaby) {
                matches.push(`IS BABY`);
            } else {
                show = false;
            }
        }

        if (isLegendary) {
            if (pokemon.flags.isLegendary) {
                matches.push(`IS LEGENDARY`);
            } else {
                show = false;
            }
        }

        if (isMythical) {
            if (pokemon.flags.isMythical) {
                matches.push(`IS MYTHICAL`);
            } else {
                show = false;
            }
        }

        if (isRegional) {
            if (pokemon.flags.isRegional) {
                matches.push(`IS REGIONAL`);
            } else {
                show = false;
            }
        }

        if (isMega) {
            if (pokemon.flags.isMega) {
                matches.push(`IS MEGA`);
            } else {
                show = false;
            }
        }

        if (isTotem) {
            if (pokemon.flags.isTotem) {
                matches.push(`IS TOTEM`);
            } else {
                show = false;
            }
        }

        if (isGmax) {
            if (pokemon.flags.isGmax) {
                matches.push(`IS GMAX`);
            } else {
                show = false;
            }
        }

        if (hasGenderDifferences) {
            if (pokemon.flags.hasGenderDifferences) {
                matches.push(`HAS GENDER DIFFERENCES`);
            } else {
                show = false;
            }
        }

        // special filters
        if (onlyObtainable) {
            if (pokemon.encounters[versionId]?.length > 0) {
                matches.push(`OBTAINABLE IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"`);
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
            formatOrderByValue = p => `<label>WEIGHT = ${renderWeight(p.weight)}</label>`;
            break;
        }
        case "height": {
            getOrderByValue = p => p.height;
            formatOrderByValue = p => `<label>WEIGHT = ${renderHeight(p.height)}</label>`;
            break;
        }        
        case "base-exp": {
            getOrderByValue = p => p.baseExperience;
            formatOrderByValue = p => `<label>BASE EXPERIENCE = ${p.baseExperience}</label>`;
            break;
        }
        case "capture-rate": {
            getOrderByValue = p => p.captureRate;
            formatOrderByValue = p => `<label>CAPTURE RATE = ${p.captureRate}</label>`;
            break;
        }
        case "base-happiness": {
            getOrderByValue = p => p.baseHappiness;
            formatOrderByValue = p => `<label>BASE HAPPINESS = ${p.baseHappiness}</label>`;
            break;
        }
        case "growth-rate": {
            getOrderByValue = p => getGrowthRateOrder(p.growthRateId);
            formatOrderByValue = p => `<label>GROWTH RATE = ${renderGrowthRate(p.growthRateId).toUpperCase()}</label>`;
            break;
        }
        case "hatch-counter": {
            getOrderByValue = p => p.hatchCounter;
            formatOrderByValue = p => `<label>HATCH COUNTER = ${p.hatchCounter}</label>`;
            break;
        }
        case "gender-rate": {
            getOrderByValue = p => p.genderRate[0] === 0 && p.genderRate[1] === 0 ? 101 : p.genderRate[1]; 
            formatOrderByValue = p => renderGenderRate(p);
            break;
        }
        case "hp": {
            getOrderByValue = p => p.stats.hp.base;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "atk": {
            getOrderByValue = p => p.stats.atk.base;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "def": {
            getOrderByValue = p => p.stats.def.base;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "sp-atk": {
            getOrderByValue = p => p.stats.spatk.base;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "sp-def": {
            getOrderByValue = p => p.stats.spdef.base;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "speed": {
            getOrderByValue = p => p.stats.speed.base;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "total": {
            getOrderByValue = p => p.stats.total;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "ev-hp": {
            getOrderByValue = p => p.stats.hp.ev;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "ev-atk": {
            getOrderByValue = p => p.stats.atk.ev;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "ev-def": {
            getOrderByValue = p => p.stats.def.ev;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "ev-sp-atk": {
            getOrderByValue = p => p.stats.spatk.ev;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "ev-sp-def": {
            getOrderByValue = p => p.stats.spdef.ev;
            formatOrderByValue = p => renderStats(p);
            break;
        }
        case "ev-speed": {
            getOrderByValue = p => p.stats.speed.ev;
            formatOrderByValue = p => renderStats(p);
            break;
        }        
        case "type-weakness": {
            getOrderByValue = p => p.typeEfficacy.sum(v => v);
            formatOrderByValue = p => renderTypesEffectiveness(p.typeEfficacy);
            break;
        }
        case "encounter-level": {
            getOrderByValue = p => {
                if (p.encounters[versionId]){
                    const lvl = Math.min(...p.encounters[versionId].map(e => e.minlvl));
                    return lvl > 0 ? lvl : 998; // breed or evolve, throw at the end
                } else {
                    return 999; // if it cant be encountered, throw at the end
                }
            }
            formatOrderByValue = p => {
                if (p.encounters[versionId]) {
                    const lvl = Math.min(...p.encounters[versionId].map(e => e.minlvl));
                    if (lvl) {
                        const e = p.encounters[versionId].filter(e => e.minlvl === lvl)[0];
                        const methodName = Globals.Database.EncounterMethods[e.methodId].name.toUpperCase();
                        const conditionNames = e.conditionIds.map(c => Globals.Database.EncounterConditions[c].name.toUpperCase());
                        return `
                            <label>
                                FOUND IN "${Globals.Database.Locations[e.locationId].name.toUpperCase()}" <br>
                            </label>
                            <label>    
                                AT LEVEL "${e.minlvl}~${e.maxlvl}" VIA "${methodName}" ${conditionNames.length > 0 ? `(${conditionNames.join(", ")})` : ""} IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"
                            </label>
                        `;
                    } else {
                        const e = p.encounters[versionId][0];
                        if (e.isBreed) {
                            return `<label>BREED ${e.pokemonsIds.map(id => `"${Globals.Database.Pokemons[id].name.toUpperCase()}"`).join(" OR ")} IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"</label>`;
                        } else if (e.isEvolve) {
                            return `<label>EVOLVE ${e.pokemonsIds.map(id => `"${Globals.Database.Pokemons[id].name.toUpperCase()}"`).join(" OR ")} IN "${Globals.Database.Versions[versionId].name.toUpperCase()}"</label>`;
                        }
                    }
                } else {
                    return "";
                }
            };
            break;
        }
    }

    const orderedPokemons = direction === "asc" ? Object.values(filteredPokemons).orderBy(getOrderByValue) : Object.values(filteredPokemons).orderByDesc(getOrderByValue);

    const pokemonsHTMLs = orderedPokemons.map(pokemon => {
        let orderByValueHTML = "";
        if (order !== "id" && order !== "name") {
            orderByValueHTML = `
                ${pokemon.matches.length > 0 ? "<hr>" : ""}
                ${formatOrderByValue(pokemon)}
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

function countEvolutionDepth (chain) {
    if (chain.evolutions[0].evolutions.length > 0) {
        return 2;
    } else {
        return 1;
    }
}

function checkIfPokemonLearnsMoves(pokemon, moveId, typeId, versionGroupId, learnMethodId, moveTargetId, onlyAttacks) {

    const versionGroup = Globals.Database.VersionGroups[versionGroupId];

    const learns = pokemon.moves[versionGroup.id]?.filter(learn => {
        const move = Globals.Database.Moves[learn.moveId];
        return (
            (!moveId || moveId === move.id) &&
            (!typeId || typeId === move.typeId) &&
            (!learnMethodId || learnMethodId === learn.methodId) &&
            (!onlyAttacks || [2, 3].includes(move.damageClassId)) &&
            (!moveTargetId || moveTargetId === move.targetId)
        );
    });

    if (learns && learns.length > 0) {
        const matches = [];
        for (const learn of learns) {
            const move = Globals.Database.Moves[learn.moveId];
            switch (learn.methodId) {
                // by level up
                case 1: {
                    const preEvolution = learn.preEvolution ? Globals.Database.Pokemons[learn.pokemonId].name.toUpperCase() + " " : "";
                    matches.push(`${preEvolution} LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" AT LEVEL "${learn.level}" IN "${versionGroup.name.toUpperCase()}"`);
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
                    matches.push(`LEARNS "<span class="type" data-type-id="${move.typeId}">${move.name.toUpperCase()}</span>" FROM "${Globals.Database.MoveLearnMethods[learn.methodId].name.toUpperCase()}" IN "${versionGroup.name.toUpperCase()}"`);
                    break;
                }
            }
        }
        return matches;
    } else {
        return [];
    }

}

function selectPokemon(pokemonId, teamSlot) {
    Globals.Parameters.Team[teamSlot - 1].id = pokemonId;
    Swal.close();
}