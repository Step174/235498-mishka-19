var menuOpen = document.querySelector(".page-header__burger");
var menu = document.querySelector(".main-nav__list--left");
var menuRight = document.querySelector(".main-nav__list--right");
var openCart = document.querySelectorAll(".buy-cart");
var popup = document.querySelector(".popup--overlay");

menuOpen.classList.remove("visually-hidden");
menu.classList.add("menu--close");
menuRight.classList.add("menu--close");
/*menuOpen.classList.add("page-header__burger--close");*/

menuOpen.addEventListener ("click", function (evt) {
  evt.preventDefault();
  menu.classList.toggle("menu--close");
  menuRight.classList.toggle("menu--close");
  menuOpen.classList.toggle("page-header__burger--close");
  if (document.activeElement != document.body) document.activeElement.blur();
});


for (var i = 0; i < openCart.length; i++) openCart[i].addEventListener("click", function(evt) {
  evt.preventDefault(), popup.classList.add("popup-show")
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("popup-show")) {
      popup.classList.remove("popup-show");
    }
  }
})
