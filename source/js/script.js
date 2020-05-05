var menuOpen = document.querySelector(".page-header__burger");
var menu = document.querySelector(".main-nav__list--left");
var menuRight = document.querySelector(".main-nav__list--right");


menuOpen.classList.remove("visually-hidden");
menu.classList.add("menu--close");
menuRight.classList.add("menu--close");
menuOpen.classList.add("page-header__burger--close");

menuOpen.addEventListener ("click", function (evt) {
  evt.preventDefault();
  menu.classList.toggle("menu--close");
  menuRight.classList.toggle("menu--close");
  menuOpen.classList.toggle("page-header__burger--close");
  if (document.activeElement != document.body) document.activeElement.blur();
});
