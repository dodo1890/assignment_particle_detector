const r = require("raylib");
const s = require("./screen");

const blue = {
    r: 0,
    g: 121,
    b: 241,
    a: 255,
};


function createFields(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    }
}

const f1 = createFields(50, 0, 20, s.height);
const f2 = createFields(200, 0, 30, s.height);
const f3 = createFields(0, 100, s.width, 50);

function drawParticleFeilds() {
    r.DrawRectangle(f1.x, f1.y, f1.width, f1.height, r.BLUE);
    r.DrawRectangle(f2.x, f2.y, f2.width, f2.height, blue);
    r.DrawRectangle(f3.x, f3.y, f3.width, f3.height, blue);
}

module.exports = {
    createFields,
    drawParticleFeilds,
    f1,
    f2,
    f3,
}