let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
//true => show tools
//false => hide tools

optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;
    if (optionsFlag) openTools();
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

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) {
        pencilToolCont.style.display = "block";
    }
    else {
        pencilToolCont.style.display = "none";
    }
})
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserToolCont.style.display = "block";
    }
    else {
        eraserToolCont.style.display = "none";
    }
})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.append(stickyCont);

    let remove = stickyCont.querySelector(".remove");
    let minimize = stickyCont.querySelector(".minimize");


    stickyCont.onmousedown = function (e) {
        dragAndDrop(stickyCont, e);
    }

    stickyCont.ondragstart = function () {
        return false;
    };
    notesAction(remove, minimize, stickyCont);
}

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = ` 
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea></textarea>
    </div>
    `;
    createSticky(stickyTemplateHTML);
})

function notesAction(remove, minimize, stickyCont) {
    // console.log(remove,minimize,stickyCont);
    remove.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
            stickyCont.remove();
        }
    })
    minimize.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
            let noteCont = stickyCont.querySelector(".note-cont");
            let display = getComputedStyle(noteCont).getPropertyValue("display");
            if (display === "none") noteCont.style.display = "block";
            else noteCont.style.display = "none";
        }
    })
}

function dragAndDrop(element, event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

};

upload.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", 'file');
    input.click();
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let stickyTemplateHTML = ` 
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <img src = "${url}" />
    </div>
    `;
     createSticky(stickyTemplateHTML);
    })
})