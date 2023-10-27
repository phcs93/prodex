/**
 * @param {Pokemon} pokemon
 * @param {PokemonSettings} pokemonSettings
 * @param {boolean} isGif
 */
function renderPokemonHeader(pokemon, pokemonSettings, isGif) {

    let img = null;

    if (isGif) {
        const female = pokemon.flags.hasGenderDifferences && pokemonSettings?.gender === "F" ? "-f" : "";
        const shiny = pokemonSettings?.shiny ? "_s" : "";
        img = `<img src="https://raw.githubusercontent.com/phcs93/prodex/master/res/gifs/${pokemon.id}${female}${shiny}.gif" alt="${pokemon.name}" onclick="playCry(this, ${pokemon.id})">`;
    } else {
        img = `<img class="pokemon-sprite" data-id="${pokemon.id}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${pokemon.name}">`;
    }

    return `

        <div class="pokemon-header flex-columns">

            ${img}

            <div class="pokemon-id-name-types flex-rows space-between">
                <small>#${("0000" + pokemon.pokedexId).slice(-4)}</small>
                <strong>${pokemon.name}</strong>
                <div class="types flex-columns" style="margin-top: auto;">
                    ${pokemon.types.map(typeId => renderType(typeId)).join("")}
                </div>
            </div>

        </div>
        
    `;

}

function playCry (imgElement, pokemonId) {
    animateCSS(imgElement, "tada");
    const audio = new Audio(`res/cries/${pokemonId}.ogg`);
    audio.volume = 0.25;
    audio.play();    
}

const animateCSS = (node, animation, prefix = 'animate__') => new Promise((resolve, reject) => {

    const animationName = `${prefix}${animation}`;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });

});