const r = require("raylib");
const geometry = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

const scannerOneRange = 20;
const scannerOneSpeed = 1;

const scannerOneHeight = screenHeight;
const scannerOnePositionY = 0;
const scanOneGBPosition = (screenWidth / 2) - scannerOneRange;
const scanOneStartPosition = 0;
let scannerOnePosition = 0;
let scannerOneDirection = 1;
let scannerOneColour = r.WHITE;

const scannerTwoRange = 20;
const scannerTwoSpeed = 3;

const scannerTwoHeight = screenHeight;
const scannerTwoPositionY = 0;
const scanTwoGBPosition = screenWidth - scannerTwoRange;
const scanTwoStartPosition = (screenWidth / 2);
let scannerTwoPosition = screenWidth / 2;
let scannerTwoDirection = 1;
let scannerTwoColour = r.WHITE;

const particleOneStart = 80;
const particleOneEnd = 100;

const particleOneRange = particleOneEnd - particleOneStart;
const particleOneHeight = screenHeight;
const particleOnePositionX = particleOneStart;
const particleOnePositionY = 0;

const particleTwoStart = 250;
const particleTwoEnd = 255;

const particleTwoRange = particleTwoEnd - particleTwoStart;
const particleTwoHeight = screenHeight;
const particleTwoPositionX = particleTwoStart;
const particleTwoPositionY = 0;

function overlapDetector(feild1Start, feil1End, feild2Start, feil2End, scan1Width, scan1Loc, scan2Width, scan2Loc) {
    if ((scan1Loc >= (feild1Start - scan1Width) && (scan1Loc <= feil1End)) || (scan1Loc >= (feild2Start - scan1Width) && (scan1Loc <= feil2End))) {
        scannerOneColour = r.RED;
    } else {
        scannerOneColour = r.WHITE;
    }
    if ((scan2Loc >= (feild1Start - scan2Width) && (scan2Loc <= feil1End)) || (scan2Loc >= (feild2Start - scan2Width) && (scan2Loc <= feil2End))) {
        scannerTwoColour = r.RED;
    } else {
        scannerTwoColour = r.WHITE;
    }
}

function particleFeilds() {
    r.DrawRectangle(particleTwoPositionX, particleTwoPositionY, particleTwoRange, particleTwoHeight, r.BLUE);
    r.DrawRectangle(particleOnePositionX, particleOnePositionY, particleOneRange, particleOneHeight, r.BLUE);
}

function scannerFeilds() {
    r.DrawRectangle(scannerOnePosition, scannerOnePositionY, scannerOneRange, scannerOneHeight, scannerOneColour);
    r.DrawRectangle(scannerTwoPosition, scannerTwoPositionY, scannerTwoRange, scannerTwoHeight, scannerTwoColour);
}

function scannerOneDirectionSwither() {
    if (scannerOnePosition >= scanOneGBPosition) {
        return scannerOneDirection = 0;
    }
    if (scannerOnePosition <= scanOneStartPosition) {
        return scannerOneDirection = 1;
    }
}

function scannerTwoDirectionSwither() {
    if (scannerTwoPosition >= scanTwoGBPosition) {
        return scannerTwoDirection = 0;
    }
    if (scannerTwoPosition <= scanTwoStartPosition) {
        return scannerTwoDirection = 1;
    }
}

function scannerMovements() {
    scannerOnePosition = geometry.position(scannerOnePosition, scannerOneDirection, scannerOneSpeed);
    scannerTwoPosition = geometry.position(scannerTwoPosition, scannerTwoDirection, scannerTwoSpeed);
    scannerOneDirectionSwither();
    scannerTwoDirectionSwither();
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
    overlapDetector(particleOneStart, particleOneEnd, particleTwoStart, particleTwoEnd, scannerOneRange, scannerOnePosition, scannerTwoRange, scannerTwoPosition);
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