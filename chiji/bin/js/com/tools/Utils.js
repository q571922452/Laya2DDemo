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
        return pathLenght * 10;
    };
    return Utils;
}());
//# sourceMappingURL=Utils.js.map