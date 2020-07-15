module.exports.hsl = (h, s, l) => (a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`
module.exports.rgb = (r, g, b) => (a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`

module.exports.transparent = 'transparent'
