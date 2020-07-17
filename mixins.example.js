const { hsl, rgb } = require('./src/utils')

module.exports = {
    indentSize: 10,

    alpha: {
        directory: 0.55, // ディレクトリの不透明度
    },
    colors: [
        // 各階層の色、hsl() または rgb() で指定
        hsl(35, 40, 65),
        hsl(165, 40, 70),
        hsl(45, 70, 60),
        hsl(60, 60, 55),
        hsl(5, 35, 75),
    ],
}
