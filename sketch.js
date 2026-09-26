const r = require("raylib");
const geometry = require("./geometry");

const screenWidth = 300;
const screenOneHeight = 200;
const FPS = 60;

const scannerOneRange = 20;

const scannerOneHeight = screenOneHeight;
const scannerOnePositionY = 0;
const scanOneGBPosition = screenWidth - scannerOneRange;
const scanOneStartPosition = 0;
const scannerOneSpeed = 2;
let scannerOnePosition = 0;
let scannerOneDirection = 1;
let scannerOneColour = r.WHITE;

const particleOneStart = 130;
const particleOneEnd = 180;

const particleOneRange = particleOneEnd - particleOneStart;
const particleOneHeight = screenOneHeight;
const particleOnePositionX = particleOneStart;
const particleOnePositionY = 0;

const particleTwoStart = 250;
const particleTwoEnd = 255;

const particleTwoRange = particleTwoEnd - particleTwoStart;
const particleTwoHeight = screenOneHeight;
const particleTwoPositionX = particleTwoStart;
const particleTwoPositionY = 0;

function overlapDetector(feild1Start, feil1End, feild2Start, feil2End, scanWidth, scanLoc) {
    if ((scanLoc >= (feild1Start - scanWidth) && (scanLoc <= feil1End)) || (scanLoc >= (feild2Start - scanWidth) && (scanLoc <= feil2End))) {
        scannerOneColour = r.RED;
    } else {
        scannerOneColour = r.WHITE;
    }
}

function particleFeild2() {
    r.DrawRectangle(particleTwoPositionX, particleTwoPositionY, particleTwoRange, particleTwoHeight, r.BLUE);
}

function particleFeild1() {
    r.DrawRectangle(particleOnePositionX, particleOnePositionY, particleOneRange, particleOneHeight, r.BLUE);
}

function scannerFeild() {
    r.DrawRectangle(scannerOnePosition, scannerOnePositionY, scannerOneRange, scannerOneHeight, scannerOneColour);
}

function switchDirection() {
    if (scannerOnePosition >= scanOneGBPosition) {
        return scannerOneDirection = 0;
    }
    if (scannerOnePosition <= scanOneStartPosition) {
        return scannerOneDirection = 1;
    }
}

function scannerMovement() {
    scannerOnePosition = geometry.position(scannerOnePosition, scannerOneDirection, scannerOneSpeed);
    switchDirection();
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(screenWidth, screenOneHeight, "PARTICLE DETECTOR");
    r.SetTargetFPS(FPS);
}

function update() {
    scannerMovement();
    overlapDetector(particleOneStart, particleOneEnd, particleTwoStart, particleTwoEnd, scannerOneRange, scannerOnePosition);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    particleFeild2();
    particleFeild1();
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