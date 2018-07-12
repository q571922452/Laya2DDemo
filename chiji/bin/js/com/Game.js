var Game = (function () {
    function Game() {
        //这里用来初始化网络
        // console.log("初始化网络");
        this.initNET();
    }
    //初始化网络
    Game.prototype.initNET = function () {
        this.registerAll();
    };
    //注册
    Game.prototype.registerAll = function () {
        new UImgr(); //初始化ui
        gamefacede.Facade.registerMediator(new Scene());
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map