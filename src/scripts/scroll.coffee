# Smooth scrolling for 'Back to Top' link
# @link http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
# @link http://jsfiddle.net/62MTU/15/
# @link http://www.timotheegroleau.com/Flash/experimentimeStart/easing_function_generator.htm

$('.footer__top-link').addEventListener 'click', (e) ->
   scrollTo(document.body, 0, 1000)

scrollTo = (element, to, duration) ->
  start       = element.scrollTop
  change      = to - start
  currentTime = 0
  increment   = 20

  animateScroll = () ->

    currentTime += increment

    val = cubicBezier(currentTime, start, change, duration)
    element.scrollTop = val

    if currentTime < duration
      setTimeout(animateScroll, increment)
      return

  animateScroll()

# create a Bezeir animation curve

cubicBezier = (currentTime, start, change, duration) ->
  timeStart = (currentTime /= duration) * currentTime
  timeChange = timeStart * currentTime
  start + change * (5.4975 * timeChange * timeStart + -14.1925 * timeStart * timeStart + 8.695 * timeChange + 1.1 * timeStart + -0.1 * t)
