var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JoystickView = (function (_super) {
    __extends(JoystickView, _super);
    function JoystickView(model) {
        var _this = _super.call(this) || this;
        _this.jsModel = model;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, _this, _this.downImg);
        _this.initView();
        return _this;
    }
    /**
     * 初始化界面
     */
    JoystickView.prototype.initView = function () {
        this.initX = Laya.Browser.width / 2;
        this.initY = Laya.Browser.height / 2;
    };
    //按下
    JoystickView.prototype.downImg = function (e) {
    };
    return JoystickView;
}(ui.main.JoystickUI));
//# sourceMappingURL=JoystickView.js.map