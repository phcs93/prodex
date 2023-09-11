/**
 * @param {Pokemon} pokemon
 */
function renderPokemonGenderRate (pokemon) {
    return `
        <table class="pokemon-gender-rate">
            <tr>
                <th>♂</th>
                <th>${pokemon.genderRate[0]}%</th>
                <td>
                    <span class="pokemon-gender-rate male-rate" style="width: ${pokemon.genderRate[0]}%;" data-rate="${pokemon.genderRate[0]}"></span><span class="pokemon-gender-rate female-rate" style="width: ${pokemon.genderRate[1]}%;" data-rate="${pokemon.genderRate[1]}"></span>
                </td>
                <th>${pokemon.genderRate[1]}%</th>
                <th>♀</th>
            </tr>
        </table>
    `;
}