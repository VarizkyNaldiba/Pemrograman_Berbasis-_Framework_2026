const React = require('react')

function NextLink({ href, children, ...props }) {
  return React.createElement('a', { href, ...props }, children)
}

module.exports = NextLink
module.exports.default = NextLink
