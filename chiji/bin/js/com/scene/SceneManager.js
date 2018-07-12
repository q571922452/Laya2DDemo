var SceneManager = (function () {
    function SceneManager() {
        this.time = 0; //移动时间
        this.intervalT = 10;
        this.createMap();
    }
    SceneManager.prototype.createMap = function () {
        this.mX = this.mY = 0;
        this.tiledMap = new Laya.TiledMap();
        this.tiledMap.createMap("res/map/map.json", new Laya.Rectangle(0, 0, Laya.Browser.width / 2, Laya.Browser.height / 2), new Laya.Handler(this, this.completeHandler));
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.moveRole);
    };
    //成功加载
    SceneManager.prototype.completeHandler = function () {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        this.resize();
        this.role = new Role();
        Laya.stage.addChild(this.role);
        this.role.x = this.mX = Laya.Browser.width / 2;
        this.role.y = this.mY = Laya.Browser.height / 2;
    };
    //出发移动监听
    SceneManager.prototype.eventMove = function () {
        this.downX = Laya.stage.mouseX;
        this.downY = Laya.stage.mouseY;
        // this.tiledMap.changeViewPort(100,100,Laya.Browser.width,Laya.Browser.height);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.moveMap);
    };
    SceneManager.prototype.savePoint = function () {
        this.mX = this.mX - (Laya.stage.mouseX - this.downX);
        this.mY = this.mY - (Laya.stage.mouseY - this.downY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.moveMap);
    };
    SceneManager.prototype.moveMap = function () {
        this.tiledMap.moveViewPort(this.mX + (Laya.stage.mouseX - this.downX), this.mY + (Laya.stage.mouseY - this.downY));
    };
    SceneManager.prototype.resize = function () {
        // console.log("11111111111111");
        this.tiledMap.changeViewPort(this.mX, this.mY, Laya.Browser.width, Laya.Browser.height);
    };
    //移动角色
    SceneManager.prototype.moveRole = function (e) {
        var o = this.tiledMap.getLayerObject("Physics", "zd0");
        this.time = 0;
        var state = Utils.getDirection(this.role.x, this.role.y, e.currentTarget.mouseX, e.currentTarget.mouseY);
        var t = Utils.getTime(this.role.x, this.role.y, e.currentTarget.mouseX, e.currentTarget.mouseY);
        this.role.runToWhere(e.currentTarget.mouseX, e.currentTarget.mouseY, state);
        Laya.timer.loop(this.intervalT, this, this.moveView, [t, e.currentTarget.mouseX - this.role.x, e.currentTarget.mouseY - this.role.y]);
        // this.tiledMap.moveViewPort(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // this.tweenView(e.currentTarget.mouseX-this.tiledMap.x,e.currentTarget.mouseY-this.tiledMap.y,t);
        // console.log(e.currentTarget.mouseX,e.currentTarget.mouseY,Laya.Browser.width,Laya.Browser.height);
        // var viewX = e.currentTarget.mouseX - Laya.Browser.width/2;
        // var viewY = e.currentTarget.mouseY - Laya.Browser.height/2;
        // this.tiledMap.moveViewPort(viewX,viewY);
    };
    SceneManager.prototype.moveView = function (t, x, y) {
        this.time += this.intervalT;
        var unitx = x / (t / this.intervalT);
        var unity = y / (t / this.intervalT);
        if (this.time >= t) {
            Laya.timer.clearAll(this);
            this.role.stopRun();
            return;
        }
        ;
        this.tiledMap.moveViewPort(this.mX + unitx, this.mY + unity);
        this.mX += unitx;
        this.mY += unity;
        console.log(this.tiledMap.viewPortX, this.tiledMap.viewPortX, unitx, unity, this.tiledMap.x + unitx, this.tiledMap.y + unity, '  ' + this.time);
    };
    SceneManager.prototype.tweenView = function (x, y, t) {
        Laya.Tween.to(this.tiledMap, { x: x, y: x }, t, null, Laya.Handler.create(this, this.hahah));
    };
    SceneManager.prototype.hahah = function () {
        Laya.Tween.clearAll(this.tiledMap);
    };
    return SceneManager;
}());
//# sourceMappingURL=SceneManager.js.map