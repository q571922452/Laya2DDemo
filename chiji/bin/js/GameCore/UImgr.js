var UImgr = (function () {
    function UImgr() {
        this.objList = []; //对象列表
        UImgr.instance = this;
    }
    //
    UImgr.prototype.addUI = function (view, top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        if (left === void 0) { left = 0; }
        if (view)
            Laya.stage.addChild(view);
        view.dataSource = { top: top, right: right, bottom: bottom, left: left };
    };
    //
    UImgr.prototype.removeUI = function (view) {
        view.dataSource = null;
        Laya.stage.removeChild(view);
        // this.map.removeChild(view);
    };
    //添加对象到场景
    UImgr.prototype.addObject = function (obj) {
        if (obj) {
            Laya.stage.addChild(obj);
            this.objList.push(obj);
        }
    };
    UImgr.prototype.removeObj = function (obj) {
        for (var i = 0; i < this.objList.length; i++) {
            if (this.objList[i] && obj && this.objList[i] == obj) {
                Laya.stage.removeChild(obj);
            }
        }
        console.log('没有当前对象');
    };
    return UImgr;
}());
//# sourceMappingURL=UImgr.js.map