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
        _this.createMap();
        return _this;
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.eventMove);
        // Laya.stage.on(Laya.Event.MOUSE_UP,this,this.savePoint);
    }
    Scene.prototype.createMap = function () {
        this.mX = this.mY = 0;
        this.tiledMap = new Laya.TiledMap();
        // this.tiledMap.autoCache = true;
        // this.tiledMap.autoCacheType = "normal";
        // this.tiledMap.antiCrack = true;
        this.tiledMap.createMap("res/map/map.json", new Laya.Rectangle(0, 0, Laya.Browser.width / 2, Laya.Browser.height / 2), new Laya.Handler(this, this.completeHandler));
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.moveRole);
    };
    //成功加载
    Scene.prototype.completeHandler = function () {
        // Laya.stage.on(Laya.Event.RESIZE,this,this.resize);
        this.resize();
        console.log(this.mX, this.mY);
        this.role = new Role();
        // Laya.stage.addChild(this.role);
        this.map0 = this.tiledMap.getLayerByIndex(0);
        this.map0.addChild(this.role);
        this.map0.showGridSprite(this.role);
        // UImgr.instance.addObject(this.role);
        this.role.x = this.mX = Laya.Browser.width / 2;
        this.role.y = this.mY = Laya.Browser.height / 2;
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
        this.tiledMap.moveViewPort(this.mX + (Laya.stage.mouseX - this.downX), this.mY + (Laya.stage.mouseY - this.downY));
    };
    Scene.prototype.resize = function () {
        this.tiledMap.changeViewPort(this.mX, this.mY, Laya.Browser.width, Laya.Browser.height);
        console.log(this.mX, this.mY, '-------');
    };
    //移动角色
    Scene.prototype.moveRole = function (e) {
        var kNum = this.tiledMap.numColumnsTile * this.tiledMap.numRowsTile;
        // var p0 = this.map0.getTilePositionByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // var p1 = this.map0.getTileDataByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // console.log(p0,p1);
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
        // console.log(this.tileTexS,this.tts);
        this.time = 0;
        var state = Utils.getDirection(this.role.x, this.role.y, e.currentTarget.mouseX, e.currentTarget.mouseY);
        var t = Utils.getTime(this.role.x, this.role.y, e.currentTarget.mouseX, e.currentTarget.mouseY);
        // console.log(this.role.x,this.role.y,"------",e.currentTarget.mouseX,e.currentTarget.mouseY);
        this.role.runToWhere(e.currentTarget.mouseX, e.currentTarget.mouseY, state, t);
        // Laya.timer.loop(this.intervalT,this,this.moveView,[t,e.currentTarget.mouseX-this.role.x,e.currentTarget.mouseY-this.role.y]);
        // this.tiledMap.moveViewPort(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // this.tweenView(e.currentTarget.mouseX-this.tiledMap.x,e.currentTarget.mouseY-this.tiledMap.y,t);
        // console.log(e.currentTarget.mouseX,e.currentTarget.mouseY,Laya.Browser.width,Laya.Browser.height);
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
        this.tiledMap.moveViewPort(this.mX + unitx, this.mY + unity);
        this.mX += unitx;
        this.mY += unity;
        // console.log(this.tiledMap.viewPortX,this.tiledMap.viewPortX,unitx,unity,this.tiledMap.x+unitx,this.tiledMap.y+unity,'  '+this.time);
    };
    Scene.prototype.tweenView = function (x, y, t) {
        Laya.Tween.to(this.tiledMap, { x: x, y: x }, t, null, Laya.Handler.create(this, this.createTween));
    };
    Scene.prototype.createTween = function () {
        Laya.Tween.clearAll(this.tiledMap);
    };
    return Scene;
}(gamefacede.GameMediator));
Scene.NAME = "scene";
//# sourceMappingURL=Scene.js.map