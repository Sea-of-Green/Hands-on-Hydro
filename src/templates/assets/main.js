var $ = function (node) {
  return document.querySelector(node);
};

var $$ = function (nodeList) {
  return document.querySelectorAll(nodeList);
};

// Send newsletter signup to Mailchimp
var newsletterSignup = function() {
  var email = $('#footer__newsletter-signup-input').value;
  var link = 'http://sea-of-green.us7.list-manage2.com/subscribe?u=fdddde00588b5c6e72568d831&id=878c26efbd&MERGE0=';
  window.location.replace(link+email);
};

// Add Year to Copyright
$('#footer__copyright-year').innerHTML = new Date().getFullYear();

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

// Add query strings to external links
// @link https://gist.github.com/lowmess/473f4c425b5be8d26e00

var addQueryString = function ( el, queryString ) {

  // Check if el is a link
  if ( !el.href ) {
    console.log(el + ': \n this element is not a link or is missing an href');
    return;
  }

  // Check if el uses an HTTP request
  if ( el.protocol !== 'http:' && el.protocol !== 'https:' ) {
    console.log(el.href + ': \n this link is not using an HTTP protocol');
    return;
  }

  // Check if link host does not match current window host
  if ( window.location.host !== el.host ) {

    // If link already has a query string add to it, else create one
    if ( el.search ) {
      el.search += '&' + queryString;
    } else {
      el.search = queryString;
    }
  }
};

var links     = $$('a');
var utmString = 'utm_source=sea-of-green&utm_medium=referral';

for ( var i = 0; i < links.length; i++ ) {
  // Add query string to valid links
  addQueryString(links[i], utmString);
}

// Smooth scrolling for 'Back to Top' link
// @link http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
// @link http://jsfiddle.net/62MTU/15/
// @link http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
$('.footer__top-link').addEventListener( 'click', function () {
  scrollTo(document.body, 0, 1000);
});

function scrollTo(element, to, duration) {
  var start       = element.scrollTop;
  var change      = to - start;
  var currentTime = 0;
  var increment   = 20;

  var animateScroll = function () {
    currentTime += increment;

    var val = cubicBezier(currentTime, start, change, duration);
    element.scrollTop = val;

    if ( currentTime < duration ) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
};

//t = current time
//b = start value
//c = change in value
//d = duration
var cubicBezier = function (t, b, c, d) {
	var ts=(t/=d)*t;
	var tc=ts*t;
	return b+c*(5.4975*tc*ts + -14.1925*ts*ts + 8.695*tc + 1.1*ts + -0.1*t);
};
