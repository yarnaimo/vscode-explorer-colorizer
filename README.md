# VSCode Explorer Colorizer

VSCode のエクスプローラをディレクトリの階層ごとに色分けするカスタム CSS

## Install

1.  `git clone https://github.com/yarnaimo/vscode-explorer-colorizer.git`
1.  拡張機能「Custom CSS and JS Loader」をインストールする
1.  settings.json に以下を追加 
    ```
    "vscode_custom_css.policy": true,
    "vscode_custom_css.imports": [
        "<cssのパス>"
    ]
    ```
    cssのパスの例
    - **Windows** `file:///C:/Users/me/dev/vscode-explorer-colorizer/main.css`
    - **Linux/macOS** `file:///Users/me/dev/vscode-explorer-colorizer/main.css`
1.  VSCode を管理者権限で再起動する (Linux/macOS の場合は[こちら](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css#mac-and-linux-users))
1.  コマンドパレット (Ctrl+Shift+P) で **Reload Custom CSS and JS** を実行する
1.  VSCode を再起動する (管理者権限は不要)
