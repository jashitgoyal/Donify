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
    <div>
  
    <a><button>Need Help ?</button></a>
    <a><button>Wanna Help ?</button></a>
    </div>
    <div>
    Back Ground Image
    </div>
  <div>`;
}

navrenderer();
herorenderer();
