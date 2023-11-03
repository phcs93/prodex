function renderDamageClass (damageClassId, hadc) {
    return `
        <div class="damage-class ${hadc ? "glow" : ""}" data-damage-id="${damageClassId}"></div>
    `;
}