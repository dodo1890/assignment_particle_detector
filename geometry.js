

function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function positionChanger(p, toggle, speed) {
    if (toggle === 1) {
        return p + speed;
    }
    if (toggle === 0) {
        return p - speed;
    }
}

function directionSwither(minValue, maxValue, position, currentD) {
    let switcher = currentD;

    if (position >= maxValue && currentD === 1) {
        switcher = 0;
        return switcher;
    } else if (position <= minValue && currentD === 0) {
        switcher = 1;
        return switcher;
    } else {
        return switcher;
    }
}

function twoOverlapDetector(Feild1Start, Feild1Range, Feild2Start, Feild2Range, ScanLoc, ScanRange) {
    if ((ScanLoc >= (Feild1Start - ScanRange) && (ScanLoc <= (Feild1Start + Feild1Range))) || (ScanLoc >= (Feild2Start - ScanRange) && (ScanLoc <= (Feild2Start + Feild2Range)))) {
        return r.RED;
    } else {
        return r.WHITE;
    }
}

function isNegative(value) {
    return value > 0 ? value : 0;
}

module.exports = {
    calcOffset,
    positionChanger,
    isNegative,
    directionSwither,
    twoOverlapDetector,
};