var GameMain = (function () {
    function GameMain() {
        this.configRes = "config/config.json";
        GameWorld.init(Game, Laya.Browser.clientWidth, Laya.Browser.clientHeight);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        // Laya.Stat.show();
        // Laya.DebugPanel.init();
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaUISample.js.map