var carousel;
var allowMove = true;

function initCarousel() {
  var element = document.getElementsByClassName("carousel")[0];
  if ( ! element ) return;
  var images = element.getAttribute("data-images").split(" ");
  var displays = [];
  for ( var i = 0; i < images.length; i++ ) {
    var div = document.createElement("div");
    div.className = "carousel-display";
    div.style.backgroundImage = `url("/images/${images[i]}")`;
    element.appendChild(div);
    displays.push(div);
  }
  displays[0].style.display = "block";
  carousel = {
    "displays": displays,
    "index": 0
  }
}

function moveCarousel(move) {
  if ( ! allowMove ) return;
  allowMove = false;
  var lastIndex = carousel.index;
  carousel.index += move;
  if ( carousel.index <= -1 ) carousel.index = carousel.index + carousel.displays.length;
  if ( carousel.index >= carousel.displays.length ) carousel.index = carousel.index - carousel.displays.length;
  var direction = move < 0 ? "Left" : "Right";
  carousel.displays[carousel.index].style.display = "block";
  carousel.displays[lastIndex].classList.add("exit" + direction);
  carousel.displays[carousel.index].classList.add("enter" + direction);
  setTimeout(function() {
    carousel.displays[lastIndex].classList.remove("exit" + direction);
    carousel.displays[carousel.index].classList.remove("enter" + direction);
    carousel.displays[lastIndex].style.display = "none";
    carousel.displays[carousel.index].style.display = "block";
    allowMove = true;
  },1000);
}

window.onload = initCarousel;
