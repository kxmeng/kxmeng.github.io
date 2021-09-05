window.onload = () => {
  const anchors = document.querySelectorAll('a');
  const transition_el = document.querySelectorAll('.transition');

  setTimeout(() => {
    transition_el.forEach(
      (e) => {e.classList.remove('active')}
    );
  }, 400);

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];

    anchor.addEventListener('click', e => {
      let transitionColor = e.target.className;

      transition_el.forEach(
        (e) => {
          e.classList.add('active');
          e.classList.add(transitionColor);
        }
      );

      e.preventDefault();

      setInterval(() => {
        window.location.href = e.target.href;
      }, 400);
    })
  }
}

// Function to navigate with sidebar items
let clickFunction = function(e) {
  // Find current highlighted item
  activeEl = document.getElementsByClassName("sidebar-active");
  // If there is already a highlighted sidebar item, unhighlight it
  if(activeEl.length !== 0) {
      activeEl[0].classList.remove("sidebar-active");
  };
  // Highlight this sidebar item
  e.classList.add("sidebar-active");
  // Find the main areas on the page
  let mainDiv = document.getElementById("main-content");
  // Find the div of the selected topic and make a copy of it (appendChild will move the div otherwise and it will get deleted later)
  let newDiv = document.getElementById(e.id + "-content").cloneNode(true);
  // Delete everything in the main body of the page
  mainDiv.innerHTML = "";
  // Delay for animation
  setTimeout(function(){
  // Add the topic div to the main body of the page
  mainDiv.appendChild(newDiv);
},100);
};