function isDetected(feildStart, feildRange, scanLoc, scanRange) {
    let scanEnd = scanLoc + scanRange;
    let fieldEnd = feildStart + feildRange;
    return (scanEnd >= feildStart && (scanLoc <= fieldEnd)) ? true : false;
}

function boundryCheck(begin, end, range, position) {
    const start = begin;
    const goBack = end - range;
    return position < start || position > goBack;
}

module.exports = {
    boundryCheck,
    isDetected,
};