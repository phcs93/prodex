/*

    # PokeAPI ETL (Extract Transform Load)

    This program will git clone the official PokeAPI repository (https://github.com/PokeAPI/pokeapi) and transform all CSV data into a compressed JSON file.
    The JSON file is actually in `.gzip` format because it is compressed by ZLIB (https://nodejs.org/api/zlib.html) (nodejs native library).
    This file needs to be decompressed by a compatible algorithm like pako.js (https://github.com/nodeca/pako).
    Currently, the generated file is compressed to less than 1 MB.

    This tool will also generate a pokemon spritesheet `PNG` and it's corresponding `CSS` based on the PokeAPI sprites repository (https://github.com/PokeAPI/sprites)
    This tool will also generate a footprint spritesheet `PNG` and it's corresponding `CSS` based on the FootprintAPI repository (https://github.com/KierranFalloon/FootprintAPI)

*/

require("./src/prototypes/Array.js");

const fs = require("fs");
const zlib = require("zlib");
const sharp = require("sharp");
const execSync = require("node:child_process").execSync;

(async () => {

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const format = (s) => s.split("-").map(w => capitalize(w)).join(" ");

    // create git folder if it doesn't exist
    if (!fs.existsSync("git")) fs.mkdirSync("git");

    // clone pokeapi csv repo if it doesn't exist
    if (!fs.existsSync("git/pokeapi")) execSync("git clone https://github.com/PokeAPI/pokeapi.git", { stdio: [0, 1, 2], cwd: "git" });

    // clone pokeapi sprites repo if it doesn't exist
    if (!fs.existsSync("git/sprites")) execSync("git clone https://github.com/PokeAPI/sprites.git", { stdio: [0, 1, 2], cwd: "git" });

    // clone footprint api repo if it doesn't exist
    if (!fs.existsSync("git/FootprintAPI")) execSync("git clone https://github.com/KierranFalloon/FootprintAPI.git", { stdio: [0, 1, 2], cwd: "git" });

    // log
    console.log("Processing CSV data...");

    // reads csv file and parses its contents to and array of arrays, also cleans empty lines
    const parseCSV = fileName => fixCSV(fs.readFileSync(`git/pokeapi/data/v2/csv/${fileName}`, { encoding: "utf-8" })).split("\r\n").slice(1).filter(v => v).map(s => s.split(","));

    // replaces commas and line breaks inside of quotes
    const fixCSV = csv => {
        const matches = csv.match(/"(.|\r\n)*?"/gm);
        if (matches) {
            for (const match of matches) {
                csv = csv.replace(match, match.replace(/\"/gm, "").replace(/,/gm, "<comma>").replace(/\r\n/gm, "<break>"));
            }
        }
        return csv;
    }

    /*
        0 = id
        1 = identifier
    */
    const regionDictionary = parseCSV("regions.csv").toDictionary(r => r[0], r => ({
        id: parseInt(r[0]),
        name: format(r[1])
    }));

    /*
        0 = id
        1 = main_region_id
        2 = identifier
    */
    const generationDictionary = parseCSV("generations.csv").toDictionary(g => g[0], g => ({
        id: parseInt(g[0]),
        name: `${format(g[2].split("-")[0])} ${g[2].split("-")[1].toUpperCase()}`,
        mainRegionId: parseInt(g[1])
    }));

    /*
        0 = id
        1 = identifier
        2 = generation_id
        3 = order
    */
    const versionGroupDictionary = parseCSV("version_groups.csv").toDictionary(vg => vg[0], vg => ({
        id: parseInt(vg[0]),
        name: format(vg[1]),
        generationId: parseInt(vg[2])
    }));
    
    /*
        0 = id
        1 = version_group_id
        2 = identifier
    */
    const versionDictionary = parseCSV("versions.csv").toDictionary(v => v[0], v => ({
        id: parseInt(v[0]),
        name: format(v[2]),
        versionGroupId: parseInt(v[1])
    }));

    // TODO => parse placeholders
    /*
        0 = ability_id
        1 = local_language_id
        2 = short_effect
        3 = effect
    */
    const _abilityDescriptionDictionary = parseCSV("ability_prose.csv").filter(ad => ad[1] === "9").toDictionary(ad => ad[0], ad => {
        return ad[2].replace(/\<comma\>/gm, ",").replace("/\<break\>/gm", "\n");
    });

    /*
        0 = id
        1 = identifier
        2 = generation_id
        3 = is_main_series
    */
    const abilityDictionary = parseCSV("abilities.csv").toDictionary(a => a[0], a => ({
        id: parseInt(a[0]),
        name: format(a[1]),
        generationId: parseInt(a[2]),
        isMainSeries: parseInt(a[3]) === 1,
        description: _abilityDescriptionDictionary[a[0]]
    }));
    
    /*
        0 = id
        1 = identifier
    */
    const eggGroupDictionary = parseCSV("egg_groups.csv").toDictionary(eg => eg[0], eg => ({
        id: parseInt(eg[0]),
        name: format(eg[1])
    }));
    
    /*
        0 = id
        1 = identifier
    */
    const colorsDictionary = parseCSV("pokemon_colors.csv").toDictionary(c => c[0], c => ({
        id: parseInt(c[0]),
        name: format(c[1])
    }));
    
    /*
        0 = id
        1 = identifier
    */
    const shapesDictionary = parseCSV("pokemon_shapes.csv").toDictionary(s => s[0], s => ({
        id: parseInt(s[0]),
        name: format(s[1])
    }));
    
    /*
        0 = id
        1 = identifier
    */
    const habitatDictionary = parseCSV("pokemon_habitats.csv").toDictionary(h => h[0], h => ({
        id: parseInt(h[0]),
        name: format(h[1])
    }));
    
    /*
        0 = id
        1 = identifier
        2 = formula
    */
    const growthRateDictionary = parseCSV("growth_rates.csv").filter(gr => gr[0].indexOf("\\") === -1).toDictionary(gr => gr[0], gr => ({
        id: parseInt(gr[0]),
        name: format(gr[1])
    }));
    
    /*
        0 = id
        1 = identifier
    */
    const moveLearnMethodDictionary = parseCSV("pokemon_move_methods.csv").toDictionary(mm => mm[0], mm => ({
        id: parseInt(mm[0]),
        name: format(mm[1])
    }));

    /*
        0 = id
        1 = identifier
    */
    const moveTargetDictionary = parseCSV("move_targets.csv").toDictionary(mt => mt[0], mt => ({
        id: parseInt(mt[0]),
        name: format(mt[1])
    }));
    
    /*
        0 = id
        1 = identifier
        2 = order
    */
    const encounterMethodDictionary = parseCSV("encounter_methods.csv").toDictionary(em => em[0], em => ({
        id: parseInt(em[0]),
        name: format(em[1])
    }));

    /*
        0 = id
        1 = encounter_condition_id
        2 = identifier
        3 = is_default
    */
    const encounterConditionDictionary = parseCSV("encounter_condition_values.csv").toDictionary(ec => ec[0], ec => ({
        id: parseInt(ec[0]),
        encounterConditionId: parseInt(ec[1]),
        name: format(ec[2]),
        isDefault: parseInt(ec[3]) === 1
    }));

    /*
        0 = id
        1 = identifier
    */
    const evolutionTriggerDictionary = parseCSV("evolution_triggers.csv").toDictionary(et => et[0], et => ({
        id: parseInt(et[0]),
        name: format(et[1])
    }));
   
    /*
        0 = id
        1 = identifier
        2 = generation_id
        3 = damage_class_id
        // move damage class is dealt with in the front end (pior to gen 4, the move damage class was based on the move elemental type)
    */
    const typeDictionary = parseCSV("types.csv").toDictionary(t => t[0], t => ({
        id: parseInt(t[0]),
        name: format(t[1])
    }));

    /*
        0 = id
        1 = region_id
        2 = identifier
    */
    const _locationDictionary = parseCSV("locations.csv").toDictionary(l => l[0], l => ({
        id: parseInt(l[0]),
        regionId: parseInt(l[1]),
        name: l[2]
    }));

    /*
        0 = id
        1 = location_id
        2 = game_index
        3 = identifier
    */
    const locationDictionary = parseCSV("location_areas.csv").toDictionary(l => l[0], l => ({
        id: l[0],
        name: format(`${_locationDictionary[l[1]].name}${l[3] ? `-${l[3]}` : ""}`),
        regionId: _locationDictionary[l[1]].regionId
    }));
    
    // TODO => parse placeholders
    /*
        0 = move_effect_id
        1 = local_language_id
        2 = short_effect
        3 = effect
    */
    const _moveEffectDictionary = parseCSV("move_effect_prose.csv").filter(me => me[1] === "9").toDictionary(me => me[0], me => {
        return me[2].replace(/\<comma\>/gm, ",").replace("/\<break\>/gm", "\n");
    });

    /*
        0 = id
        1 = identifier
        2 = generation_id
        3 = type_id
        4 = power
        5 = pp
        6 = accuracy
        7 = priority
        8 = target_id
        9 = damage_class_id
        10 = effect_id
        11 = effect_chance
        12 = contest_type_id
        13 = contest_effect_id
        14 = super_contest_effect_id
    */
    const moveDictionary = parseCSV("moves.csv").toDictionary(m => m[0], m => ({
        id: parseInt(m[0]) || 0,
        name: format(m[1]),
        generationId: parseInt(m[2]) || 0,
        typeId: parseInt(m[3]) || 0,
        power: parseInt(m[4]) || 0,
        pp: parseInt(m[5]) || 0,
        accuracy: parseInt(m[6]) || 0,
        priority: parseInt(m[7]) || 0,
        targetId: parseInt(m[8]) || 0,
        damageClassId: parseInt(m[9]) || 0,
        effect: _moveEffectDictionary[m[10]],
        effectChance: parseInt(m[11]) || 0,
        contestTypeId: parseInt(m[12]) || 0,
        contestEffectId: parseInt(m[13]) || 0,
        superContestEffectId: parseInt(m[14]) || 0
    }));    

    /*
        0 = id
        1 = identifier
        2 = category_id
        3 = cost
        4 = fling_power
        5 = fling_effect_id
    */
    const itemDictionary = parseCSV("items.csv").toDictionary(i => i[0], i => ({
        id: parseInt(i[0]) || 0,
        name: i[1],
        categoryId: parseInt(i[2]) || 0,
        cost: parseInt(i[3]) || 0,
        flingPower: parseInt(i[4]) || 0,
        flingEffectId: parseInt(i[5]) || 0
    }));

    /*
        0 = machine_number
        1 = version_group_id
        2 = item_id
        3 = move_id
    */
    const machineDictionary = parseCSV("machines.csv").reduce((dictionary, machine) => {

        // group by version group id
        if (!dictionary[machine[1]]) {
            dictionary[machine[1]] = {};
        }

        // dictionary from move id to item id
        dictionary[machine[1]][machine[3]] = parseInt(machine[2]);

        return dictionary;

    }, {});

    /*
        0 = id
        1 = evolved_species_id
        2 = evolution_trigger_id
        3 = trigger_item_id
        4 = minimum_level
        5 = gender_id
        6 = location_id
        7 = held_item_id
        8 = time_of_day
        9 = known_move_id
        10 = known_move_type_id
        11 = minimum_happiness
        12 = minimum_beauty
        13 = minimum_affection
        14 = relative_physical_stats
        15 = party_species_id
        16 = party_type_id
        17 = trade_species_id
        18 = needs_overworld_rain
        19 = turn_upside_down
    */
    const _pokemonEvolutionTriggerDictionary = parseCSV("pokemon_evolution.csv").toDictionary(et => et[1], et => ({
        //id: parseInt(parseInt(evolution[0])) || 0,
        //evolved_species_id: parseInt(evolution[1]) || 0,
        evolutionTriggerId: parseInt(et[2]) || 0,
        triggerItemId: parseInt(et[3]) || 0,
        minimumLevel: parseInt(et[4]) || 0,
        genderId: parseInt(et[5]) || 0,
        locationId: parseInt(et[6]) || 0,
        heldItemId: parseInt(et[7]) || 0,
        timeOfDay: et[8],
        knownMoveId: parseInt(et[9]) || 0,
        knownMoveTypeId: parseInt(et[10]) || 0,
        minimumHappiness: parseInt(et[11]) || 0,
        minimumBeauty: parseInt(et[12]) || 0,
        minimumAffection: parseInt(et[13]) || 0,
        relativePhysicalStats: parseInt(et[14]) || 0,
        partySpeciesId: parseInt(et[15]) || 0,
        partyTypeId: parseInt(et[16]) || 0,
        tradeSpeciesId: parseInt(et[17]) || 0,
        needsOverworldRain: parseInt(et[18]) || 0,
        turnUpsideDown: parseInt(et[19]) || 0
    }));

    /*
        0 = id
        1 = identifier
        2 = generation_id
        3 = evolves_from_species_id
        4 = evolution_chain_id
        5 = color_id
        6 = shape_id
        7 = habitat_id
        8 = gender_rate
        9 = capture_rate
        10 = base_happiness
        11 = is_baby
        12 = hatch_counter
        13 = has_gender_differences
        14 = growth_rate_id
        15 = forms_switchable
        16 = is_legendary
        17 = is_mythical
        18 = order
        19 = conquest_order
    */
    const _pokemonSpecieDictionary = parseCSV("pokemon_species.csv").toDictionary(ps => ps[0], ps => ({
        id: parseInt(ps[0]),
        name: ps[1],
        generationId: parseInt(ps[2]),
        evolvesFromSpeciesId: parseInt(ps[3]) || 0,
        evolutionChainId: parseInt(ps[4]) || 0,
        colorId: parseInt(ps[5]),
        shapeId: parseInt(ps[6]),
        habitatId: parseInt(ps[7]),
        genderRate: parseFloat(ps[8]),
        captureRate: parseInt(ps[9]),
        baseHappiness: parseInt(ps[10]),
        isBaby: parseInt(ps[11]) === 1,
        hatchCounter: parseInt(ps[12]),
        hasGenderDifferences: parseInt(ps[13]) === 1,
        growthRateId: parseInt(ps[14]),
        formsSwitchable: parseInt(ps[15]) === 1,
        isLegendary: parseInt(ps[16]) === 1,
        isMythical: parseInt(ps[17]) === 1,
        order: parseInt(ps[18]),
        conquestOrder: parseInt(ps[19])
    }));

    /*
        0 = id
        1 = identifier
        2 = form_identifier
        3 = pokemon_id
        4 = introduced_in_version_group_id
        5 = is_default
        6 = is_battle_only
        7 = is_mega
        8 = form_order
        9 = order
    */
    const _pokemonFormsDictionary = parseCSV("pokemon_forms.csv").groupBy(pf => pf[3], pf => ({
        id: parseInt(pf[0]),
        name: pf[1],
        formIdentifier: pf[2],
        pokemonId: parseInt(pf[3]),
        introducedInVersionGroupId: parseInt(pf[4]),
        isDefault: parseInt(pf[5]) === 1,
        isBattleOnly: parseInt(pf[6]) === 1,
        isMega: parseInt(pf[7]) === 1,
        formOrder: pf[8],
        order: pf[9]
    }));

    const _species = Object.values(_pokemonSpecieDictionary);
    /*
        @typedef
    */
    const evolutionChainDictionary = _species.filter(specie => specie.evolvesFromSpeciesId === 0).reduce((dictionary, specie) => {

        const getEvolutions = (previous) => {

            const chains = [];

            const nextSpecies = _species.filter(s => s.evolvesFromSpeciesId === previous.id);
    
            for (const nextSpecie of nextSpecies) {
                chains.push({
                    specieId: nextSpecie.id, 
                    triggers: _pokemonEvolutionTriggerDictionary[nextSpecie.id], 
                    evolutions: getEvolutions(nextSpecie)
                });
            }

            return chains;

        };

        const evolutions = getEvolutions(specie);

        if (evolutions && evolutions.length > 0) {
            dictionary[specie.evolutionChainId] = {
                specieId: specie.id, 
                triggers: [], 
                evolutions: evolutions
            }
        }

        return dictionary;

    }, {});

    // TODO => consider ability when calculating type efficacy
    /*
        0 = damage_type_id
        1 = target_type_id
        2 = damage_factor
    */
    const _typeEfficacyDictionary = parseCSV("type_efficacy.csv").reduce((dictionary, type) => {
        if (!dictionary[type[0]]) {
            dictionary[type[0]] = {};
        }
        if (!dictionary[type[0]][type[1]]) {
            dictionary[type[0]][type[1]] = type[2] / 100;
        }
        return dictionary;
    }, {});

    /*
        0 = pokemon_species_id
        1 = local_language_id
        2 = name
        3 = genus
    */
    const _pokemonSpecieNameDictionary = parseCSV("pokemon_species_names.csv").filter(s => s[1] === "9").toDictionary(sn => sn[0], sn => {
        return sn[3];
    });

    /*
        0 = pokemon_id
        1 = type_id
        2 = slot
    */
    const _pokemonTypesDictionary = parseCSV("pokemon_types.csv").groupBy(pt => pt[0], pt => {
        return parseInt(pt[1]);
    });

    /*
        0 = species_id
        1 = egg_group_id
    */
    const _pokemonEggGroupsDictionary = parseCSV("pokemon_egg_groups.csv").groupBy(peg => peg[0], peg => {
        return parseInt(peg[1]);
    });

    /*
        0 = pokemon_id
        1 = ability_id
        2 = is_hidden
        3 = slot
    */
    const _pokemonAbilitiesDictionary = parseCSV("pokemon_abilities.csv").reduce((dictionary, ability) => {

        // group by pokemon id
        if (!dictionary[ability[0]]) {
            dictionary[ability[0]] = [];
        }

        dictionary[ability[0]][parseInt(ability[3])-1] = parseInt(ability[1]);

        return dictionary;

    }, {});

    /*
        0 = pokemon_id
        1 = stat_id ( 1 = hp | 2 = atk | 3 = def | 4 = sp.atk | 5 = sp.def | 6 = speed )
        2 = base_stat
        3 = effort
    */
    const _pokemonStatsDictionary = parseCSV("pokemon_stats.csv").map(m => m.map(i => parseInt(i))).reduce((dictionary, stat) => {

        const calcHP = (base, iv, ev, level) => Math.floor(Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10);
        const calcStat = (base, iv, ev, level, nature) => Math.floor((Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * nature);

        // group by pokemon id
        if (!dictionary[stat[0]]) {
            dictionary[stat[0]] = {};
        }

        if (stat[1] === 1) {
            dictionary[stat[0]].hp = {
                base: stat[2],
                min: calcHP(stat[2], 0, 0, 100),
                max: calcHP(stat[2], 31, 252, 100),
                ev: stat[3]
            }
        } else {
            const s = {
                base: stat[2],
                min: calcStat(stat[2], 0, 0, 100, 0.9),
                max: calcStat(stat[2], 31, 252, 100, 1.1),
                ev: stat[3]
            };
            switch (stat[1]) {
                case 2: dictionary[stat[0]].atk = s; break;
                case 3: dictionary[stat[0]].def = s; break;
                case 4: dictionary[stat[0]].spatk = s; break;
                case 5: dictionary[stat[0]].spdef = s; break;
                case 6: dictionary[stat[0]].speed = s; break;
            }
        }

        if (!dictionary[stat[0]].total) {
            dictionary[stat[0]].total = 0;
        }
        
        dictionary[stat[0]].total += stat[2];

        return dictionary;

    }, {});

    /*
        0 = pokemon_id
        1 = version_id
        2 = item_id
        3 = rarity
    */
    const _pokemonItemsDictionary = parseCSV("pokemon_items.csv").map(s => s.map(i => parseInt(i))).reduce((dictionary, item) => {

        // group by pokemon id
        if (!dictionary[item[0]]) {
            dictionary[item[0]] = {};
        }

        // group by version id
        if (!dictionary[item[0]][item[1]]) {
            dictionary[item[0]][item[1]] = [];
        }

        dictionary[item[0]][item[1]].push({
            id: item[2], 
            rarity: item[3]
        });

        return dictionary;

    }, {});

    /*
        0 = pokemon_id
        1 = version_group_id
        2 = move_id
        3 = pokemon_move_method_id
        4 = level
        5 = order
    */
    const _pokemonMovesDictionary = parseCSV("pokemon_moves.csv").map(m => m.map(i => parseInt(i))).reduce((dictionary, move) => {

        // group by pokemon id
        if (!dictionary[move[0]]) {
            dictionary[move[0]] = {};
        }

        // group by version id
        if (!dictionary[move[0]][move[1]]) {
            dictionary[move[0]][move[1]] = [];
        }

        dictionary[move[0]][move[1]].push({
            id: move[2], 
            methodId: move[3], 
            level: move[4]
        });

        return dictionary;

    }, {});

    /*
        0 = encounter_id
        1 = encounter_condition_value_id
    */
    const _pokemonEncounterConditionsDictionary = parseCSV("encounter_condition_value_map.csv").groupBy(pec => pec[0], pec => ({
        id: parseInt(pec[0]),
        encounterConditionValueId: parseInt(pec[1])
    }));

    /*
        0 = id
        1 = version_group_id
        2 = encounter_method_id
        3 = slot
        4 = rarity
    */
    const _pokemonEncounterSlotsDictionary = parseCSV("encounter_slots.csv").toDictionary(pes => pes[0], pes => ({
        id: parseInt(pes[0]),
        versionGroupId: parseInt(pes[1]),
        encounterMethodId: parseInt(pes[2]),
        slot: parseInt(pes[3]),
        rarity: parseInt(pes[4])
    }));

    /*
        0 = id
        1 = version_id
        2 = location_area_id
        3 = encounter_slot_id
        4 = pokemon_id
        5 = min_level
        6 = max_level
    */
    const _pokemonEncountersDictionary = parseCSV("encounters.csv").reduce((dictionary, encounter) => {
        
        // group by pokemon id
        if (!dictionary[encounter[4]]) {
            dictionary[encounter[4]] = {}; 
        }

        // group by version id
        if (!dictionary[encounter[4]][encounter[1]]) {                
            dictionary[encounter[4]][encounter[1]] = []; 
        }

        const slot = _pokemonEncounterSlotsDictionary[encounter[3]];
        const conditions = (_pokemonEncounterConditionsDictionary[encounter[0]] ?? []).map(ec => ec.encounterConditionValueId);
        
        dictionary[encounter[4]][encounter[1]].push({
            locationId: parseInt(encounter[2]),
            methodId: parseInt(slot.encounterMethodId),          
            conditionIds: conditions.filter(conditionId => {
                const condition = encounterConditionDictionary[conditionId];
                if ([2, 8].includes(condition.encounterConditionId)) { // don't ignore time or tv-option
                    return true;
                }
                return !condition.isDefault; // ignore all default conditions
            }),      
            minlvl: parseInt(encounter[5]),
            maxlvl: parseInt(encounter[6]),
            rarity: parseInt(slot.rarity)
        });

        return dictionary;

    }, {});

    // group by locationId|methodId|conditionIds => min minlvl | max maxlvl | sum rarity 
    // I don't understand why the hell this is like this but, it is what it is
    for (const pokemonId of Object.keys(_pokemonEncountersDictionary)) {
        for (const versionId of Object.keys(_pokemonEncountersDictionary[pokemonId])) {
            const encounters = _pokemonEncountersDictionary[pokemonId][versionId].groupBy(e => `${e.locationId}|${e.methodId}|${e.conditionIds.join("#")}`);
            const reducedEncounters = [];
            for (const lmc of Object.keys(encounters)) {
                const mmr = encounters[lmc].reduce((a, c) => [Math.min(a[0], c.minlvl), Math.max(a[1], c.maxlvl), a[2] + c.rarity], [100, 0, 0]);
                const split = lmc.split("|");
                reducedEncounters.push({
                    locationId: parseInt(split[0]), 
                    methodId: parseInt(split[1]), 
                    conditionIds: split[2] ? split[2].split("#").map(v => parseInt(v)) : [], 
                    minlvl: mmr[0],
                    maxlvl: mmr[1],
                    rarity: mmr[2]
                });
            }
            _pokemonEncountersDictionary[pokemonId][versionId] = reducedEncounters;
        }
    }

    // TODO => select corresponding form?
    /*
        0 = id
        1 = identifier
        2 = species_id
        3 = height
        4 = weight
        5 = base_experience
        6 = order
        7 = is_default
    */
    const pokemonDictionary = parseCSV("pokemon.csv").filter(p => _pokemonFormsDictionary[p[0]]).toDictionary(p => p[0], pokemon => {

        const specie = _pokemonSpecieDictionary[pokemon[2]];
        const form = _pokemonFormsDictionary[pokemon[0]][0]; // select only the first form

        const types = _pokemonTypesDictionary[pokemon[0]];
        const abilities = _pokemonAbilitiesDictionary[pokemon[0]];

        return {

            id: parseInt(pokemon[0]), // internal pokeapi id
            pokedexId: parseInt(pokemon[2]), // actual pokemon pokedex id

            name: format(pokemon[1]),
            specie: _pokemonSpecieNameDictionary[pokemon[2]], // seed pokemon, etc...
            form: form.formIdentifier || null, // alolan, mega, etc...

            introducedInGeneration: versionGroupDictionary[form.introducedInVersionGroupId].generationId,

            types: types,
            eggGroups: _pokemonEggGroupsDictionary[pokemon[2]],
            abilities: [abilities[0], abilities[1] ? abilities[1] : 0, abilities[2] ? abilities[2] : 0],

            height: parseFloat(pokemon[3]) / 10.0,
            weight: parseFloat(pokemon[4]) / 10.0,

            colorId: specie.colorId,
            shapeId: specie.shapeId,
            habitatId: specie.habitatId,

            baseExperience: parseInt(pokemon[5]),
            baseHappiness: specie.baseHappiness,

            captureRate: specie.captureRate,
            genderRate: [specie.genderRate === -1 ? 0 : 100 - ((specie.genderRate / 8) * 100), specie.genderRate === -1 ? 0 : (specie.genderRate / 8) * 100],

            hatchCounter: specie.hatchCounter,
            growthRateId: specie.growthRateId,

            evolutionChainId: evolutionChainDictionary[specie.evolutionChainId] ? specie.evolutionChainId : null,

            flags: {
                isBaby: specie.isBaby,
                isLegendary: specie.isLegendary,
                isMythical: specie.isMythical,
                isMega: form.isMega,
                isRegional: Object.values(regionDictionary).map(r => r.name.toUpperCase()).includes(form.formIdentifier.toUpperCase()),
                isGmax: form.formIdentifier === "gmax",
                isTotem: form.formIdentifier.includes("totem"),
                isBattleOnly: form.isBattleOnly,
                hasGenderDifferences: specie.hasGenderDifferences,
                formsSwitchable: specie.formsSwitchable
            },

            typeEfficacy: Object.keys(_typeEfficacyDictionary).map(t => _typeEfficacyDictionary[t][types[0]] * (types[1] ? _typeEfficacyDictionary[t][types[1]] : 1)),

            stats: _pokemonStatsDictionary[pokemon[0]],
            items: _pokemonItemsDictionary[pokemon[0]] ?? {},
            moves: _pokemonMovesDictionary[pokemon[0]] ?? {},
            encounters: _pokemonEncountersDictionary[pokemon[0]] ?? {}

        };

    });

    // log
    console.log("CSV data successfully processed!");

    // create database json
    const database = {
        Pokemons: addEncounterIfCanBeEvolvedOrHatched(fix(pokemonDictionary), evolutionChainDictionary, versionDictionary, versionGroupDictionary),
        Evolutions: evolutionChainDictionary,
        Items: itemDictionary,
        Moves: moveDictionary,
        Locations: locationDictionary,
        Machines: machineDictionary,
        Generations: generationDictionary,
        VersionGroups: versionGroupDictionary,
        Versions: versionDictionary,
        Abilities: abilityDictionary,
        EggGroups: eggGroupDictionary,
        Colors: colorsDictionary,
        Shapes: shapesDictionary,
        Habitats: habitatDictionary,
        GrowthRates: growthRateDictionary,
        MoveLearnMethods: moveLearnMethodDictionary,
        MoveTargets: moveTargetDictionary,
        EncounterMethods: encounterMethodDictionary,
        EvolutionTriggers: evolutionTriggerDictionary,
        EncounterConditions: encounterConditionDictionary,
        Regions: regionDictionary,
        Types: typeDictionary
    };

    // calculate size of each dictionary
    const databaseSizes = Object.keys(database).toDictionary(k => k, k => Buffer.byteLength(JSON.stringify(database[k]), "utf8") / 1024 / 1024);

    // log each size
    for (const k of Object.keys(database)) {
        console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${Object.keys(database[k]).length}\x1b[0m] ${k.toLowerCase()} (\x1b[33m${databaseSizes[k].toFixed(4)} MB\x1b[0m)`);
    }

    // sum total size of json
    const totalSize = Object.values(databaseSizes).reduce((sum, v) => sum += v, 0);    

    // log total size
    console.log(`Total JSON size [\x1b[33m${totalSize.toFixed(4)} MB\x1b[0m]`);

    // log
    console.log("Compressing JSON data...");

    // compress database
    const compressedDatabase = zlib.gzipSync(JSON.stringify(database));

    // create database file
    fs.writeFileSync("res/database.gzip", compressedDatabase);

    // get compressed gzip file size
    const compressedDatabaseSize = fs.statSync("res/database.gzip").size / (1024 * 1024);

    // log end and size of generated files
    console.log(`\x1b[32m✓\x1b[0m [\x1b[33mres/database.gzip\x1b[0m] successfully generated! (\x1b[33m${compressedDatabaseSize.toFixed(4)} MB\x1b[0m)`);

    // create pokemon pokemon-spritesheet.png and pokemon-spritesheet.css
    await genereatePokemonSpritesheet(pokemonDictionary);

    // create pokemon footprint-spritesheet.png and footprint-spritesheet.css
    await generateFootprintSpritesheet(pokemonDictionary);

})();

// this function "fixes" some wrong data generated due to the way I've merged forms, species and pokemon data togheter
function fix (pokemons) {

    // gmax vensaur doesn't have gender differences
    pokemons[10195].flags.hasGenderDifferences = false;

    // gmax butterfree doesn't have gender differences
    pokemons[10198].flags.hasGenderDifferences = false;

    // gmax pikachu doesn't have gender differences
    pokemons[10199].flags.hasGenderDifferences = false;

    // totem raticate doesn't have gender differences
    pokemons[10093].flags.hasGenderDifferences = false;

    // alolan rattata doesn't have gender differences
    pokemons[10091].flags.hasGenderDifferences = false;

    // alolan raticate doesn't have gender differences
    pokemons[10092].flags.hasGenderDifferences = false;

    // alolan raichu doesn't have gender differences
    pokemons[10100].flags.hasGenderDifferences = false;

    // paldean wooper doesn't have gender differences
    pokemons[10253].flags.hasGenderDifferences = false;

    // cosplay pikachus don't have gender differences
    pokemons[10080].flags.hasGenderDifferences = false;
    pokemons[10081].flags.hasGenderDifferences = false;
    pokemons[10082].flags.hasGenderDifferences = false;
    pokemons[10083].flags.hasGenderDifferences = false;
    pokemons[10084].flags.hasGenderDifferences = false;     
    pokemons[10085].flags.hasGenderDifferences = false;

    // mega evolutions don't gave gender differences
    pokemons[10033].flags.hasGenderDifferences = false;
    pokemons[10037].flags.hasGenderDifferences = false;
    pokemons[10041].flags.hasGenderDifferences = false;
    pokemons[10046].flags.hasGenderDifferences = false;
    pokemons[10047].flags.hasGenderDifferences = false;
    pokemons[10048].flags.hasGenderDifferences = false;
    pokemons[10050].flags.hasGenderDifferences = false;
    pokemons[10054].flags.hasGenderDifferences = false;
    pokemons[10058].flags.hasGenderDifferences = false;
    pokemons[10060].flags.hasGenderDifferences = false;
    pokemons[10072].flags.hasGenderDifferences = false;
    pokemons[10087].flags.hasGenderDifferences = false;

    // meowstic-male doesn't need to have gender differences because there is a specific pokemon entry for it (like nidorino and nidorina)
    pokemons[678].flags.hasGenderDifferences = false;

    // meowstic-female doesn't need to have gender differences because there is a specific pokemon entry for it (like nidorino and nidorina)
    pokemons[10025].flags.hasGenderDifferences = false;

    // basculegion-male doesn't need to have gender differences because there is a specific pokemon entry for it (like nidorino and nidorina)
    pokemons[902].flags.hasGenderDifferences = false;

    // basculegion-female doesn't need to have gender differences because there is a specific pokemon entry for it (like nidorino and nidorina)
    pokemons[10248].flags.hasGenderDifferences = false;

    // remove toxtricity-low-key-gmax because apparently it doesn't exist
    delete pokemons[10228];
     
    return pokemons;

}

// this function adds an encounter for pokemons that don't have any encounters at a specific version if
// they can be evolved into or if they can be hatched from an egg,
// so they can still easily be flagged as "obtainable" in the front end
function addEncounterIfCanBeEvolvedOrHatched (pokemons, evolutions, versions, versionGroups) {

    const checkIfAnyArePresentInVersion = (chain, versionId) => {
      
        let present = false;

        if (pokemons[chain.specieId]?.encounters[versionId]) {
            present = true;
        } else {
            for (const c of chain.evolutions) {
                if (checkIfAnyArePresentInVersion(c, versionId)) {
                    present = true;
                    break;
                }
            }
        }

        return present;

    };

    const getWhichArePresentInVersion = (chain, versionId) => {

        const present = [];

        const isPresent = (c) => {
            for (const subChain of c.evolutions) {
                isPresent(subChain, versionId);
                if (pokemons[subChain.specieId].encounters[versionId]) {
                    present.push(subChain.specieId);
                }
            }
        }

        isPresent(chain, versionId);

        return present;

    };

    const getWhoEvolvesIntoId = (specieId, chain, versionId) => {
        for (const c of chain.evolutions) {
            if (c.specieId === specieId) {
                return chain.specieId;
            } else {
                const id = getWhoEvolvesIntoId(specieId, c, versionId);
                if (id) {
                    return id;
                }
            }
        }
    };

    const versionsIds = Object.values(versions).map(v => v.id);

    for (const pokemon of Object.values(pokemons)) {

        for (const versionId of versionsIds) {

            // if pokemon was introduced before or at this version's generation
            if (pokemon.introducedInGeneration <= versionGroups[versions[versionId].versionGroupId].generationId) {

                // if pokemon has no encounters in this version
                if (!pokemon.encounters[versionId]) {

                    // if pokemon has an envolution chain
                    if (pokemon.evolutionChainId /*&& evolutions[pokemon.evolutionChainId]*/) {

                        const chain = evolutions[pokemon.evolutionChainId];

                        // check if any of the pokemons in the chain are present in this version
                        if (checkIfAnyArePresentInVersion(chain, versionId)) {

                            // if this pokemon is the first in the chain, it means it needs to be hatched from an egg
                            if (pokemon.pokedexId === chain.specieId) {

                                // check which pokemon from the version needs to be bred
                                const presentSpecieIds = getWhichArePresentInVersion(chain, versionId);

                                pokemon.encounters[versionId] = [{
                                    locationId: null,
                                    methodId: null,
                                    conditionIds: [],
                                    maxlvl: null,
                                    minlvl: null,
                                    rarity: null,
                                    isBreed: true,
                                    pokemonsIds: presentSpecieIds
                                }];

                            } else {

                                // check which pokemon from the version evolves into this pokemon
                                const preSpecieId = getWhoEvolvesIntoId(pokemon.pokedexId, chain, versionId);

                                pokemon.encounters[versionId] = [{
                                    locationId: null,
                                    methodId: null, 
                                    conditionIds: [],
                                    maxlvl: null,
                                    minlvl: null,
                                    rarity: null,
                                    isEvolve: true,
                                    pokemonsIds: [preSpecieId]
                                }];

                            }

                        }

                    } else {

                        // if it is pointing to an inexistent chain, set to null
                        pokemon.evolutionChainId = null;

                    }

                }

            }

        }

    }

    return pokemons;

}

// genereate pokemon spritesheet (pokeapi sprites repository)
async function genereatePokemonSpritesheet (pokemons) {

    const ids = Object.values(pokemons).map(p => p.id);

    console.log("Processing sprite data...");

    const officialArtworkDirectory = "git/sprites/sprites/pokemon/other/official-artwork";
    const defaultArtworkDirectory = "git/sprites/sprites/pokemon";
    const gen8 = "git/sprites/sprites/pokemon/versions/generation-viii/icons";

    const sprites = [];

    for (const id of ids) {

        if (fs.existsSync(`${officialArtworkDirectory}/${id}.png`)) {
            sprites.push(`${officialArtworkDirectory}/${id}.png`);
        } else if (fs.existsSync(`${defaultArtworkDirectory}/${id}.png`)) {
            //console.log(`\x1b[94m🛈\x1b[0m sprite id [\x1b[33m${id}\x1b[0m] (\x1b[94m#${pokemons[id].pokedexId} ${pokemons[id].name}\x1b[0m) using default artwork!`);
            sprites.push(`${defaultArtworkDirectory}/${id}.png`);
        } else {                
            let found = false;
            switch (id) {
                case 10158: sprites.push(`${gen8}/25-starter.png`); found = true; break;
                case 10182: sprites.push(`${gen8}/845-gulping.png`); found = true; break;
                case 10183: sprites.push(`${gen8}/845-gorging.png`); found = true; break;
            }
            if (found) {                    
                //console.log(`\x1b[94m🛈\x1b[0m sprite id [\x1b[33m${id}\x1b[0m] (\x1b[94m#${pokemons[id].pokedexId} ${pokemons[id].name}\x1b[0m) using gen8 artwork!`);
            } else {
                sprites.push(`${defaultArtworkDirectory}/0.png`)
                //console.log(`\x1b[91m✗\x1b[0m sprite id [\x1b[33m${id}\x1b[0m] (\x1b[94m#${pokemons[id].pokedexId} ${pokemons[id].name}\x1b[0m) couldn't be found!`);
            }
        }

    }

    console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${Object.keys(sprites).length}\x1b[0m] sprites processed!`);
    console.log("Creating pokemon-spritesheet.png...");

    const rowandcols = Math.ceil(Math.sqrt(sprites.length));
    const widthheight = rowandcols * 64;

    const spriteMap = await Promise.all(sprites.map(async (image, index) => {
        const x = parseInt(index % rowandcols);
        const y = parseInt(index / rowandcols);
        return {
            input: await sharp(image).resize(64).toBuffer(),
            left: x * 64,
            top: y * 64,
            width: 64,
            height: 64
        };
    }));

    await sharp({
        create: {
            width: widthheight,
            height: widthheight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
    .composite(spriteMap)
    .toFile("res/pokemon-spritesheet.png");

    const spritesheetSize = fs.statSync("res/pokemon-spritesheet.png").size / (1024 * 1024);
    console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${"res/pokemon-spritesheet.png"}\x1b[0m] successfully generated! (\x1b[33m${spritesheetSize.toFixed(4)} MB\x1b[0m)`);

    console.log("Creating pokemon-spritesheet.css...");

    const spritesheetCSS = [`
        img.pokemon-sprite {
            background-image: url('pokemon-spritesheet.png');
            background-repeat: no-repeat;
            object-fit: scale-down;
            width: 64px;
            height: 64px;
            border: none;
        }
    `];

    spritesheetCSS.push(...spriteMap.map((s, i) => {
        return `img.pokemon-sprite[data-id="${ids[i]}"] { background-position: -${s.left}px -${s.top}px; }`;
    }));

    fs.writeFileSync("res/pokemon-spritesheet.css", spritesheetCSS.join("\r\n"));

    const spritesheetCSSSize = fs.statSync("res/pokemon-spritesheet.css").size / (1024 * 1024);
    console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${"res/pokemon-spritesheet.css"}\x1b[0m] successfully generated! (\x1b[33m${spritesheetCSSSize.toFixed(4)} MB\x1b[0m)`);

}

// generate footprint spritesheet (footprintapi sprites repository)
async function generateFootprintSpritesheet (pokemons) {

    const ids = Object.values(pokemons).map(p => p.id);

    console.log("Processing footprint sprite data...");

    const footprintDirectory = "git/FootprintAPI/Sprites";

    const sprites = [];

    for (const id of ids) {

        if (fs.existsSync(`${footprintDirectory}/${id}.png`)) {
            sprites.push(`${footprintDirectory}/${id}.png`);
        } else {
            sprites.push(`git/sprites/sprites/pokemon/0.png`)           
            //console.log(`\x1b[91m✗\x1b[0m footprint sprite id [\x1b[33m${id}\x1b[0m] (\x1b[94m#${pokemons[id].pokedexId} ${pokemons[id].name}\x1b[0m) couldn't be found!`);
        }

    }

    console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${Object.keys(sprites).length}\x1b[0m] footprint sprites processed!`);
    console.log("Creating footprint-spritesheet.png...");

    const rowandcols = Math.ceil(Math.sqrt(sprites.length));
    const widthheight = rowandcols * 16;

    const spriteMap = await Promise.all(sprites.map(async (image, index) => {
        const x = parseInt(index % rowandcols);
        const y = parseInt(index / rowandcols);
        return {
            input: await sharp(image).resize(16).toBuffer(),
            left: x * 16,
            top: y * 16,
            width: 16,
            height: 16
        };
    }));

    await sharp({
        create: {
            width: widthheight,
            height: widthheight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
    .composite(spriteMap)
    .toFile("res/footprint-spritesheet.png");

    const spritesheetSize = fs.statSync("res/footprint-spritesheet.png").size / (1024 * 1024);
    console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${"res/footprint-spritesheet.png"}\x1b[0m] successfully generated! (\x1b[33m${spritesheetSize.toFixed(4)} MB\x1b[0m)`);

    console.log("Creating footprint-spritesheet.css...");

    const spritesheetCSS = [`
        img.footprint-sprite {
            background-image: url('footprint-spritesheet.png');
            background-repeat: no-repeat;
            object-fit: scale-down;
            width: 16px;
            height: 16px;
            border: none;
        }
    `];

    spritesheetCSS.push(...spriteMap.map((s, i) => {
        return `img.footprint-sprite[data-id="${ids[i]}"] { background-position: -${s.left}px -${s.top}px; }`;
    }));

    fs.writeFileSync("res/footprint-spritesheet.css", spritesheetCSS.join("\r\n"));

    const spritesheetCSSSize = fs.statSync("res/footprint-spritesheet.css").size / (1024 * 1024);
    console.log(`\x1b[32m✓\x1b[0m [\x1b[33m${"res/footprint-spritesheet.css"}\x1b[0m] successfully generated! (\x1b[33m${spritesheetCSSSize.toFixed(4)} MB\x1b[0m)`);

}