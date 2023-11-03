function renderType(typeId, stab) {
    return `
        <div class="type ${stab ? "glow" : ""}" data-type-id="${typeId}"></div>
    `;
}