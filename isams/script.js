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

    // If this page has photos
    if (newDivs.length > 1) {
        // Create button to randomise seats
        rngButton = document.createElement("button");
        saveButton = document.createElement("button");
        loadButton = document.createElement("button");
        invertButton = document.createElement("button");
        rngButton.id = "rngBtn";
        saveButton.id = "saveBtn";
        loadButton.id = "loadBtn";
        invertButton.id = "invBtn";
        rngButton.innerText = "Randomise";
        saveButton.innerText = "Save";
        loadButton.innerText = "Load";
        invertButton.innerText = "Invert";
        buttonDiv = document.createElement("div");
        buttonDiv.style.position = "absolute";
        buttonDiv.style.top = "1rem";
        buttonDiv.style.left = "1rem";
        buttonDiv.style.height = "2rem";
        buttonDiv.style.margin = "0 1rem";
        buttonDiv.appendChild(rngButton);
        buttonDiv.appendChild(saveButton);
        buttonDiv.appendChild(loadButton);
        buttonDiv.appendChild(invertButton);

        // Specific styles for page
        col4Button = document.createElement("button");
        col6Button = document.createElement("button");
        col8Button = document.createElement("button");
        grp2Button = document.createElement("button");
        grp4Button = document.createElement("button");
        col4Button.id = "column4";
        col6Button.id = "column6";
        col8Button.id = "column8";
        grp2Button.id = "group2";
        grp4Button.id = "group4";
        col4Button.innerText = "4 Cols";
        col6Button.innerText = "6 Cols";
        col8Button.innerText = "8 Cols";
        grp2Button.innerText = "Pairs";
        grp4Button.innerText = "Fours";
        stylesDiv = document.createElement("div");
        stylesDiv.style.position = "absolute";
        stylesDiv.style.top = "1rem";
        stylesDiv.style.right = "1rem";
        stylesDiv.style.height = "2rem";
        stylesDiv.style.margin = "0 1rem";
        stylesDiv.appendChild(col4Button);
        stylesDiv.appendChild(col6Button);
        stylesDiv.appendChild(col8Button);
        stylesDiv.appendChild(grp2Button);
        stylesDiv.appendChild(grp4Button);

        // Find the body of the page and clear it
        body = document.getElementsByTagName("body")[0];
        // Add title to show which way is up
        body.innerHTML="<h2>Front</h2>";
        // Some styling so the title is centered
        body.style.display = "flex";
        body.style.justifyContent = "center";
        // Add buttons
        body.appendChild(buttonDiv);
        body.appendChild(stylesDiv);

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

        // Shuffle array function
        function shuffleArray(a,b,c,d){//array,placeholder,placeholder,placeholder
            c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d
        }

        // Function to find the position of an element
        var cumulativeOffset = function(element) {
            var top = 0, left = 0;
            do {
                top += element.offsetTop  || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while(element);
            // Returns an object with top and left positions
            return {
                top: top,
                left: left
            };
        };        

        // Function to randomise people, keeping locations the same
        function randomise() {
            // Find current positions of all pupils
            let allLocations = document.getElementsByClassName("pupils");
            let positions = [];
            for (let i = 0; i < allLocations.length; i++) {
                positions.push(cumulativeOffset(allLocations[i]));
            }
            // Shuffle positions
            shuffleArray(positions);
            // Give pupils their shuffled positions
            for (let i = 0; i < allLocations.length; i++) {
                curImg = allLocations[i];
                curPos = positions[i]
                curImg.style.top = curPos.top;
                curImg.style.left = curPos.left;
            }
        };

        // Function to save current positions to storage
        function saveSeats() {
            let allLocations = document.getElementsByClassName("pupils");
            let positions = [];
            for (let i = 0; i < allLocations.length; i++) {
                positions.push(cumulativeOffset(allLocations[i]));
            }
            nameOfClass = prompt("Type a name to save this as")
            // Save to storage with unique suffix to make it easier to find later
            localStorage.setItem(nameOfClass + " seatsAppv1", JSON.stringify(positions));
        }

        // Function to load positions from storage
        function loadSeats() {
            let toLoad = "";
            // Custom UI to show which classes currently have been saved
            savedClasses = document.createElement("div");
            savedClasses.id = "loading";
            savedClasses.style.display = "flex";
            savedClasses.style.flexDirection = "column";
            savedClasses.style.backgroundColor = "white";
            savedClasses.style.height = "100vh";
            savedClasses.style.width = "100vw";
            savedClasses.style.top = "0px";
            savedClasses.style.left = "0px";
            savedClasses.style.position = "absolute";
            // Look through storage and find data with unique suffix
            classesStored = [];
            for (var a in localStorage) {
                if (a.includes("seatsAppv1")) {
                    classesStored.push(a.split(" ")[0]
                    );
                }
            }
            // Add to custom UI
            for (let i = 0; i < classesStored.length; i++) {
                thisClass = document.createElement("div");
                thisClass.innerText = classesStored[i];
                thisClass.style.padding = "1rem";
                thisClass.style.borderBottom = "1px solid black";
                thisClass.style.cursor = "pointer";
                thisClass.style.display = "flex";
                thisClass.style.justifyContent = "space-between";
                thisClass.addEventListener("mouseover", function(event) {
                    if (thisClass !== event.target) return;
                    event.target.style.backgroundColor = "#e6e6fa";
                }, false);
                thisClass.addEventListener("mouseleave", function(event) {
                    event.target.style.backgroundColor = "transparent";
                }, false);
                thisClass.addEventListener("click", function(event) {
                    if (thisClass !== event.target) return;
                    toLoad = classesStored[i];
                    positions = JSON.parse(localStorage.getItem(toLoad + " seatsAppv1"));
                    let allLocations = document.getElementsByClassName("pupils");
                    if (allLocations.length = positions.length) {
                        for (let i = 0; i < allLocations.length; i++) {
                            curImg = allLocations[i];
                            curPos = positions[i];
                            curImg.style.top = curPos.top + "px";
                            curImg.style.left = curPos.left + "px";
                        }
                    }
                    else {
                        alert("The saved class has a different number of pupils to this class");
                    }
                }, false);
                delBtn = document.createElement("div");
                delBtn.innerText = "Delete";
                delBtn.style.width = "5rem";
                delBtn.style.backgroundColor = "red", "important";
                delBtn.style.color = "white";
                delBtn.addEventListener("click", function() {
                    if (confirm("Are you sure? Deleting this cannot be undone")) {
                        localStorage.removeItem(classesStored[i] + " seatsAppv1");
                    }
                }, false);
                thisClass.appendChild(delBtn);
                savedClasses.appendChild(thisClass);
            }

            body.appendChild(savedClasses);
            document.getElementById("loading").addEventListener("click", function(){document.querySelector("#loading").remove()});
        }

        function makeColumns(c) {
            // Find current positions of all pupils
            let allLocations = document.getElementsByClassName("pupils");
            // Give pupils their new positions
            for (let i = 0; i < allLocations.length; i++) {
                curImg = allLocations[i];
                curImg.style.top = Math.floor(i/c)*120+60 + "px";
                curImg.style.left = (i%c)*80+10 + "px";
            }
        }

        function makePairs() {
            // Find current positions of all pupils
            let allLocations = document.getElementsByClassName("pupils");
            // Horizontal offset
            offset = 10;
            // Give pupils their new positions
            for (let i = 0; i < allLocations.length; i++) {
                if (i%6 == 0) {
                    offset = 10;
                }
                if(i%6 == 2) {
                    offset = 70;
                }
                if(i%6 == 4) {
                    offset = 130;
                }
                curImg = allLocations[i];
                curImg.style.top = Math.floor(i/6)*130+60 + "px";
                curImg.style.left = (i%6)*70+offset + "px";
            };
            randomise();
        }

        function makeFours() {
            // Find current positions of all pupils
            let allLocations = document.getElementsByClassName("pupils");
            // Horizontal offset
            offset = 10;
            // Vertical offset
            offset2 = 60;
            // Give pupils their new positions
            for (let i = 0; i < allLocations.length; i++) {
                if (i%6 == 0) {
                    offset = 10;
                }
                if(i%6 == 2) {
                    offset = 70;
                }
                if(i%6 == 4) {
                    offset = 130;
                }
                if (i==12) {
                    offset2 += 50;
                }
                curImg = allLocations[i];
                curImg.style.top = Math.floor(i/6)*85+offset2 + "px";
                curImg.style.left = (i%6)*70+offset + "px";
            };
            randomise();
        }

        function invertSeats() {
            let allLocations = document.getElementsByClassName("pupils");
            maxHeight = 0;
            maxWidth = 0;
            for (let i = 0; i < allLocations.length; i++) {
                curPos = cumulativeOffset(allLocations[i]);
                curTop = curPos.top;
                curLeft = curPos.left;
                if (curTop > maxHeight) {
                    maxHeight = curTop;
                };
                if (curLeft > maxWidth) {
                    maxWidth = curLeft;
                };
            }
            maxHeight+=85;
            maxWidth+=70;
            for (let i = 0; i < allLocations.length; i++) {
                curImg = allLocations[i];
                curPos = cumulativeOffset(allLocations[i]);
                curImg.style.top = maxHeight-curPos.top;
                curImg.style.left = maxWidth-curPos.left;
            }
        }


        // Set buttons to do what they need to do
        document.getElementById("rngBtn").addEventListener("click", randomise);
        document.getElementById("saveBtn").addEventListener("click", saveSeats);
        document.getElementById("loadBtn").addEventListener("click", loadSeats);
        document.getElementById("invBtn").addEventListener("click", invertSeats);

        document.getElementById("column4").addEventListener("click", function(){makeColumns(4)});
        document.getElementById("column6").addEventListener("click", function(){makeColumns(6)});
        document.getElementById("column8").addEventListener("click", function(){makeColumns(8)});
        document.getElementById("group2").addEventListener("click", makePairs);
        document.getElementById("group4").addEventListener("click", makeFours);
    }
    
    
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
