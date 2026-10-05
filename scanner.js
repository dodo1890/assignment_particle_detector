const s = require("./screen");
const r = require("raylib");
const f = require("./fields");
const d = require("./detector");

function createScanner(width, height, start, goBack, velocity, x, y, colour, movement) {
    return {
        width: width,
        height: height,
        start: start,
        goBack: goBack,
        velocity: velocity,
        x: x,
        y: y,
        colour: colour,
        movement: movement,
    }
}

const s1 = createScanner(20, s.height, 0, s.width / 2, 1, 0, 0, 0, "horizontal");
const s2 = createScanner(20, s.height, (s.width / 2), s.width, 2, (s.width / 2), 0, 0, "horizontal");
const s3 = createScanner(s.width, 20, 0, s.height, 2, 0, 0, 0, "vertical");

function recPositionAndSize(rect) {
    return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
    };
}

function boundryCheck(begin, end, width, position) {
    const start = begin;
    const goBack = end - width;
    return position < start || position > goBack;
}

function deriveVelocity(start, goBack, range, position, velocity) {
    return boundryCheck(start, goBack, range, position) ? -velocity : velocity;
}

function drawScanner(scanner) {
    r.DrawRectangleRec(recPositionAndSize(scanner), scanner.colour);
}

function deriveScannerPosition(scanner) {
    if (scanner.movement === "horizontal") {
        scanner.velocity = deriveVelocity(scanner.start, scanner.goBack, scanner.width, scanner.x, scanner.velocity);
        scanner.x += scanner.velocity;
    }
    if (scanner.movement === "vertical") {
        scanner.velocity = deriveVelocity(scanner.start, scanner.goBack, scanner.height, scanner.y, scanner.velocity);
        scanner.y += scanner.velocity;
    }
}

function updateScanner(scanner, field1, field2) {
    deriveScannerPosition(scanner);
    scanner.colour = chooseColour(scanner, field1, field2);
}

function chooseColour(scanner, field1, field2) {
    return d.isDetected(field1, scanner) || d.isDetected(field2, scanner) ? r.RED : r.WHITE;
}

module.exports = {
    drawScanner,
    updateScanner,
    s1, s2, s3,
}