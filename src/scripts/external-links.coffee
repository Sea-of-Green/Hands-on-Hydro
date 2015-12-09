# Add 'utm_source=sea-of-green' to external links

ref   = 'utm_source=sea-of-green&utm_medium=referral'
links = $$('a')
host  = new RegExp('/' + window.location.host + '/')

# Iterate over all <a> elements on page
for link in links

  # Get current link's href
  dest = link.href

  # If href does not match current url
  if host.test(dest) is false

    # Check if link has an anchor
    if dest.search('#') isnt -1

      # Split link at anchor and store parts in variables
      destParts = dest.split('#')
      anchor    = destParts.pop()
      destParts = destParts.pop()
      dest      = destParts.toString().replace(',', '')

      # Check if link already has a query
      if dest.search('/?') isnt -1 and dest.search('=') isnt -1
        # Attach utm query to existing query and assemble link
        link.href = dest + '&' + ref + '#' + anchor
      else
        # Assemble link
        link.href = dest + '?' + ref + '#' + anchor

    else

      # Check if link already has a query
      if dest.search('/?') isnt -1 and dest.search('=') isnt -1
        # Attach utm query to existing query and assemble link
        link.href += '&' + ref
      else
        # Assemble link
        link.href += '?' + ref
