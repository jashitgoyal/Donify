const navbar_div = document.getElementById("navbar");
const hero_div = document.getElementById("hero-section");
const z_div = document.getElementById("z-pattern");
const features_div = document.getElementById("features");
const footer_div = document.getElementById("footer");

function navrenderer() {
  navbar_div.innerHTML = `
<div class="nav-flex">
 <div>Nav</div>
 <div classname="nav-flex-inner">
 <a href="#">About Us</a>
 <a href="#">Contact Us</a>
 <a href="#">Join Us</a>
 <a href="#">Login</a>
</div>
</div>`;
}

function herorenderer() {
  hero_div.innerHTML = `<div>
  <div class="slideshow-container">

<div class="mySlides fade">
  <div class="numbertext">1 / 3</div>
  <img src="img/hero1.jpg" style="width:100%">
  <div class="text">Caption Text</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">2 / 3</div>
  <img src="img/hero2.jpg" style="width:100%">
  <div class="text">Caption Two</div>
</div>

<div class="mySlides fade">
  <div class="numbertext">3 / 3</div>
  <img src="img/hero3.jpg" style="width:100%">
  <div class="text">Caption Three</div>
</div>

</div>
  <div>`;
}

navrenderer();
// herorenderer();

let slideIndex = 0;
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  console.log(dots);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
