const r = require("raylib");
const geometry = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

const scannerRange = 20;

const scannerHeight = screenHeight;
const scannerPositionY = 0;
const goBackPosition = screenWidth - scannerRange;
const startingPosition = 0;
let scannerPosition = 0;
let direction = 1;
let scannerColour = r.WHITE;

const particleStart = 130;
const particleEnd = 180;

const particleRange = particleEnd - particleStart;
const particleHeight = screenHeight;
const particlePositionX = particleStart;
const particlePositionY = 0;

function overlapDetector(feildStart, feildEnd, scanWidth, scanLoc) {
    if (scanLoc >= (feildStart - scanWidth) && (scanLoc <= feildEnd)) {
        scannerColour = r.RED;
    } else {
        scannerColour = r.WHITE;
    }
}

function particleFeild() {
    r.DrawRectangle(particlePositionX, particlePositionY, particleRange, particleHeight, r.BLUE);
}

function scannerFeild() {
    r.DrawRectangle(scannerPosition, scannerPositionY, scannerRange, scannerHeight, scannerColour);
}

function switchDirection() {
    if (scannerPosition >= goBackPosition) {
        return direction = 0;
    }
    if (scannerPosition <= startingPosition) {
        return direction = 1;
    }
}

function scannerMovement() {
    scannerPosition = geometry.position(scannerPosition, direction);
    switchDirection();
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "HEADING");
    r.SetTargetFPS(FPS);
}

function update() {
    scannerMovement();
    overlapDetector(particleStart, particleEnd, scannerRange, scannerPosition);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    particleFeild();
    scannerFeild();
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