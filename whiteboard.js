// Find canvas element
let dimensions = document.getElementsByTagName('canvas')[0];
// Set width and height to window width/height
dimensions.width = window.innerWidth;
dimensions.height = window.innerHeight;
// Use fabric.js to allow free drawing
let canvas = new fabric.Canvas("c", {isDrawingMode: true});

// Current brush size and colour
let currentSize = 1;
let currentColor = "black";

// Function to clear the canvas
let clearCanvas = function() {
	if(confirm("Are you sure? This cannot be undone.")){
		canvas.clear();
	}
};

// Function to change thickness of brush
let brushSize = function(thickness) {
	canvas.freeDrawingBrush.width = thickness;
};

// Function to change colour of brush
let brushColor = function(color) {
	canvas.freeDrawingBrush.color = color;
};

let saveCanvas = function() {
	alert(canvas.toSVG());
}

// PubNub initialization
let channel = 'whiteboard-main';

let pubnub = new PubNub({
	publishKey: "pub-c-3e0d9543-024b-45f8-953d-1d3257ac191a",
	subscribeKey: "sub-c-9fa97d7c-e7d9-11ea-89a6-b2966c0cfe96",
	uuid: "theClientUUID"
});

/*let shareCanvas = function() {
	let exportCanvas = canvas.toJSON();
	if(confirm("Are you sure?")){
		pubnub.publsh(
			{
				channel: "whiteboard-main",
				message: exportCanvas,
			}, 
			(status, response) => {
				console.log(status);
				console.log(response);
			}
		);
	}
}*/

pubnub.addListener({
	message: function(message) {
		canvas.loadFromJSON(message.message); 
	}
});

pubnub.subscribe({
	channels: ["whiteboard-main"],
});