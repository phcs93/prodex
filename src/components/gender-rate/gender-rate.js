/**
 * @param {Pokemon} pokemon
 */
function renderGenderRate (pokemon) {
    return `
        <table class="gender-rate">
            <tr>
                <th>♂</th>
                <th>${pokemon.genderRate[0]}%</th>
                <td>
                    <span class="gender-rate male-rate" style="width: ${pokemon.genderRate[0]}%;" data-rate="${pokemon.genderRate[0]}"></span><span class="gender-rate female-rate" style="width: ${pokemon.genderRate[1]}%;" data-rate="${pokemon.genderRate[1]}"></span>
                </td>
                <th>${pokemon.genderRate[1]}%</th>
                <th>♀</th>
            </tr>
        </table>
    `;
}