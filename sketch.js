const r = require("raylib");

const scanner = require("./scanner");
const f = require("./fields");
const s = require("./screen");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const world = {};

    world.d1 = scanner.s1;
    world.d2 = scanner.s2;
    world.d3 = scanner.s3;

    world.p1 = f.f1;
    world.p2 = f.f2;
    world.p3 = f.f3;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(s.width, s.height, "PARTICLE DETECTOR");
    r.SetTargetFPS(s.FPS);

    return world;
}

function update(world) {
    scanner.updateScanner(world.d1, world.p1, world.p2);
    scanner.updateScanner(world.d2, world.p1, world.p2);
    scanner.updateScanner(world.d3, world.p3, 0);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    f.drawParticleFeild(world.p1);
    f.drawParticleFeild(world.p2);
    f.drawParticleFeild(world.p3);

    scanner.drawScanner(world.d1);
    scanner.drawScanner(world.d2);
    scanner.drawScanner(world.d3);

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