class Scene extends gamefacede.GameMediator{
    public static NAME:string = "scene";
    constructor(){
        super(Scene.NAME,[]);
        this.createMap();
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.eventMove);
        // Laya.stage.on(Laya.Event.MOUSE_UP,this,this.savePoint);
    }
    /**
     * 接受外部消息
     */
    public accpetReq(ReqName:string,args?:Array<any>):void{
        switch(ReqName){
            case SceneEvent.ADD_UI:
                this.addUI(args);
                break;
            case SceneEvent.MOVE_ROLE:
                this.removeRole(args[0]);
                break;
            case SceneEvent.STOP_MOVE:
                this.stopMove();
        }
    }
    private _tiledMap:Laya.TiledMap;//当前地图
    public mX:number;
    public mY:number;

    private role:Role;//英雄

    private createMap():void{
        this.mX = this.mY = 0;
        this._tiledMap = new Laya.TiledMap();
        // this.tiledMap.autoCache = true;
        // this.tiledMap.autoCacheType = "normal";
        // this.tiledMap.antiCrack = true;
        this._tiledMap.createMap("res/map/map.json", new Laya.Rectangle(0,0,Laya.Browser.width/2,Laya.Browser.height/2),new Laya.Handler(this,this.completeHandler));
        
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.moveRole);
    }
    private zd:any;//阻挡
    private _map0:Laya.MapLayer;
    //成功加载
    private completeHandler():void{

        Laya.stage.on(Laya.Event.RESIZE,this,this.resize);
        this.resize();
        this.role = new Role();
        // Laya.stage.addChild(this.role);
        this._map0 = this._tiledMap.getLayerByIndex(0);
        this._map0.addChild(this.role);
        this._map0.showGridSprite(this.role);
        this.role.x = Laya.Browser.width/2;
        this.role.y = Laya.Browser.height/2;

        this.registerMed();
    }
    /**
     * 注册Med
     */
    private registerMed():void{
        gamefacede.Facade.registerMediator(new JoystickMediator());
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
        this._tiledMap.moveViewPort(this.mX + (Laya.stage.mouseX-this.downX),this.mY + (Laya.stage.mouseY-this.downY));
    }
    private resize():void{
        this._tiledMap.changeViewPort(this.mX,this.mY,Laya.Browser.width,Laya.Browser.height);
    }
    private time:number = 0;//移动时间
    
    private intervalT:number = 10;
    //存储地图块
    private tileTexS:Laya.TileTexSet[] = [];
    private tts:any[] = [];
    
    //移动角色
    private moveRole(e:Laya.Event):void{
        if(!(e.target instanceof Laya.Stage)) return;
        var kNum:number = this._tiledMap.numColumnsTile * this._tiledMap.numRowsTile;
        var po = this.role.globalToLocal(new Laya.Point(e.target.mouseX,e.target.mouseY),false);
        var pa = this.role.globalToLocal(new Laya.Point(this._tiledMap.x,this._tiledMap.y),false);
        // var aaa = this._tiledMap.getTileProperties(1,1,'zd');
        // var bbb = this._tiledMap.getMapProperties('zd');
        // var p0 = this.map0.getTilePositionByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // var p1 = this.map0.getTileDataByScreenPos(e.currentTarget.mouseX,e.currentTarget.mouseY);
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
        this.time = 0;
        var state = Utils.getDirection(this.role.x,this.role.y,e.currentTarget.mouseX,e.currentTarget.mouseY);
        var t = Utils.getTime(this.role.x,this.role.y,e.currentTarget.mouseX,e.currentTarget.mouseY);
        this.role.runToWhere(e.currentTarget.mouseX,e.currentTarget.mouseY,state,t);
        // Laya.timer.loop(this.intervalT,this,this.moveView,[t,e.currentTarget.mouseX-this.role.x,e.currentTarget.mouseY-this.role.y]);
        // this.tiledMap.moveViewPort(e.currentTarget.mouseX,e.currentTarget.mouseY);
        // this.tweenView(e.currentTarget.mouseX-this.tiledMap.x,e.currentTarget.mouseY-this.tiledMap.y,t);
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
        this._tiledMap.moveViewPort(this.mX+unitx,this.mY+unity);
        this.mX += unitx;
        this.mY += unity;
    }
    private tweenView(x:number,y:number,t:number):void{
        Laya.Tween.to(this._tiledMap,{x:x,y:x},t,null,Laya.Handler.create(this,this.createTween))
    }
    private createTween():void{
        Laya.Tween.clearAll(this._tiledMap);
    }
    //添加摇杆
    private addUI(arg:any):void{
        if(arg && arg[0]){
            this._map0.addChild(arg[0]);
            this._map0.showGridSprite(arg[0]);
            (arg[0] as JoystickView).top = Laya.Browser.height-(arg[0] as JoystickView).height;
        }
    }
    private lastX:number;
    private lastY:number;
    //移动人物
    private removeRole(rad:any):void{
        var p = this.role.removeRole(rad);
        this.lastX = this.mX;
        this.lastY = this.mY;
        var p1:Laya.Point = this.role.globalToLocal(p,false);
        this.changeViewPortXY(p1.x,p1.y);
    }
    //修改mx
    private changeViewPortXY(x:number,y:number):void{
        var t = Utils.getTime(this.role.x,this.role.y,x,y);
        this.tt = 0;
        Laya.timer.loop(100,this,this.setmXmY,[x,y,t],true);
    }
    private tt:number = 0;//时间
    private setmXmY(x:number,y:number,t:number):void{
        this.tt += 100;
        var unitx:number = (x-this.lastX)/(t/100);
        var unity:number = (y-this.lastY)/(t/100);
        if(this.tt > t){
            Laya.timer.clearAll(this);
            return;
        }
        this.mX += unitx;
        this.mY += unity;
        this._tiledMap.moveViewPort(this.mX,this.mY);
        console.log(this.mX,this.mY,'this is viewPort');
    }
    private stopMove():void{
        this.role.stopRun();
        Laya.timer.clearAll(this);
    }
}