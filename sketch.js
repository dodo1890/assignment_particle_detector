const r = require("raylib");
const f = require("./fields");

const g = require("./scanner");
const s = require("./screen");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(s.width, s.height, "PARTICLE DETECTOR");
    r.SetTargetFPS(s.FPS);
}

function update() {
    g.moveScanner();
    g.changeColor();
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    f.drawParticleFeilds();
    g.drawScanners();
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};