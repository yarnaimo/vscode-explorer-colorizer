const { writeFileSync } = require('fs')
const { indentSize, colors, alpha } = require('../mixins')
const { transparent } = require('./utils')

const c = (n, directory) => {
    const color = colors[n]
    return color ? color(directory ? alpha.directory : alpha.file) : transparent
}

const p = (n, offset = 0) => `${-indentSize + 15 + offset + indentSize * n}px`

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
    top: 3px;
    height: calc(100% - 3px);
}
`
}

const arr = (length) => [...Array(length)].map((_, i) => i + 1)

const lv = (n) => {
    const chunk = {
        bg: (_n) => [
            cp([_n], [_n + 1]),
            cp([null], [_n + 1]),
            cp([null], [_n + 1, 3]),
            cp([_n + 1], [_n + 1, 3]),
        ],
    }

    const gDefaultOuter = {
        bg: arr(n - 1)
            .flatMap(chunk.bg)
            .join(', '),
    }

    const gExpandedOuter = {
        bg: arr(n).flatMap(chunk.bg).slice(0, -2).join(', '),
    }

    const sDefaultOuter = [
        gDefaultOuter.bg &&
            `${outerLv(n)}::before { ${gback(gDefaultOuter.bg)} }`,
    ]
    const sExpandedOuter = [
        `${outerLv(n)}${expanded}::before { ${gback(gExpandedOuter.bg)} }`,
    ]
    const sExpandedInner = [
        `${outerLv(n)}${expanded} ${inner}::before {
            left: ${p(n + 1, -4 + 3)};
            width: calc(100% - ${p(n + 1, -4 + 3)});
            background: ${c(n + 1, true)};
        }`,
    ]

    return [...sDefaultOuter, ...sExpandedOuter, ...sExpandedInner].join('')
}

const main = () => {
    const str = [base(), ...arr(7).map((n) => lv(n))].join('')
    writeFileSync('main.css', str)
}

main()
