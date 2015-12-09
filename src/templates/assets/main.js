var $, $$;

$ = function(node) {
  return document.querySelector(node);
};

$$ = function(nodeList) {
  return document.querySelectorAll(nodeList);
};

var anchor, dest, destParts, host, i, len, link, links, ref;

ref = 'utm_source=sea-of-green&utm_medium=referral';

links = $$('a');

host = new RegExp('/' + window.location.host + '/');

for (i = 0, len = links.length; i < len; i++) {
  link = links[i];
  dest = link.href;
  if (host.test(dest) === false) {
    if (dest.search('#') !== -1) {
      destParts = dest.split('#');
      anchor = destParts.pop();
      destParts = destParts.pop();
      dest = destParts.toString().replace(',', '');
      if (dest.search('/?') !== -1 && dest.search('=') !== -1) {
        link.href = dest + '&' + ref + '#' + anchor;
      } else {
        link.href = dest + '?' + ref + '#' + anchor;
      }
    } else {
      if (dest.search('/?') !== -1 && dest.search('=') !== -1) {
        link.href += '&' + ref;
      } else {
        link.href += '?' + ref;
      }
    }
  }
}

var newsletterSignup;

newsletterSignup = function() {
  var email, link;
  email = $('#footer__newsletter-signup-input').value;
  link = 'http://sea-of-green.us7.list-manage2.com/subscribe?u=fdddde00588b5c6e72568d831&id=878c26efbd&MERGE0=';
  window.location.replace(link + email);
};

$('#footer__copyright-year').innerHTML = new Date().getFullYear();

var container, navButton, width;

navButton = $('.nav__button');

container = $('.hoh');

if (window.matchMedia('(max-width: 39.99rem)')) {
  navButton.addEventListener('click', function(e) {
    navButton.classList.toggle('nav__button--close');
    return container.classList.toggle('hoh--close');
  });
}

width = document.innerWidth;

window.addEventListener('resize', function(event) {
  var newWidth;
  newWidth = window.innerWidth;
  if (width < 40 * 16 && newWidth > 40 * 16) {
    if (navButton.classList.contains('nav__button--close')) {
      navButton.classList.remove('nav__button--close');
    }
    if (container.classList.contains('hoh--close')) {
      container.classList.remove('hoh--close');
    }
  }
  width = newWidth;
});

var cubicBezier, scrollTo;

$('.footer__top-link').addEventListener('click', function(e) {
  return scrollTo(document.body, 0, 1000);
});

scrollTo = function(element, to, duration) {
  var animateScroll, change, currentTime, increment, start;
  start = element.scrollTop;
  change = to - start;
  currentTime = 0;
  increment = 20;
  animateScroll = function() {
    var val;
    currentTime += increment;
    val = cubicBezier(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  return animateScroll();
};

cubicBezier = function(currentTime, start, change, duration) {
  var timeChange, timeStart;
  timeStart = (currentTime /= duration) * currentTime;
  timeChange = timeStart * currentTime;
  return start + change * (5.4975 * timeChange * timeStart + -14.1925 * timeStart * timeStart + 8.695 * timeChange + 1.1 * timeStart + -0.1 * t);
};
