let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
//true => show tools
//false => hide tools

optionsCont.addEventListener("click",(e) => {
    optionsFlag = !optionsFlag;
    if(optionsFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconElement = optionsCont.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}

function closeTools() {
    let iconElement = optionsCont.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolsCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

pencil.addEventListener("click",(e) => {
    pencilFlag = !pencilFlag;
    if(pencilFlag) {
        pencilToolCont.style.display = "block";
    }
    else{
        pencilToolCont.style.display = "none";
    }
})
eraser.addEventListener("click",(e) => {
    eraserFlag = !eraserFlag;
    if(eraserFlag) {
        eraserToolCont.style.display = "block";
    }
    else{
        eraserToolCont.style.display = "none";
    }
})