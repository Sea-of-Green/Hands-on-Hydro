// Send newsletter signup to Mailchimp
var newsletterSignup = function() {
  var email = $('#footer__newsletter-signup-input').value;
  var link = 'http://sea-of-green.us7.list-manage2.com/subscribe?u=fdddde00588b5c6e72568d831&id=878c26efbd&MERGE0=';
  window.location.replace(link+email);
};

// Add Year to Copyright
$('#footer__copyright-year').innerHTML = new Date().getFullYear();
