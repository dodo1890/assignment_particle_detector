
const toggle = 0;
function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function position(p, toggle) {
    // 
    if (toggle === 1) {
        return p + 1;
    }
    if (toggle === 0) {
        return p - 1;
    }
}

module.exports = {
    calcOffset,
    position,
};