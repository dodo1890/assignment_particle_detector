const r = require("raylib");
const s = require("./screen");

function createFields(x, y, width, height, stand) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        stand: stand,
    }
}

const f1 = createFields(50, 0, 40, s.height, "horizontal");
const f2 = createFields(500, 0, 30, s.height, "horizontal");
const f3 = createFields(0, 100, s.width, 70, "vertical");

function drawParticleFeild(field) {
    r.DrawRectangleRec(field, r.BLUE);
}

module.exports = {
    drawParticleFeild,
    f1, f2, f3,
}
