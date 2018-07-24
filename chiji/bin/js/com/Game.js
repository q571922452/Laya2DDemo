var Game = (function () {
    function Game() {
        this.configRes = "config/config.json";
        //这里用来初始化网络
        // console.log("初始化网络");
        this.initNET();
    }
    //初始化网络
    Game.prototype.initNET = function () {
        this.loadRes();
    };
    //注册
    Game.prototype.registerAll = function () {
        console.log("加载ui资源完成");
        new UImgr(); //初始化ui
        gamefacede.Facade.registerMediator(new Scene());
        // this.loadRes();
    };
    //加载资源
    Game.prototype.loadRes = function () {
        Laya.loader.load([{ url: this.configRes, type: Laya.Loader.JSON }], Laya.Handler.create(this, this.preLoadJsonCompelete));
    };
    //加载资源成功
    Game.prototype.preLoadJsonCompelete = function () {
        var arr2d = Laya.loader.getRes(this.configRes);
        Laya.loader.load(arr2d, Laya.Handler.create(this, this.registerAll));
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map