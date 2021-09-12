// Get title of page
let pageTitle = document.getElementsByTagName("title")[0].innerHTML;
// On last step if iSAMS wizard, change the page to just the container containing pupil photos
if (pageTitle.includes("Step 4")) {
    // Find the container/iframe on the page
    let ifr = document.getElementsByTagName("iframe");
    // Go to the link directly - this helps with image detection later
    if (ifr.length !== 0) {
        window.location.href = ifr[0].src;
    };
};

// If on the iframe page with pupil photos, run this script
if (pageTitle == "Set List") {
    // Images are given in tables in rows of 4 - find the rows
    let allImages = document.getElementsByTagName("td");
    let draggableImages = [];
    // Not all rows contain images
    for (let i = 0; i < allImages.length; i++) {
        // Select rows which contain 4 elements
        if(allImages[i].children.length == 4) {
            draggableImages.push(i);
        };
    };
    newDivs = [];
    // The first row with 4 elements does not contain images
    for (let i = 1; i < draggableImages.length; i++) {
        // Select this particular image
        parent = allImages[draggableImages[i]];
        // Create a new div for this image
        let newDiv = document.createElement("div");
        // Position absolute is necessary for dragging
        newDiv.style.position = "absolute";
        // Add class name to these divs in case we want to do anything with them later
        newDiv.classList.add("pupils");
        // Add some padding so highlighting it looks nicer
        newDiv.style.padding = "0.5rem";
        // Change the position of the divs as they appear on the page - otherwise they will all be on top of each other
        newDiv.style.top = Math.floor((i-1)/6)*100+60 + "px";
        newDiv.style.left = ((i-1)%6)*100+10 + "px";
        // Remove the last thing in the parent element - this is the "Year x" line and needs to be removed so that the only text is the name of the pupil
        parent.removeChild(parent.lastChild);
        // The image is in the parent within an anchor element - it's the first child of it
        newDiv.appendChild(parent.firstChild.firstChild);
        // Change image to be circular
        currentImage = newDiv.firstChild;
        currentImage.style.height = "60px";
        currentImage.style.width = "60px";
        currentImage.style.borderRadius = "50%";
        // Do not resize image if it's too big
        currentImage.style.objectFit = "none";
        // Create a div for the name of the child - this makes manipulating the name easier
        nameElement = document.createElement("div");
        // Add class name to these divs in case we want to do anything later
        nameElement.classList.add("pupilNames");
        // Find the full name
        text = parent.innerText;
        // If the name contains an alternative name, use it - this comes in () at the end
        if (text.includes("(")) {
            startPos = text.indexOf("(")+1;
            endPos = text.indexOf(")");
            text = text.slice(startPos,endPos);
        }
        // Find the first word of the name - checking for a space does not work for some reason...
        nameElement.innerText = text.match(/(?<=^[\s"']*)(\w+)/)[0];
        // Align the text so it's centered
        nameElement.style.textAlign = "center";
        // Add this to the div we created so that it now contains an image and this text
        newDiv.appendChild(nameElement);
        // Chage the cursor to pointer to indicate it can be dragged
        newDiv.style.cursor = "pointer";
        // Save it for later
        newDivs.push(newDiv);
    };

    // Find the body of the page and clear it
    body = document.getElementsByTagName("body")[0];
    // Add title to show which way is up
    body.innerHTML="<h2>Front</h2>";
    // Some styling so the title is centered
    body.style.display = "flex";
    body.style.justifyContent = "center";

    // Add the divs we created earlier to the body
    for (let i = 0; i < newDivs.length; i++) {
        body.appendChild(newDivs[i]);
        dragElement(newDivs[i]);
    };

    // Select random child to highlight
    let listOfChildren = document.getElementsByClassName("pupils");
    // Repeat this function every 2000ms
    setInterval(() => {
        let rng = Math.floor(Math.random() * listOfChildren.length);
        let lastHighlighted = document.getElementById("selected");
        if (lastHighlighted) {
            lastHighlighted.style.backgroundColor = "transparent";
            lastHighlighted.id = "";
        };
        listOfChildren[rng].id="selected";
        listOfChildren[rng].style.backgroundColor = "#e2f0cb";
    }, 2000);
    
    // Function to make an element draggable - copied from w3schools
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        elmnt.onmousedown = dragMouseDown;
    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = Math.round(e.clientX/20)*20;
            pos4 = Math.round(e.clientY/20)*20;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - Math.round(e.clientX/20)*20;
            pos2 = pos4 - Math.round(e.clientY/20)*20;
            pos3 = Math.round(e.clientX/20)*20;
            pos4 = Math.round(e.clientY/20)*20;
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