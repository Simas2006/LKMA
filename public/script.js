var carousel;

function renderCarousel() {
  carousel.element.style.backgroundImage = `url("/images/${carousel.images[carousel.index]}")`;
}

function getCarousel() {
  var element = document.getElementsByClassName("carousel")[0];
  carousel = {
    "element": element,
    "images": element.getAttribute("data-images").split(" "),
    "index": 0
  }
  renderCarousel();
}

function moveCarousel(move) {
  carousel.index += move;
  if ( carousel.index <= -1 ) carousel.index = carousel.index + carousel.images.length;
  if ( carousel.index >= carousel.images.length ) carousel.index = carousel.index - carousel.images.length;
  renderCarousel();
}

window.onload = getCarousel;
