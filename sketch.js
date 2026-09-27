const r = require("raylib");
const geometry = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

const vScannerRange = 20;
const vScannerSpeed = 2;

let vScannerYPosition = 0;
let vScannerDirection = 1;
let vScannerColour = r.WHITE;

const hScannerOneRange = 20;
const hScannerOneSpeed = 1;

let hScannerOneXPosition = 0;
let hScannerOneDirection = 1;
let hScannerOneColour = r.WHITE;

const hScannerTwoRange = 20;
const hScannerTwoSpeed = 3;

let hScannerTwoXPosition = screenWidth / 2;
let hScannerTwoDirection = 1;
let hScannerTwoColour = r.WHITE;

const hParticleOneStart = 140;
const hParticleOneRange = 20;

const hParticleTwoStart = 250;
const hParticleTwoRange = 5;

const vParticleOneStart = 80;
const vParticleOneRange = 50;

function twoOverlapDetector(Feild1Start, Feild1Range, Feild2Start, Feild2Range, ScanLoc, ScanRange) {
    if ((ScanLoc >= (Feild1Start - ScanRange) && (ScanLoc <= (Feild1Start + Feild1Range))) || (ScanLoc >= (Feild2Start - ScanRange) && (ScanLoc <= (Feild2Start + Feild2Range)))) {
        return r.RED;
    } else {
        return r.WHITE;
    }
}

function oneOverlapDetector(FeildStart, FeildRange, ScanLoc, ScanRange) {
    if (ScanLoc >= (FeildStart - ScanRange) && (ScanLoc <= (FeildStart + FeildRange))) {
        return r.RED;
    } else {
        return r.WHITE;
    }
}

function particleFeilds() {
    const hParticleOnePositionX = hParticleOneStart;
    const hParticleOnePositionY = 0;
    const hParticleOneHeight = screenHeight;

    const hParticleTwoPositionX = hParticleTwoStart;
    const hParticleTwoPositionY = 0;
    const hParticleTwoHeight = screenHeight;

    const vParticleOnePositionX = 0;
    const vParticleOnePositionY = vParticleOneStart;
    const vParticleOneWidth = screenWidth;

    r.DrawRectangle(hParticleOnePositionX, hParticleOnePositionY, hParticleOneRange, hParticleOneHeight, r.BLUE);
    r.DrawRectangle(hParticleTwoPositionX, hParticleTwoPositionY, hParticleTwoRange, hParticleTwoHeight, r.BLUE);
    r.DrawRectangle(vParticleOnePositionX, vParticleOnePositionY, vParticleOneWidth, vParticleOneRange, r.BLUE);
}

function scannerFeilds() {
    const hScannerOneYPosition = 0;
    const hScannerOneHeight = screenHeight;

    const hScannerTwoYPosition = 0;
    const hScannerTwoHeight = screenHeight;

    const vScannerXPosition = 0;
    const vScannerWidth = screenWidth;

    r.DrawRectangle(hScannerOneXPosition, hScannerOneYPosition, hScannerOneRange, hScannerOneHeight, hScannerOneColour);
    r.DrawRectangle(hScannerTwoXPosition, hScannerTwoYPosition, hScannerTwoRange, hScannerTwoHeight, hScannerTwoColour);
    r.DrawRectangle(vScannerXPosition, vScannerYPosition, vScannerWidth, vScannerRange, vScannerColour);
}

function scannerMovements() {
    const hScanOneGBPosition = (screenWidth / 2) - hScannerOneRange;
    const hScanOneStartPosition = 0;

    const hScanTwoStartPosition = (screenWidth / 2);
    const hScanTwoGBPosition = screenWidth - hScannerTwoRange;

    const vScanStartPosition = 0;
    const vScanGBPosition = screenHeight - vScannerRange;

    hScannerOneDirection = geometry.directionSwither(hScanOneStartPosition, hScanOneGBPosition, hScannerOneXPosition, hScannerOneDirection);
    hScannerTwoDirection = geometry.directionSwither(hScanTwoStartPosition, hScanTwoGBPosition, hScannerTwoXPosition, hScannerTwoDirection);
    vScannerDirection = geometry.directionSwither(vScanStartPosition, vScanGBPosition, vScannerYPosition, vScannerDirection);

    hScannerOneXPosition = geometry.positionChanger(hScannerOneXPosition, hScannerOneDirection, hScannerOneSpeed);
    hScannerTwoXPosition = geometry.positionChanger(hScannerTwoXPosition, hScannerTwoDirection, hScannerTwoSpeed);
    vScannerYPosition = geometry.positionChanger(vScannerYPosition, vScannerDirection, vScannerSpeed);
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "PARTICLE DETECTOR");
    r.SetTargetFPS(FPS);
}

function update() {
    scannerMovements();
    hScannerTwoColour = twoOverlapDetector(hParticleOneStart, hParticleOneRange, hParticleTwoStart, hParticleTwoRange, hScannerTwoXPosition, hScannerTwoRange);
    hScannerOneColour = twoOverlapDetector(hParticleOneStart, hParticleOneRange, hParticleTwoStart, hParticleTwoRange, hScannerOneXPosition, hScannerOneRange);
    vScannerColour = oneOverlapDetector(vParticleOneStart, vParticleOneRange, vScannerYPosition, vScannerRange);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    particleFeilds();
    scannerFeilds();
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