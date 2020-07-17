const { writeFileSync } = require('fs')
const { indentSize, colors, alpha } = require('../mixins')
const { transparent } = require('./utils')

const rColors = [null, null, ...colors, ...colors.slice(0, 2)]

const c = (n, directory) => {
    const color = rColors[n]
    return color
        ? color(directory ? alpha.directory + 0.1 : alpha.directory - 0.1)
        : transparent
}

const marginX = 6
const marginY = 4

const p = (n, offset = 0) =>
    `${-indentSize + (18 - marginX) + offset + indentSize * n}px`

const cp = (cargs, pargs) => `${c(...cargs)} ${p(...pargs)}`

const outer = '.explorer-folders-view [aria-level]'
const outerLv = (n) => `.explorer-folders-view [aria-level="${n}"]`
const inner = '.monaco-tl-row'
const expanded = '[aria-expanded="true"]'
const gback = (v) => `background: linear-gradient(90deg, ${v});`

const base = () => {
    return `
${outer}::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

${outer}${expanded} ${inner}::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    border-top-left-radius: 8px;
    top: ${marginY}px;
    height: calc(100% - ${marginY}px);
}
`
}

const arr = (length) => [...Array(length)].map((_, i) => i + 1)

const lv = (n) => {
    const chunk = (_n) => [
        cp([_n], [_n + 1]),
        cp([null], [_n + 1]),
        cp([null], [_n + 1, marginX]),
        cp([_n + 1], [_n + 1, marginX]),
    ]

    const gDefaultOuter = arr(n - 1)
        .flatMap(chunk)
        .concat(cp([n], [n + 1]), cp([null], [n + 1]))
        .join(', ')

    const gExpandedOuter = arr(n).flatMap(chunk).slice(0, -2).join(', ')

    const sDefaultOuter = [
        gDefaultOuter && `${outerLv(n)}::before { ${gback(gDefaultOuter)} }`,
    ]
    const sExpandedOuter = [
        `${outerLv(n)}${expanded}::before { ${gback(gExpandedOuter)} }`,
    ]
    const sExpandedInner = [
        `${outerLv(n)}${expanded} ${inner}::before {
            left: ${p(n + 1, -4 + marginX)};
            width: calc(100% - ${p(n + 1, -4 + marginX)});
            background: ${c(n + 1, true)};
        }`,
    ]

    return [...sDefaultOuter, ...sExpandedOuter, ...sExpandedInner].join('')
}

const main = () => {
    const str = [base(), ...arr(rColors.length - 1).map((n) => lv(n))].join('')
    writeFileSync('main.css', str)
}

main()
