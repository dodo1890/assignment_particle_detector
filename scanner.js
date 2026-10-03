// const s2 = require("./scanner2");
const s = require("./screen");
const r = require("raylib");
const field = require("./fields");

const s1 = createScanner(20, s.height, 0, s.width / 2, 1, 0, 0, 0);
const s2 = createScanner(20, s.height, (s.width / 2), s.width, 3, (s.width / 2), 0, 0);
const s3 = createScanner(s.width, 20, 0, s.height, 2, 0, 0, 0);

function isDetected(feildStart, feildWidth, scanLoc, scanWidth) {
    let scanEnd = scanLoc + scanWidth;
    let fieldEnd = feildStart + feildWidth;
    return (scanEnd > feildStart && (scanLoc < fieldEnd)) ? true : false;
}

function boundryCheck(begin, end, width, position) {
    const start = begin;
    const goBack = end - width;
    return position < start || position > goBack;
}

function deriveVelocity(start, end, range, position, velocity) {
    return boundryCheck(start, end, range, position) ? -velocity : velocity;
}

function chooseColour(scannerPosition, scannerWidth, feild1Start, feild1Width, feild2Start, feild2End) {
    return isDetected(feild1Start, feild1Width, scannerPosition, scannerWidth) ||
        isDetected(feild2Start, feild2End, scannerPosition, scannerWidth) ? r.RED : r.WHITE;
}

function chooseHorizontalScannerColor(scannerPosition, scannerWidth, feildStart, feildEnd) {
    return chooseColour(scannerPosition, scannerWidth, feildStart, feildEnd, -10, 0);
}

function drawScanners() {
    r.DrawRectangle(s1.x, s1.y, s1.width, s1.height, s1.colour);
    r.DrawRectangle(s2.x, s2.y, s2.width, s2.height, s2.colour);
    r.DrawRectangle(s3.x, s3.y, s3.width, s3.height, s3.colour);
}

function moveScanner() {
    s1.velocity = deriveVelocity(s1.start, s1.end, s1.width, s1.x, s1.velocity);
    s1.x += s1.velocity;
    s2.velocity = deriveVelocity(s2.start, s2.end, s2.width, s2.x, s2.velocity);
    s2.x += s2.velocity;
    s3.velocity = deriveVelocity(s3.start, s3.end, s3.height, s3.y, s3.velocity);
    s3.y += s3.velocity;
}

function changeColor() {
    s1.colour = chooseColour(s1.x, s1.width, field.f1.x, field.f1.width, field.f2.x, field.f2.width);
    s2.colour = chooseColour(s2.x, s2.width, field.f1.x, field.f1.width, field.f2.x, field.f2.width);
    s3.colour = chooseHorizontalScannerColor(s3.y, s3.height, field.f3.y, field.f3.height);
}

function createScanner(width, height, start, end, velocity, x, y, colour) {
    return {
        width: width,
        height: height,
        start: start,
        end: end,
        velocity: velocity,
        x: x,
        y: y,
        colour: colour,
    }
}

function createColor(r, g, b, a) {
    return {
        r: r,
        g: g,
        b: b,
        a: a,
    };
}

module.exports = {
    drawScanners,
    moveScanner,
    changeColor,
}
