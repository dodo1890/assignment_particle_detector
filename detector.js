function addStartAndEnd(field) {
    if (field.stand === "horizontal") {
        field.start = field.x;
        field.end = field.x + field.width;
    }
    if (field.stand === "vertical") {
        field.start = field.y;
        field.end = field.y + field.height;
    }
}

function addPositionAndEnd(scanner) {
    if (scanner.movement === "horizontal") {
        scanner.position = scanner.x;
        scanner.end = scanner.x + scanner.width;
    }
    if (scanner.movement === "vertical") {
        scanner.position = scanner.y;
        scanner.end = scanner.y + scanner.height;
    }
}

function isDetected(field, scanner) {
    addStartAndEnd(field);
    addPositionAndEnd(scanner);
    return scanner.end > field.start && (scanner.position < field.end);
}



module.exports = {
    isDetected,
}