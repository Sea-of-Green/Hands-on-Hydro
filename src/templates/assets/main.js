var $ = function (node) {
  return document.querySelector(node);
};

var $$ = function (nodeList) {
  return document.querySelectorAll(nodeList);
};

// Add 'utm_source=sea-of-green' to external links

var ref   = 'utm_source=sea-of-green&utm_medium=referral';
var links = $$('a');
var host  = new RegExp('/' + window.location.host + '/');

// Iterate over all <a> elements on page
for ( i = 0; i < links.length; i++ ) {

  // Get current link
  var link = links[i];
  // Get current link's href
  var dest = link.href;

  // If href does not match current url
  if ( host.test(dest) === false ) {

    // Check if link has an anchor
    if ( dest.search('#') !== -1 ) {

      // Split link at anchor and store parts in variables
      var destParts = dest.split('#');
      var anchor    = destParts.pop();
      var destParts = destParts.pop();
      var dest      = destParts.toString().replace(',', '');

      // Check if link already has a query
      if ( dest.search('/?') !== -1 && dest.search('=') !== -1 ) {
        // Attach utm query to existing query and assemble link
        link.href = dest + '&' + ref + '#' + anchor;
      } else {
        // Assemble link
        link.href = dest + '?' + ref + '#' + anchor;
      }

    } else {

      // Check if link already has a query
      if ( dest.search('/?') !== -1 && dest.search('=') !== -1 ) {
        // Attach utm query to existing query and assemble link
        link.href += '&' + ref;
      } else {
        // Assemble link
        link.href += '?' + ref;
      }
    }
  }
}

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
