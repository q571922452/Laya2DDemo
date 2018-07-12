class Role extends Laya.GridSprite{ 
    private roleAni:Laya.Animation;
    private nameTxt:Laya.Text;//名字
    private PF:any = Laya.Browser.window.PF;
    private finder:any;
    private mapgrid:any;
    constructor(){
        super();
        this.roleAni = new Laya.Animation();
        this.roleAni.loadAtlas('res/atlas/head.atlas',Laya.Handler.create(this,this.loadRes));
        this.pivot(16,24);
    }
    //加载成功
    private loadRes():void{
        console.log("加载资源成功");
        this.addChild(this.roleAni);
        //加载动画集
        Laya.Animation.createFrames(this.aniUrl('b',0),'b');
        Laya.Animation.createFrames(this.aniUrl('r',0),'r');//左边
        Laya.Animation.createFrames(this.aniUrl('l',0),'l');//右边
        Laya.Animation.createFrames(this.aniUrl('t',0),'t');
        //end
        this.roleAni.interval = 100;
        this.nameTxt = new Laya.Text();
        this.nameTxt.text = '我就是我'
        this.addChild(this.nameTxt);

        // this.finder = new this.PF.AStarFinder({allowDiagonal: true});
        
        // this.mapgrid = new this.PF.Grid(4800/25,4800/25);
    }
    //初始化数据
    public initData(mapdata:Laya.TiledMap):void{
        if(!this.p)this.p = this.parent as Laya.MapLayer;
        this.finder = new this.PF.AStarFinder({allowDiagonal: true});
        // this.p.get
        mapdata.numColumnsTile;
        mapdata.numRowsTile;
        var numX = mapdata.width/mapdata.numColumnsTile;
        var numY = mapdata.height/mapdata.numRowsTile;
        this.mapgrid = new this.PF.Grid(numX,numY);
        var i:number;var j:number;var value:number;
        // for(){

        // }

    }

    //返回地址
    private aniUrl(name:string,startIndex?:number):any{
        var urls:any = [];//地址集
        for(var i:number = 0; i < 4; i++){
            urls.push("../laya/assets/head/"+name+i+'.png');
        }
        return urls;
    }
    private tt:number;
    private intervalT:number = 100;
    private stopX:number;
    private stopY:number;
    //移动到某个位置 播放动作
    public runToWhere(x:number,y:number,state:string,time?:number):void{
        this.runComplete();
        this.roleAni.play(0,true,state);
        this.stopX = this.x;
        this.stopY = this.y;
        var path:Array<any> = this.finder.findPath(this.x,this.y,x,y,this.mapgrid);
        // Laya.Tween.to(this,{x:-x,y:-y},time,null,Laya.Handler.create(this,this.runComplete));
        Laya.timer.loop(this.intervalT,this,this.moveRole,[x,y,time],true);
    }
    private p:Laya.MapLayer;//父对象
    private moveRole(x:number,y:number,t:number):void{
        this.tt += this.intervalT;
        var unitx:number = (x-this.stopX)/(t/this.intervalT);
        var unity:number = (y-this.stopY)/(t/this.intervalT);
        if(this.tt > t){
            Laya.timer.clearAll(this);
            this.stopRun();
            return;
        }
        var num = this.p.getTileDataByScreenPos(this.x+unitx,this.y+unity);
        if(num != 30 && num != 15 && num != 10) {
            this.stopRun();
            return;
        };
        this.x += unitx;
        this.y += unity;
        // console.log(this.x,this.y,x,y,'-----',unitx,unity,t);
    }
    public stopRun():void{
        this.roleAni.stop();
    }
    private runComplete():void{
        Laya.Tween.clearAll(this);
        this.stopRun();
        this.tt = 0;
    }

}