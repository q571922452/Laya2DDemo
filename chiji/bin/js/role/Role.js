var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.PF = Laya.Browser.window.PF;
        _this.intervalT = 100;
        _this.roleAni = new Laya.Animation();
        _this.roleAni.loadAtlas('res/atlas/head.atlas', Laya.Handler.create(_this, _this.loadRes));
        _this.pivot(16, 24);
        return _this;
    }
    //加载成功
    Role.prototype.loadRes = function () {
        console.log("加载资源成功");
        this.addChild(this.roleAni);
        //加载动画集
        Laya.Animation.createFrames(this.aniUrl('b', 0), 'b');
        Laya.Animation.createFrames(this.aniUrl('r', 0), 'r'); //左边
        Laya.Animation.createFrames(this.aniUrl('l', 0), 'l'); //右边
        Laya.Animation.createFrames(this.aniUrl('t', 0), 't');
        //end
        this.roleAni.interval = 100;
        this.nameTxt = new Laya.Text();
        this.nameTxt.text = '我就是我';
        this.addChild(this.nameTxt);
        this.finder = new this.PF.AStarFinder({ allowDiagonal: true });
        this.mapgrid = new this.PF.Grid(4800 / 25, 4800 / 25);
    };
    //返回地址
    Role.prototype.aniUrl = function (name, startIndex) {
        var urls = []; //地址集
        for (var i = 0; i < 4; i++) {
            urls.push("../laya/assets/head/" + name + i + '.png');
        }
        return urls;
    };
    //移动到某个位置 播放动作
    Role.prototype.runToWhere = function (x, y, state, time) {
        if (!this.p)
            this.p = this.parent;
        this.runComplete();
        this.roleAni.play(0, true, state);
        this.stopX = this.x;
        this.stopY = this.y;
        var path = this.finder.findPath(this.x, this.y, x, y, this.mapgrid);
        // Laya.Tween.to(this,{x:-x,y:-y},time,null,Laya.Handler.create(this,this.runComplete));
        Laya.timer.loop(this.intervalT, this, this.moveRole, [x, y, time], true);
    };
    Role.prototype.moveRole = function (x, y, t) {
        this.tt += this.intervalT;
        var unitx = (x - this.stopX) / (t / this.intervalT);
        var unity = (y - this.stopY) / (t / this.intervalT);
        if (this.tt > t) {
            Laya.timer.clearAll(this);
            this.stopRun();
            return;
        }
        var num = this.p.getTileDataByScreenPos(this.x + unitx, this.y + unity);
        if (num != 30 && num != 15 && num != 10) {
            this.stopRun();
            return;
        }
        ;
        this.x += unitx;
        this.y += unity;
        // console.log(this.x,this.y,x,y,'-----',unitx,unity,t);
    };
    Role.prototype.stopRun = function () {
        this.roleAni.stop();
    };
    Role.prototype.runComplete = function () {
        Laya.Tween.clearAll(this);
        this.stopRun();
        this.tt = 0;
    };
    return Role;
}(Laya.GridSprite));
//# sourceMappingURL=Role.js.map