// Function to navigate with sidebar items
let clickFunction = function() {
	// If there is already a highlighted sidebar item, unhighlight it
	if(document.getElementsByClassName("sidebar-active").length !== 0) {
		document.getElementsByClassName("sidebar-active")[0].classList.remove("sidebar-active");
	};
	// Highlight this sidebar item
	this.classList.add("sidebar-active");
	// Find the main area on the page
	let mainDiv = document.getElementById("mid");
	let subDiv = document.getElementById("resources");
	// Set height main div to transparent for a nice transition
	mainDiv.classList.add("zero-opacity");
	subDiv.classList.add("zero-opacity");
	// Find the div of the selected topic and make a copy of it (appendChild will move the div otherwise and it will get deleted later)
	let newDiv = document.getElementById(this.id + "-content").cloneNode(true);
	let newSubDiv = document.getElementById(this.id + "-resources").cloneNode(true);
	// Delay the rest of this so there is time to see the transition
	setTimeout(function(){
		// Delete everything in the main body of the page
		mainDiv.innerHTML = "";
		subDiv.innerHTML = "";
		// Add the topic div to the main body of the page
		mainDiv.appendChild(newDiv);
		subDiv.appendChild(newSubDiv);
		// Stop the main area from being transparent
		mainDiv.classList.remove("zero-opacity");
		subDiv.classList.remove("zero-opacity");
	},250);
};

// Function to add click listener to sidebar items so they do stuff when clicked
for (let i=0; i < document.getElementById("left").querySelectorAll("li").length; i++) {
	document.getElementById("left").querySelectorAll("li")[i].onclick = clickFunction;
}