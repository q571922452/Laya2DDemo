var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this, Scene.NAME, []) || this;
        _this.time = 0; //移动时间
        _this.intervalT = 10;
        //存储地图块
        _this.tileTexS = [];
        _this.tts = [];
        _this.tt = 0; //时间
        _this.createMap();
        return _this;
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.eventMove);
        // Laya.stage.on(Laya.Event.MOUSE_UP,this,this.savePoint);
    }
    /**
     * 接受外部消息
     */
    Scene.prototype.accpetReq = function (ReqName, args) {
        switch (ReqName) {
            case SceneEvent.ADD_UI:
                this.addUI(args);
                break;
            case SceneEvent.MOVE_ROLE:
                this.removeRole(args[0]);
                break;
            case SceneEvent.STOP_MOVE:
                this.stopMove();
        }
    };
    Scene.prototype.createMap = function () {
        this.mX = this.mY = 0;
        this._tiledMap = new Laya.TiledMap();
        // this.tiledMap.autoCache = true;
        // this.tiledMap.autoCacheType = "normal";
        // this.tiledMap.antiCrack = true;
        this._tiledMap.createMap("res/map/map.json", new Laya.Rectangle(0, 0, Laya.Browser.width / 2, Laya.Browser.height / 2), new Laya.Handler(this, this.completeHandler));
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.moveRole);
    };
    //成功加载
    Scene.prototype.completeHandler = function () {
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        this.resize();
        this.role = new Role();
        // Laya.stage.addChild(this.role);
        this._map0 = this._tiledMap.getLayerByIndex(0);
        this._map0.addChild(this.role);
        this._map0.showGridSprite(this.role);
        this.role.x = Laya.Browser.width / 2;
        this.role.y = Laya.Browser.height / 2;
        this.registerMed();
    };
    /**
     * 注册Med
     */
    Scene.prototype.registerMed = function () {
        gamefacede.Facade.registerMediator(new JoystickMediator());
    };
    //出发移动监听
    Scene.prototype.eventMove = function () {
        this.downX = Laya.stage.mouseX;
        this.downY = Laya.stage.mouseY;
        // this.tiledMap.changeViewPort(100,100,Laya.Browser.width,Laya.Browser.height);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.moveMap);
    };
    Scene.prototype.savePoint = function () {
        this.mX = this.mX - (Laya.stage.mouseX - this.downX);
        this.mY = this.mY - (Laya.stage.mouseY - this.downY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.moveMap);
    };
    Scene.prototype.moveMap = function () {
        this._tiledMap.moveViewPort(this.mX + (Laya.stage.mouseX - this.downX), this.mY + (Laya.stage.mouseY - this.downY));
    };
    Scene.prototype.resize = function () {
        this._tiledMap.changeViewPort(this.mX, this.mY, Laya.Browser.width, Laya.Browser.height);
    };
    //移动角色
    Scene.prototype.moveRole = function (e) {
        if (!(e.target instanceof Laya.Stage))
            return;
        var kNum = this._tiledMap.numColumnsTile * this._tiledMap.numRowsTile;
        var po = this.role.globalToLocal(new Laya.Point(e.target.mouseX, e.target.mouseY), false);
        var pa = this.role.globalToLocal(new Laya.Point(this._tiledMap.x, this._tiledMap.y), false);
        // var aaa = this._tiledMap.getTileProperties(1,1,'zd');
        // var bbb = this._tiledMap.getMapProperties('zd');
        // var p0 = this.map0.getTilePositionByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // var p1 = this.map0.getTileDataByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // var b = this.tiledMap.getLayerObject('Phy','zd');
        // for(var i = 0; i < kNum; ++i){
        //     if(this.tiledMap.getTexture(i)){
        //         this.tileTexS.push(this.tiledMap.getTexture(i));
        //         // this.tts.push(this.tiledMap.getTileProperties(1,this.tiledMap.getTexture(i).gid,'zd'));
        //     }
        // }
        // for(var x = 0; x < this.tiledMap.numColumnsTile; ++x){
        //     for(var y = 0; y < this.tiledMap.numRowsTile; ++y){
        //         if(this.map0.getTileData(x,y) && this.map0.getTileData(x,y) > 30)
        //             this.tts.push({value:this.map0.getTileData(x,y),x:x,y:y});
        //     }
        // }
        this.time = 0;
        var state = Utils.getDirection(this.role.x, this.role.y, e.currentTarget.mouseX, e.currentTarget.mouseY);
        var t = Utils.getTime(this.role.x, this.role.y, e.currentTarget.mouseX, e.currentTarget.mouseY);
        this.role.runToWhere(e.currentTarget.mouseX, e.currentTarget.mouseY, state, t);
        // Laya.timer.loop(this.intervalT,this,this.moveView,[t,e.currentTarget.mouseX-this.role.x,e.currentTarget.mouseY-this.role.y]);
        // this.tiledMap.moveViewPort(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // this.tweenView(e.currentTarget.mouseX-this.tiledMap.x,e.currentTarget.mouseY-this.tiledMap.y,t);
        // var viewX = e.currentTarget.mouseX - Laya.Browser.width/2;
        // var viewY = e.currentTarget.mouseY - Laya.Browser.height/2;
        // this.tiledMap.moveViewPort(viewX,viewY);
    };
    Scene.prototype.moveView = function (t, x, y) {
        //这里需要检查是否有阻挡
        //
        this.time += this.intervalT;
        var unitx = x / (t / this.intervalT);
        var unity = y / (t / this.intervalT);
        if (this.time >= t) {
            Laya.timer.clearAll(this);
            this.role.stopRun();
            return;
        }
        ;
        this._tiledMap.moveViewPort(this.mX + unitx, this.mY + unity);
        this.mX += unitx;
        this.mY += unity;
    };
    Scene.prototype.tweenView = function (x, y, t) {
        Laya.Tween.to(this._tiledMap, { x: x, y: x }, t, null, Laya.Handler.create(this, this.createTween));
    };
    Scene.prototype.createTween = function () {
        Laya.Tween.clearAll(this._tiledMap);
    };
    //添加摇杆
    Scene.prototype.addUI = function (arg) {
        if (arg && arg[0]) {
            this._map0.addChild(arg[0]);
            this._map0.showGridSprite(arg[0]);
            arg[0].top = Laya.Browser.height - arg[0].height;
        }
    };
    //移动人物
    Scene.prototype.removeRole = function (rad) {
        var p = this.role.removeRole(rad);
        this.lastX = this.mX;
        this.lastY = this.mY;
        var p1 = this.role.globalToLocal(p, false);
        this.changeViewPortXY(p1.x, p1.y);
    };
    //修改mx
    Scene.prototype.changeViewPortXY = function (x, y) {
        var t = Utils.getTime(this.role.x, this.role.y, x, y);
        this.tt = 0;
        Laya.timer.loop(100, this, this.setmXmY, [x, y, t], true);
    };
    Scene.prototype.setmXmY = function (x, y, t) {
        this.tt += 100;
        var unitx = (x - this.lastX) / (t / 100);
        var unity = (y - this.lastY) / (t / 100);
        if (this.tt > t) {
            Laya.timer.clearAll(this);
            return;
        }
        this.mX += unitx;
        this.mY += unity;
        this._tiledMap.moveViewPort(this.mX, this.mY);
        console.log(this.mX, this.mY, 'this is viewPort');
    };
    Scene.prototype.stopMove = function () {
        this.role.stopRun();
        Laya.timer.clearAll(this);
    };
    return Scene;
}(gamefacede.GameMediator));
Scene.NAME = "scene";
//# sourceMappingURL=Scene.js.map