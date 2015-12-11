// Navigation
var navButton = $('.nav__button');
var container = $('.hoh');

if ( window.matchMedia('(max-width: 39.99rem)') ) {

  navButton.addEventListener('click', function () {
    // Animate nav button
    navButton.classList.toggle('nav__button--close');
    // Show links
    container.classList.toggle('hoh--close');
  });
}

var width = document.innerWidth;

window.addEventListener('resize', function () {

  var newWidth = window.innerWidth;

  // if window is resized from below the nav breakpoint to above it, remove the classes added when navButton is clicked
  if ( width < 40*16 and newWidth > 40*16) {
    if ( navButton.classList.contains 'nav__button--close' ) {
      navButton.classList.remove 'nav__button--close'
    }
    if ( container.classList.contains 'hoh--close' ) {
      container.classList.remove 'hoh--close'
    }
  }

  width = newWidth;

});
