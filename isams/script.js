pageTitle = document.getElementsByTagName("title")[0].innerHTML
if (pageTitle.includes("Step 4") || pageTitle == "Set List") {
    // Normal iSAMS page puts everything in an iframe - redirect to it to make finding images work
    let ifr = document.getElementsByTagName("iframe");
    if (ifr.length !== 0) {
        window.location.href = ifr[0].src;
    };

    // Prevent all links from working when dragging
    let anchors = document.getElementsByTagName("a");
    for(let i = 0; i < anchors.length; i++) {
        anchors[i].href = "javascript:;";
        anchors[i].target = "_self";
    };

    let allImages = document.getElementsByTagName("td");
    let draggableImages = [];
    for (let i = 0; i < allImages.length; i++) {
        if(allImages[i].children.length == 4) {
            draggableImages.push(i);
        };
    };

    newDivs = [];
    // First item is not useful for us
    for (let i = 1; i < draggableImages.length; i++) {
        parent = allImages[draggableImages[i]];
        let newDiv = document.createElement("div");
        newDiv.style.position = "absolute";
        newDiv.style.top = Math.floor((i-1)/6)*130+60 + "px";
        newDiv.style.left = ((i-1)%6)*110+10 + "px";
        parent.removeChild(parent.lastChild);
        newDiv.appendChild(parent.firstChild);
        // newDiv.appendChild(document.createElement("br"));
        nameElement = document.createElement("div");
        text = parent.innerText;
        if (text.includes("(")) {
            startPos = text.indexOf("(")+1;
            endPos = text.indexOf(")");
            text = text.slice(startPos,endPos);
        }
        nameElement.innerText = text.match(/(?<=^[\s"']*)(\w+)/)[0];
        nameElement.style.textAlign = "center";
        newDiv.appendChild(nameElement);
        newDivs.push(newDiv);
    };

    body = document.getElementsByTagName("body")[0];
    body.innerHTML="<h2>Front</h2>";
    body.style.display = "flex";
    body.style.justifyContent = "center";

    for (let i = 0; i < newDivs.length; i++) {
        body.appendChild(newDivs[i]);
        dragElement(newDivs[i]);
    };
    
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    
        function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        }
    }
}