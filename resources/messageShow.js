"use strict";

function msgShow(txt,w = 0.5, h = 0.5) {
    console.log(`${w} ${h} ${txt}`);
    let div =$(`<div>${txt}</div>`);

}

export { msgShow };
