var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.bUrls = [];
        _this.roleAni = new Laya.Animation();
        _this.roleAni.loadAtlas('res/atlas/head.atlas', Laya.Handler.create(_this, _this.loadRes));
        _this.pivot(16, 24);
        return _this;
    }
    //加载成功
    Role.prototype.loadRes = function () {
        console.log("加载资源成功");
        // Laya.stage.addChild(this.roleAni);
        this.addChild(this.roleAni);
        //加载动画集
        Laya.Animation.createFrames(this.aniUrl('b', 0), 'b');
        Laya.Animation.createFrames(this.aniUrl('r', 0), 'r'); //左边
        Laya.Animation.createFrames(this.aniUrl('l', 0), 'l'); //右边
        Laya.Animation.createFrames(this.aniUrl('t', 0), 't');
        //end
        this.roleAni.interval = 100;
    };
    //返回地址
    Role.prototype.aniUrl = function (name, startIndex) {
        var urls = []; //地址集
        for (var i = 0; i < 4; i++) {
            urls.push("../laya/assets/head/" + name + i + '.png');
        }
        return urls;
    };
    //移动到某个位置
    Role.prototype.runToWhere = function (x, y, state, time) {
        this.runComplete();
        this.roleAni.play(0, true, state);
        // Laya.Tween.to(this,{x:x,y:y},time,null,Laya.Handler.create(this,this.runComplete));
    };
    Role.prototype.stopRun = function () {
        this.roleAni.stop();
    };
    Role.prototype.runComplete = function () {
        Laya.Tween.clearAll(this);
        this.stopRun();
    };
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map