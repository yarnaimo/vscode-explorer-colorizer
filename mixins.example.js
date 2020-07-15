const { hsl, rgb } = require('./src/utils')

module.exports = {
    indentSize: 10,

    alpha: {
        border: 1, // border の不透明度
        background: 0.06, // background の不透明度
    },
    colors: {
        // 各階層の色、hsl() または rgb() で指定
        1: null,
        2: hsl(40, 75, 65),
        3: hsl(170, 50, 65),
        4: hsl(15, 55, 65),
        5: hsl(70, 65, 45),
        6: hsl(205, 55, 65),
        7: hsl(340, 40, 65),
        8: null,
    },
}
