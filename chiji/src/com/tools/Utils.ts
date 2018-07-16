class Utils{
    constructor(){

    }
    //返回方向 t:上 r:右 b:下 l:左
    public static getDirection(nowX:number,nowY:number,targetX:number,targetY:number):string{
        var state:string;
        if(nowX == targetX)
            state = targetY >= nowY?'t':'b';
        else if(nowY == targetY)
            state = targetX >= nowX?'r':'l';
        else{
            if(Math.abs(targetX - nowX)>=Math.abs(targetY - nowY))
                state = targetX>=nowX?'r':'l';
            else
                state = targetY>=nowY?'b':'t';
        }
        return state;
    }
    //返回runTime
    public static getTime(nowX:number,nowY:number,targetX:number,targetY:number):number{
        var px = targetX - nowX;
        var py = targetY - nowY;
        var pathLenght = Math.sqrt(Math.pow(px,2)+Math.pow(py,2));
        // console.log(pathLenght);
        return pathLenght/(4800/150)*1000;
    }
}