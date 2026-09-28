const r = require("raylib");
const g = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

let scannerPosition = 0;
const scannerRange = 20;
let scannerSpeed = 1;
let colour = r.WHITE;

const startParticle = 100;
const rangeParticle = 20;



function uTurn(speed, begin, end, range, position) {
    if (boundryCheck(begin, end, range, position)) {
        return -speed;
    } else {
        return speed;
    }
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "PARTICLE DETECTOR");
    r.SetTargetFPS(FPS);
}

function boundryCheck(begin, end, range, position) {
    const start = begin;
    const goBack = end - range;
    return position < start || position > goBack;
}

function pointCheck2() {
    let scanend = scannerPosition + scannerRange
    return scanend >= startParticle && scanend <= (startParticle + rangeParticle);
}


function pointCheck(scanPoint, scanRange, particlePoint, particleRange) {
    let scanEnd = scanPoint + scanRange;
    let particleEnd = particlePoint + particleRange;
    return scanEnd >= particlePoint && scanEnd <= particleEnd;
}

// scanPoint,scanRange,particlePoint,particleRange
function pointCheck1() {
    let particleEnd = (startParticle + rangeParticle);
    return scannerPosition >= startParticle && scannerPosition <= particleEnd;
}
// (scannerPosition + scannerRange) > startParticle && scannerPosition < (startParticle + rangeParticle)
function detection() {
    return (pointCheck1() || pointCheck2()) ? r.RED : r.WHITE;
}



function update() {



    colour = detection();
    scannerSpeed = uTurn(scannerSpeed, 0, screenWidth, scannerRange, scannerPosition);
    scannerPosition = scannerPosition + scannerSpeed;



}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(startParticle, 0, rangeParticle, screenHeight, r.BLUE);
    r.DrawRectangle(scannerPosition, 0, scannerRange, screenHeight, colour);
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