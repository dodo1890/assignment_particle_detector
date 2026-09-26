
const toggle = 0;
function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function position(p, toggle) {
    // 
    if (toggle === 1) {
        return p + 5;
    }
    if (toggle === 0) {
        return p - 5;
    }
}

if (-1 < toggle) {
    if (toggle < 1) {
        console.log("yes");
    }
}


// function switchDirection(min, max, currentPosition) {
//     if (currentPosition === max) {
//         return 0;
//     }
//     if (currentPosition === min) {
//         return 1;
//     }
// }

module.exports = {
    calcOffset,
    position,
    // switchDirection
};