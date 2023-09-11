/**
 * @param {Pokemon} pokemon
 */
function renderPokemonStats (pokemon) {

    const hudColor = (v) => {
        if (v < 30) return "#F34444";
        if (v < 60) return "#FF7F0F";
        if (v < 90) return "#FFDD57";
        if (v < 120) return "#A0E515";
        if (v < 150) return "#23CD5E";
        return "#00C2B8";
    };

    return `
        <table class="pokemon-stats">
            <tr>
                <td style="width: 52px;">HP</td>
                <td style="width: 25px;">${pokemon.stats.hp.base}</td>
                <td>
                    <span class="hud" style="background-color: ${hudColor(pokemon.stats.hp.base)}; width: ${(pokemon.stats.hp.base/255)*100}%;"></span>
                </td>
                <td style="width: 25px;">${pokemon.stats.hp.min}</td>
                <td style="width: 25px;">${pokemon.stats.hp.max}</td>
                <td style="width: 15px;">${pokemon.stats.hp.ev !== 0 ? pokemon.stats.hp.ev : ""}</td>
            </tr>                       
            <tr>
                <td style="width: 52px;">Attack</td>
                <td style="width: 25px;">${pokemon.stats.atk.base}</td>
                <td>
                    <span class="hud" style="background-color: ${hudColor(pokemon.stats.atk.base)}; width: ${(pokemon.stats.atk.base/255)*100}%;"></span>
                </td>
                <td style="width: 25px;">${pokemon.stats.atk.min}</td>
                <td style="width: 25px;">${pokemon.stats.atk.max}</td>
                <td style="width: 15px;">${pokemon.stats.atk.ev !== 0 ? pokemon.stats.atk.ev : ""}</td>
            </tr>
            <tr>
                <td style="width: 52px;">Defense</td>
                <td style="width: 25px;">${pokemon.stats.def.base}</td>
                <td>
                    <span class="hud" style="background-color: ${hudColor(pokemon.stats.def.base)}; width: ${(pokemon.stats.def.base/255)*100}%;"></span>
                </td>
                <td style="width: 25px;">${pokemon.stats.def.min}</td>
                <td style="width: 25px;">${pokemon.stats.def.max}</td>
                <td style="width: 15px;">${pokemon.stats.def.ev !== 0 ? pokemon.stats.def.ev : ""}</td>
            </tr>
            <tr>
                <td style="width: 52px;">Sp.Atk</td>
                <td style="width: 25px;">${pokemon.stats.spatk.base}</td>
                <td>
                    <span class="hud" style="background-color: ${hudColor(pokemon.stats.spatk.base)}; width: ${(pokemon.stats.spatk.base/255)*100}%;"></span>
                </td>
                <td style="width: 25px;">${pokemon.stats.spatk.min}</td>
                <td style="width: 25px;">${pokemon.stats.spatk.max}</td>
                <td style="width: 15px;">${pokemon.stats.spatk.ev !== 0 ? pokemon.stats.spatk.ev : ""}</td>
            </tr>
            <tr>
                <td style="width: 52px;">Sp.Def</td>
                <td style="width: 25px;">${pokemon.stats.spdef.base}</td>
                <td>
                    <span class="hud" style="background-color: ${hudColor(pokemon.stats.spdef.base)}; width: ${(pokemon.stats.spdef.base/255)*100}%;"></span>
                </td>
                <td style="width: 25px;">${pokemon.stats.spdef.min}</td>
                <td style="width: 25px;">${pokemon.stats.spdef.max}</td>
                <td style="width: 15px;">${pokemon.stats.spdef.ev !== 0 ? pokemon.stats.spdef.ev : ""}</td>
            </tr>
            <tr>
                <td style="width: 52px;">Speed</td>
                <td style="width: 25px;">${pokemon.stats.speed.base}</td>
                <td>
                    <span class="hud" style="background-color: ${hudColor(pokemon.stats.speed.base)}; width: ${(pokemon.stats.speed.base/255)*100}%;"></span>
                </td>
                <td style="width: 25px;">${pokemon.stats.speed.min}</td>
                <td style="width: 25px;">${pokemon.stats.speed.max}</td>
                <td style="width: 15px;">${pokemon.stats.speed.ev !== 0 ? pokemon.stats.speed.ev : ""}</td>
            </tr>
            <tr>
                <td style="width: 52px;">Total</td>
                <td style="width: 25px;">${pokemon.stats.total}</td>
                <td></td>
                <td style="width: 25px;">min</td>
                <td style="width: 25px;">max</td>
                <td style="width: 15px;">ev</td>
            </tr>                        
        </table>
    `;
}