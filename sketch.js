const r = require("raylib");
const geometry = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

const scannerPositionY = 0;
const scannerLength = screenHeight;
const scannerRange = 20;

const maxPosition = screenWidth - scannerRange;
const startingPosition = 0;
let scannerPosition = 0;
let direction = 1;



function switchDirection() {
    if (scannerPosition >= maxPosition) {
        return direction = 0;
    }
    if (scannerPosition <= startingPosition) {
        return direction = 1;
    }
}

function scannerMovement() {
    scannerPosition = geometry.position(scannerPosition, direction);
    // direction = switchDirection(0, 280, scannerPosition);
    switchDirection();
    // console.log(direction);
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
    r.DrawRectangle(scannerPosition, scannerPositionY, scannerRange, scannerLength, r.WHITE);

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