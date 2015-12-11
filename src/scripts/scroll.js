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
