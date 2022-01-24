const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation-list');
const nav = document.querySelector('.navigation');

function toggleMenu() {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
}

hamburger.addEventListener('click', toggleMenu);

function closeMenu(event) {
  if (event.target.classList.contains('navigation-link')) {
  hamburger.classList.remove('open');
  menu.classList.remove('open');
  }
}

nav.addEventListener('click', closeMenu);