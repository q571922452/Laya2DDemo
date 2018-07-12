var GameWorld = (function () {
    function GameWorld() {
    }
    GameWorld.init = function (gameMain, gameWidth, gameHeight) {
        Laya.init(gameWidth, gameHeight);
        //系统层
        new gameMain();
    };
    return GameWorld;
}());
//# sourceMappingURL=GameWorld.js.map