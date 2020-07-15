const { writeFileSync } = require('fs')
const { indentSize, colors, alpha } = require('../mixins')
const { transparent } = require('./utils')

const c = (n, border = false) => {
    const color = colors[n]
    return color ? color(border ? alpha.border : alpha.background) : transparent
}

const p = (n, offset = 0) => `${3 + offset + indentSize * n}px`

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

${outer}::after {
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

${outer}${expanded} ${inner}::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    border-top-left-radius: 8px;
    top: 3px;
    height: calc(100% - 3px);

    border-left-style: solid;
    border-left-width: 1px;
    border-top-style: solid;
    border-top-width: 1px;
}
`
}

const arr = (length) => [...Array(length)].map((_, i) => i + 1)

const lv = (n) => {
    // const chunk = (_n) => [
    //     cp([_n], [_n + 1]),
    //     cp([null], [_n + 1]),
    //     cp([null], [_n + 1, 3]),
    //     cp([_n + 1, true], [_n + 1, 3]),
    //     cp([_n + 1, true], [_n + 1, 4]),
    //     cp([_n + 1], [_n + 1, 4]),
    // ]
    const chunk = {
        bg: (_n) => [
            cp([_n], [_n + 1]),
            cp([null], [_n + 1]),
            cp([null], [_n + 1, 3]),
            cp([_n + 1], [_n + 1, 3]),
        ],
        border: (_n) => [
            cp([null], [_n + 1, 3]),
            cp([_n + 1, true], [_n + 1, 3]),
            cp([_n + 1, true], [_n + 1, 4]),
            cp([null], [_n + 1, 4]),
        ],
    }

    const gDefaultOuter = {
        bg: arr(n - 1)
            .flatMap(chunk.bg)
            .join(', '),
        border: arr(n - 1)
            .flatMap(chunk.border)
            .join(', '),
    }

    const gExpandedOuter = {
        bg: arr(n).flatMap(chunk.bg).slice(0, -2).join(', '),
        border: arr(n).flatMap(chunk.border).slice(0, -4).join(', '),
    }

    // const gxBefore = arr(n).flatMap(chunk).slice(0, -4).join(', ')

    // const gxAfter = [cp(null, n + 1, true), cp(n + 1, n + 1, true)].join(', ')

    const sDefaultOuter = [
        gDefaultOuter.bg &&
            `${outerLv(n)}::before { ${gback(gDefaultOuter.bg)} }`,
        gDefaultOuter.border &&
            `${outerLv(n)}::after { ${gback(gDefaultOuter.border)} }`,
    ]
    const sExpandedOuter = [
        `${outerLv(n)}${expanded}::before { ${gback(gExpandedOuter.bg)} }`,
        `${outerLv(n)}${expanded}::after { ${gback(gExpandedOuter.border)} }`,
    ]
    const sExpandedInner = [
        `${outerLv(n)}${expanded} ${inner}::before {
            left: ${p(n + 1, -4 + 3)};
            width: calc(100% - ${p(n + 1, -4 + 3)});
            background: ${c(n + 1)};
        }`,
        `${outerLv(n)}${expanded} ${inner}::after {
            left: ${p(n + 1, -4 + 3)};
            width: calc(100% - ${p(n + 1, -4 + 3)});
            border-left-color: ${c(n + 1, true)};
            border-top-color: ${c(n + 1, true)};
        }`,
    ]
    // const sxAfter = `${outerLv(n)}${expanded}::after {
    //     background: ${c(n + 1)};
    //     left: ${p(n + 1, 3)};
    //     width: calc(100% - ${p(n + 1, 3)});
    //     border-left: solid 1px ${c(n + 1, true)};
    //     border-top: solid 1px ${c(n + 1, true)};
    // }`

    return [...sDefaultOuter, ...sExpandedOuter, ...sExpandedInner].join('')
}

const main = () => {
    const str = [base(), ...arr(7).map((n) => lv(n))].join('')
    writeFileSync('main.css', str)
}

main()
