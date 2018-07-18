var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JoystickView = (function (_super) {
    __extends(JoystickView, _super);
    function JoystickView(model) {
        var _this = _super.call(this) || this;
        _this.deltaDegree = -1000;
        _this.jsModel = model;
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.downImg);
        _this.initView();
        return _this;
    }
    /**
     * 初始化界面
     */
    JoystickView.prototype.initView = function () {
        this.initX = this.width / 2;
        this.initY = this.height / 2;
        this.touchId = -1;
        this.radius = 51;
        this.curPos = new Laya.Point();
        this.on(Laya.Event.MOUSE_DOWN, this, this.downImg);
        this.on(Laya.Event.MOUSE_MOVE, this, this.moveImg);
        this.on(Laya.Event.MOUSE_UP, this, this.upImg);
        this.on(Laya.Event.MOUSE_OUT, this, this.upImg);
    };
    //按下
    JoystickView.prototype.downImg = function (e) {
        if (this.touchId == -1) {
            this.touchId = e.touchId;
            if (this.tweener != null) {
                this.tweener.clear();
                this.tweener = null;
            }
            this.startX = this.width / 2;
            this.startY = this.height / 2;
            this.lastX = this.width / 2;
            this.lastY = this.height / 2;
            var rad = this.joystickRad();
            this.event(JoystickEvent.MOVE_ROLE, rad);
        }
        // console.log(rad+"=========");
        // this.jsModel.setDir(rad);
        // Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        // Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        // Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    };
    //移动
    JoystickView.prototype.moveImg = function (e) {
        if (this.touchId != -1 && e.touchId == this.touchId) {
            var rad = this.joystickRad();
            if (Math.abs(rad - this.deltaDegree) > 0.2) {
                this.deltaDegree = rad;
                console.log(this.deltaDegree + ' --------- --------- ');
            }
        }
    };
    //弹起
    JoystickView.prototype.upImg = function (e) {
        if (this.touchId != -1 && e.touchId == this.touchId) {
            this.touchId = -1;
            this.deltaDegree = -1000;
            this.joystickImg.x = this.width / 2;
            this.joystickImg.y = this.height / 2;
            this.tweener = Laya.Tween.to(this.joystickImg, { x: this.initX, y: this.initY }, 200, Laya.Ease.circOut, Laya.Handler.create(this, function () { this.tweener = null; }));
        }
    };
    JoystickView.prototype.joystickRad = function () {
        this.curPos = this.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY), false);
        var bx = this.curPos.x;
        var by = this.curPos.y;
        var movex = bx - this.lastX;
        var movey = by - this.lastY;
        this.lastX = bx;
        this.lastY = by;
        var joystickx = this.joystickImg.x + movex;
        var joysticky = this.joystickImg.y + movey;
        var offsetx = joystickx - this.startX;
        var offsety = joysticky - this.startY;
        var rad = Math.atan2(offsety, offsetx);
        var maxx = this.radius * Math.cos(rad);
        var maxy = this.radius * Math.sin(rad);
        if (Math.abs(offsetx) > Math.abs(maxx)) {
            offsetx = maxx;
        }
        if (Math.abs(offsety) > Math.abs(maxy)) {
            offsety = maxy;
        }
        joystickx = this.startX + offsetx;
        joysticky = this.startY + offsety;
        this.joystickImg.x = joystickx;
        this.joystickImg.y = joysticky;
        return rad;
    };
    return JoystickView;
}(ui.main.JoystickUI));
//# sourceMappingURL=JoystickView.js.map