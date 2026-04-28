const React = require('react')

function NextImage({ src, alt, width, height, ...props }) {
  return React.createElement('img', { src, alt, width, height, ...props })
}

module.exports = NextImage
module.exports.default = NextImage
