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
