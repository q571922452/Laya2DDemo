class Scene extends gamefacede.GameMediator{
    public static NAME:string = "scene";
    constructor(){
        super(Scene.NAME,[]);
        this.createMap();
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.eventMove);
        // Laya.stage.on(Laya.Event.MOUSE_UP,this,this.savePoint);
    }

    private tiledMap:Laya.TiledMap;//当前地图
    private mX:number;
    private mY:number;

    private role:Role;//英雄

    private createMap():void{
        this.mX = this.mY = 0;
        this.tiledMap = new Laya.TiledMap();
        // this.tiledMap.autoCache = true;
        // this.tiledMap.autoCacheType = "normal";
        // this.tiledMap.antiCrack = true;
        this.tiledMap.createMap("res/map/map.json", new Laya.Rectangle(0,0,Laya.Browser.width/2,Laya.Browser.height/2),new Laya.Handler(this,this.completeHandler));
        
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.moveRole);
    }
    private zd:any;//阻挡
    //成功加载
    private completeHandler():void{

        // Laya.stage.on(Laya.Event.RESIZE,this,this.resize);
        this.resize();
        // console.log(this.mX,this.mY);
        // console.log(this.tiledMap.height,this.tiledMap.width);
        this.role = new Role();
        // Laya.stage.addChild(this.role);
        this.map0 = this.tiledMap.getLayerByIndex(0);
        this.map0.addChild(this.role);
        this.map0.showGridSprite(this.role);
        // this.role.initData(this.tiledMap);
        // UImgr.instance.addObject(this.role);
        this.role.x = this.mX = Laya.Browser.width/2;
        this.role.y = this.mY = Laya.Browser.height/2;
        
    }

    private downX:number;
    private downY:number;
    //出发移动监听
    private eventMove():void{
        this.downX = Laya.stage.mouseX;
        this.downY = Laya.stage.mouseY;
        // this.tiledMap.changeViewPort(100,100,Laya.Browser.width,Laya.Browser.height);
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.moveMap);
    }
    private savePoint():void{
        this.mX = this.mX - (Laya.stage.mouseX - this.downX);
		this.mY = this.mY - (Laya.stage.mouseY - this.downY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.moveMap);
    }
    private moveMap():void{
        this.tiledMap.moveViewPort(this.mX + (Laya.stage.mouseX-this.downX),this.mY + (Laya.stage.mouseY-this.downY));
    }
    private resize():void{
        this.tiledMap.changeViewPort(this.mX,this.mY,Laya.Browser.width,Laya.Browser.height);
        // console.log(this.mX,this.mY,'-------')
    }
    private time:number = 0;//移动时间
    
    private intervalT:number = 10;
    //存储地图块
    private tileTexS:Laya.TileTexSet[] = [];
    private tts:any[] = [];
    private map0:Laya.MapLayer;
    //移动角色
    private moveRole(e:Laya.Event):void{
        var kNum:number = this.tiledMap.numColumnsTile * this.tiledMap.numRowsTile;
        // var p0 = this.map0.getTilePositionByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // var p1 = this.map0.getTileDataByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // console.log(p0,p1);
        // var b = this.tiledMap.getLayerObject('Phy','zd');
        // for(var i = 0; i < kNum; ++i){
        //     if(this.tiledMap.getTexture(i)){
        //         this.tileTexS.push(this.tiledMap.getTexture(i));
        //         // this.tts.push(this.tiledMap.getTileProperties(1,this.tiledMap.getTexture(i).gid,'zd'));
        //     }
        // }
        // for(var x = 0; x < this.tiledMap.numColumnsTile; ++x){
        //     for(var y = 0; y < this.tiledMap.numRowsTile; ++y){
        //         if(this.map0.getTileData(x,y) && this.map0.getTileData(x,y) > 30)
        //             this.tts.push({value:this.map0.getTileData(x,y),x:x,y:y});
        //     }
        // }
        // console.log(this.tileTexS,this.tts);
        this.time = 0;
        var state = Utils.getDirection(this.role.x,this.role.y,e.currentTarget.mouseX,e.currentTarget.mouseY);
        var t = Utils.getTime(this.role.x,this.role.y,e.currentTarget.mouseX,e.currentTarget.mouseY);
        // console.log(this.role.x,this.role.y,"------",e.currentTarget.mouseX,e.currentTarget.mouseY);
        this.role.runToWhere(e.currentTarget.mouseX,e.currentTarget.mouseY,state,t);
        // Laya.timer.loop(this.intervalT,this,this.moveView,[t,e.currentTarget.mouseX-this.role.x,e.currentTarget.mouseY-this.role.y]);
        // this.tiledMap.moveViewPort(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // this.tweenView(e.currentTarget.mouseX-this.tiledMap.x,e.currentTarget.mouseY-this.tiledMap.y,t);
        // console.log(e.currentTarget.mouseX,e.currentTarget.mouseY,Laya.Browser.width,Laya.Browser.height);
        // var viewX = e.currentTarget.mouseX - Laya.Browser.width/2;
        // var viewY = e.currentTarget.mouseY - Laya.Browser.height/2;
        // this.tiledMap.moveViewPort(viewX,viewY);
    }
    private moveView(t:number,x:number,y:number):void{
        //这里需要检查是否有阻挡

        //
        this.time += this.intervalT;
        var unitx:number = x/(t/this.intervalT);
        var unity:number = y/(t/this.intervalT);
        if(this.time >= t){
            Laya.timer.clearAll(this);
            this.role.stopRun();
            return;
        };
        this.tiledMap.moveViewPort(this.mX+unitx,this.mY+unity);
        this.mX += unitx;
        this.mY += unity;
        // console.log(this.tiledMap.viewPortX,this.tiledMap.viewPortX,unitx,unity,this.tiledMap.x+unitx,this.tiledMap.y+unity,'  '+this.time);
    }
    private tweenView(x:number,y:number,t:number):void{
        Laya.Tween.to(this.tiledMap,{x:x,y:x},t,null,Laya.Handler.create(this,this.createTween))
    }
    private createTween():void{
        Laya.Tween.clearAll(this.tiledMap);
    }
}