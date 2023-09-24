let canvas = document.querySelector("canvas");
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");

let undoRedoTracker = [];
let track = 0;

let penColor = "red";
let eraserColor = "white";
let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousedown = false;

//API
let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = pencilWidth;
// tool.beginPath();      //new graphic/path/line
// tool.moveTo(100,150);   //start point
// tool.lineTo(100,550); //end point
// tool.stroke();

canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    // tool.beginPath();
    // tool.moveTo(e.clientX, e.clientY);

    // beginPath({
    //     x:e.clientX,
    //     y:e.clientY
    // })

    let data = {
        x:e.clientX,
        y:e.clientY
    }
    //Send data to server
    socket.emit("beginPath",data);
})
canvas.addEventListener("mousemove", (e) => {
    if (!mousedown) return;
    // tool.lineTo(e.clientX, e.clientY);
    // tool.stroke();

    // drawStroke({
    //     x:e.clientX,
    //     y:e.clientY,
    //     color:eraserFlag ? eraserColor : penColor,
    //     width: eraserFlag ? eraserWidth : pencilWidth
    // })

    let data = {
        x:e.clientX,
        y:e.clientY,
        color:eraserFlag ? eraserColor : penColor,
        width: eraserFlag ? eraserWidth : pencilWidth
    }
    socket.emit("drawStroke",data);
})
canvas.addEventListener('mouseup', (e) => {
    mousedown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
})

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}

pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElem.addEventListener("change", (e) => {
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
})
eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else {
        tool.strokeStyle = penColor;
        tool.lineWidth = pencilWidth;
    }
})

download.addEventListener("click", (e) => {
    let a = document.createElement("a");
    let url = canvas.toDataURL();
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    let data= {
        trackValue: track,
        undoRedoTracker
    }
    // undoRedoCanvas(trackObj);
    socket.emit("undoRedoCanvas",data);
})
redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker.length-1) track++;
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    // undoRedoCanvas(trackObj);
    socket.emit("undoRedoCanvas",data);
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img,0,0,canvas.width,canvas.height)
    }
}

socket.on("beginPath",(data) => {
    // data -> data from server
    beginPath(data);
})

socket.on("drawStroke",(data) => {
    drawStroke(data);
})

socket.on("undoRedoCanvas",(data)=>{
    undoRedoCanvas(data);
})