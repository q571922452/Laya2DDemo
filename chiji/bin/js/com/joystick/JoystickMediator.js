var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JoystickMediator = (function (_super) {
    __extends(JoystickMediator, _super);
    function JoystickMediator() {
        var _this = _super.call(this, JoystickMediator.NAME, [new JoystickModel()]) || this;
        _this.joystickmodel = _this.getmodel(JoystickModel.NAME);
        _this.showPanel();
        return _this;
    }
    /**
     * 显示摇杆
     */
    JoystickMediator.prototype.showPanel = function () {
        this.joystick = new JoystickView(this.joystickmodel);
        this.joystick.on(JoystickEvent.MOVE_ROLE, this, this.moveRole);
        // UImgr.instance.addObject(this.joystick);
        this.sendReq(SceneEvent.ADD_UI, [Scene.NAME], [this.joystick]);
    };
    //移动人物
    JoystickMediator.prototype.moveRole = function (rad) {
        this.sendReq(SceneEvent.MOVE_ROLE, [Scene.NAME], [rad]);
    };
    return JoystickMediator;
}(gamefacede.GameMediator));
JoystickMediator.NAME = "JoystickMediator";
//# sourceMappingURL=JoystickMediator.js.map