const r = require("raylib");

const g = require("./geometry");
const s = require("./screen");
const s1 = require("./scanner1");
const s2 = require("./scanner2");
const s3 = require("./scanner3");

const f1 = require("./feild1");
const f2 = require("./feild2");
const f3 = require("./feild3");

function drawParticleFeilds() {
    r.DrawRectangle(f1.start, 0, f1.range, s.height, r.BLUE);
    r.DrawRectangle(f2.start, 0, f2.range, s.height, r.BLUE);
    r.DrawRectangle(0, f3.start, s.width, f3.range, r.BLUE);
}

function drawScanners() {
    r.DrawRectangle(s1.Xposition, 0, s1.range, s.height, s1.colour);
    r.DrawRectangle(s2.Xposition, 0, s2.range, s.height, s2.colour);
    r.DrawRectangle(0, s3.Yposition, s.width, s3.range, s3.colour);
}

function deriveVelocity(start, end, range, position, velocity) {
    return g.boundryCheck(start, end, range, position) ? -velocity : velocity;
}

function moveScanner() {
    s1.Xposition += s1.velocity;
    s1.velocity = deriveVelocity(0, s1.end, s1.range, s1.Xposition, s1.velocity);
    s2.Xposition += s2.velocity;
    s2.velocity = deriveVelocity(s2.start, s.width, s2.range, s2.Xposition, s2.velocity);
    s3.Yposition += s3.velocity;
    s3.velocity = deriveVelocity(0, s.height, s3.range, s3.Yposition, s3.velocity);

}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(s.width, s.height, "PARTICLE DETECTOR");
    r.SetTargetFPS(s.FPS);
}

function changeColour(scannerPosition, scannerRange, feild1Start, feild1Range, feild2Start, feild2End) {
    return g.isDetected(feild1Start, feild1Range, scannerPosition, scannerRange) ||
        g.isDetected(feild2Start, feild2End, scannerPosition, scannerRange) ? r.RED : r.WHITE;
}

function update() {
    moveScanner();
    s1.colour = changeColour(s1.Xposition, s1.range, f1.start, f1.range, f2.start, f2.range);
    s2.colour = changeColour(s2.Xposition, s2.range, f1.start, f1.range, f2.start, f2.range);
    s3.colour = changeColour(s3.Yposition, s3.range, f3.start, f3.range, -10, 0);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    drawParticleFeilds();
    drawScanners();
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