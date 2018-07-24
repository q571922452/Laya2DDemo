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
        return pathLenght*30;
    }


    /**
	* 在朝向上创建多个点，每个点相聚25像素
	*sx:起点x
	*sx:起点y
	*angle:朝向
	*segment:数量
	*distance：距离
	*/	
	public static createDirectPath(sx:number,sy:number,angle:number,segment:number=10,distance:number=15):Array<number>
	{
		var path:Array<number>=[];
		var radian=angle*Math.PI/180;
		for(var i=1;i<segment;++i)
		{
			var directX:number = sx;
        	var directY:number = sy+distance*i;
            var targetX:number = -(directY-sy)*Math.sin(radian)+sx;
            var targetY:number = (directY-sy)*Math.cos(radian)+sy;
			path.push(targetX,targetY);
		}
        return path;
	}

}