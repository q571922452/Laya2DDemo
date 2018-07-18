var Utils = (function () {
    function Utils() {
    }
    //返回方向 t:上 r:右 b:下 l:左
    Utils.getDirection = function (nowX, nowY, targetX, targetY) {
        var state;
        if (nowX == targetX)
            state = targetY >= nowY ? 't' : 'b';
        else if (nowY == targetY)
            state = targetX >= nowX ? 'r' : 'l';
        else {
            if (Math.abs(targetX - nowX) >= Math.abs(targetY - nowY))
                state = targetX >= nowX ? 'r' : 'l';
            else
                state = targetY >= nowY ? 'b' : 't';
        }
        return state;
    };
    //返回runTime
    Utils.getTime = function (nowX, nowY, targetX, targetY) {
        var px = targetX - nowX;
        var py = targetY - nowY;
        var pathLenght = Math.sqrt(Math.pow(px, 2) + Math.pow(py, 2));
        // console.log(pathLenght);
        return pathLenght * 30;
    };
    /**
    * 在朝向上创建多个点，每个点相聚25像素
    *sx:起点x
    *sx:起点y
    *angle:朝向
    *segment:数量
    *distance：距离
    */
    Utils.createDirectPath = function (sx, sy, angle, segment, distance) {
        if (segment === void 0) { segment = 10; }
        if (distance === void 0) { distance = 15; }
        var path = [];
        var radian = angle * Math.PI / 180;
        for (var i = 1; i < segment; ++i) {
            var directX = sx;
            var directY = sy + distance * i;
            var targetX = -(directY - sy) * Math.sin(radian) + sx;
            var targetY = (directY - sy) * Math.cos(radian) + sy;
            path.push(targetX, targetY);
        }
        return path;
    };
    return Utils;
}());
//# sourceMappingURL=Utils.js.map