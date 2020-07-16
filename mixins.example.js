const { hsl, rgb } = require('./src/utils')

module.exports = {
    indentSize: 10,

    alpha: {
        directory: 0.55, // ディレクトリの不透明度
        file: 0.12, // ファイルの不透明度
    },
    colors: [
        // 各階層の色、hsl() または rgb() で指定
        null,
        null,
        hsl(35, 40, 65),
        hsl(45, 80, 60),
        hsl(65, 70, 50),
        hsl(340, 45, 72),
        hsl(160, 55, 70),
        hsl(195, 60, 70),
        null,
    ],
}
