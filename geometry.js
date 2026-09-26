
const toggle = 0;
function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function position(p, toggle, speed) {
    // 
    if (toggle === 1) {
        return p + speed;
    }
    if (toggle === 0) {
        return p - speed;
    }
}

function isNegative(value) {
    return value > 0 ? value : 0;
}

module.exports = {
    calcOffset,
    position,
    isNegative,
};