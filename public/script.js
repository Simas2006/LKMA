var carousel;
var allowMove = true;

function initCarousel() {
  var carouselObj = document.getElementsByClassName("carousel")[0];
  if ( ! carouselObj ) return;
  var element = document.createElement("div");
  element.className = "carousel-images";
  carouselObj.appendChild(element);
  var prevButton = document.createElement("button");
  prevButton.className = "carousel-prev";
  prevButton.innerText = "←";
  prevButton.onclick = function() {
    moveCarousel(-1);
  }
  element.appendChild(prevButton);
  var nextButton = document.createElement("button");
  nextButton.className = "carousel-next";
  nextButton.innerText = "→";
  nextButton.onclick = function() {
    moveCarousel(1);
  }
  element.appendChild(nextButton);
  var images = element.parentElement.getAttribute("data-images").split(" ");
  var displays = [];
  for ( var i = 0; i < images.length; i++ ) {
    var div = document.createElement("div");
    div.className = "carousel-display";
    div.style.backgroundImage = `url("./images/${images[i]}")`;
    element.appendChild(div);
    displays.push(div);
  }
  displays[0].style.display = "block";
  var captions = element.parentElement.getAttribute("data-captions").split("/");
  var captionObj = document.createElement("p");
  captionObj.innerText = captions[0];
  captionObj.className = "caption";
  carouselObj.appendChild(captionObj);
  var dotContainer = document.createElement("div");
  var dots = [];
  for ( var i = 0; i < images.length; i++ ) {
    var dot = document.createElement("span");
    dot.innerHTML = "• ";
    dot.className = "carousel-dot";
    dot.setAttribute("data-index",i);
    if ( i == 0 ) dot.classList.add("active");
    dot.onclick = function() {
      var move = this.getAttribute("data-index") - carousel.index;
      if ( move == 0 ) return;
      moveCarousel(move);
    }
    dotContainer.appendChild(dot);
    dots.push(dot);
  }
  carouselObj.appendChild(dotContainer);
  carousel = {
    "displays": displays,
    "captions": captions,
    "captionObj": captionObj,
    "dots": dots,
    "index": 0,
    "lastMove": new Date().getTime()
  }
  setInterval(function() {
    if ( new Date().getTime() - carousel.lastMove >= 5000 ) moveCarousel(1);
  },100);
}

function moveCarousel(move) {
  if ( ! allowMove ) return;
  allowMove = false;
  var lastIndex = carousel.index;
  carousel.index += move;
  if ( carousel.index <= -1 ) carousel.index = carousel.index + carousel.displays.length;
  if ( carousel.index >= carousel.displays.length ) carousel.index = carousel.index - carousel.displays.length;
  for ( var i = 0; i < carousel.dots.length; i++ ) {
    if ( carousel.index == i ) carousel.dots[i].classList.add("active");
    else carousel.dots[i].classList.remove("active");
  }
  var direction = move < 0 ? "Left" : "Right";
  carousel.displays[carousel.index].style.display = "block";
  carousel.displays[lastIndex].classList.add("exit" + direction);
  carousel.displays[carousel.index].classList.add("enter" + direction);
  setTimeout(function() {
    carousel.displays[lastIndex].classList.remove("exit" + direction);
    carousel.displays[carousel.index].classList.remove("enter" + direction);
    carousel.displays[lastIndex].style.display = "none";
    carousel.displays[carousel.index].style.display = "block";
    carousel.captionObj.innerText = carousel.captions[carousel.index];
    carousel.lastMove = new Date().getTime();
    allowMove = true;
  },1000);
}

function getQSParam(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if ( ! results ) return null;
  if ( ! results[2] ) return "";
  return decodeURIComponent(results[2].replace(/\+/g," "));
}

function redirect(page,lang) {
  location.href = `/page_view.php?page=${page}&file=${lang || getQSParam("file")}`
}

function swapLanguage() {
  var newLang = getQSParam("file") == "en-us" ? "lt-lt" : "en-us";
  redirect(getQSParam("page"),newLang);
}

window.onload = initCarousel;
