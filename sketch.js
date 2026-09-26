const r = require("raylib");
const geometry = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

const scannerRange = 20;
const scannerHeight = screenHeight;
const scannerPositionY = 0;
let scannerPosition = 0;
let direction = 1;

const particleStart = 100;
const particleEnd = 150;

const particleRange = particleEnd - particleStart;
const particleHeight = screenHeight;
const particlePositionX = particleStart;
const particlePositionY = 0;


const goBackPosition = screenWidth - scannerRange;
const startingPosition = 0;

function particle() {
    r.DrawRectangle(particlePositionX, particlePositionY, particleRange, particleHeight, r.BLUE);
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
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    particle();
    r.DrawRectangle(scannerPosition, scannerPositionY, scannerRange, scannerHeight, r.WHITE);
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