//七巧板


// var tangram = [
//     { p: [{ x: 0, y: 0 }, { x: 500, y: 0 }, { x: 250, y: 250 }], color: "#33CCFF" },
//     { p: [{ x: 0, y: 0 }, { x: 0, y: 500 }, { x: 250, y: 250 }], color: "#66CC66" },
//     { p: [{ x: 500, y: 500 }, { x: 250, y: 500 }, { x: 500, y: 250 }], color: "#FFCC66" },
//     { p: [{ x: 500, y: 0 }, { x: 500, y: 250 }, { x: 375, y: 375 }, { x: 375, y: 125 }], color: "#CC0033" },
//     { p: [{ x: 250, y: 250 }, { x: 375, y: 125 }, { x: 375, y: 375 }], color: "#FFFF66" },
//     { p: [{ x: 250, y: 250 }, { x: 250, y: 500 }, { x: 375, y: 375 }], color: "#9999FF" },
//     { p: [{ x: 250, y: 250 }, { x: 250, y: 500 }, { x: 0, y: 500 }], color: "#FF44A4" },
// ]

// var canvas = document.getElementById("canvas");
// var context = canvas.getContext("2d");

// for (var i = 0; i < tangram.length; i++)
//     draw(tangram[i], context);



// function draw(piece, cxt) {
//     cxt.beginPath();
//     cxt.moveTo(piece.p[0].x, piece.p[0].y);
//     for (var i = 1; i < piece.p.length; i++)
//         cxt.lineTo(piece.p[i].x, piece.p[i].y);
//     cxt.closePath();

//     cxt.fillStyle = piece.color;
//     cxt.fill();

//     cxt.strokeStyle = "black";
//     cxt.lineWidth = 1;
//     cxt.stroke();
// }



var canvas = document.getElementById("canvas");
canvas.width = 1024;
canvas.height = 800;
var context = canvas.getContext("2d");

context.lineWidth = 5;
context.strokeStyle = "#005588";



context.arc(100,50,30,0,2*Math.PI);
context.stroke();
