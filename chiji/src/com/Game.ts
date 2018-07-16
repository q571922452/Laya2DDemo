class Game{
    private configRes:string = "config/config.json";
    constructor(){
        //这里用来初始化网络
        // console.log("初始化网络");
        this.initNET();
    }
    //初始化网络
    private initNET():void{

        this.registerAll();
    }
    //注册
    private registerAll():void{
        new UImgr();//初始化ui
        
        gamefacede.Facade.registerMediator(new Scene());
        gamefacede.Facade.registerMediator(new JoystickMediator());
    }
    //加载资源
    private loadRes():void{
        Laya.loader.load([{url:this.configRes,type:Laya.Loader.JSON}],Laya.Handler.create(this,this.preLoadJsonCompelete));
    }
    //加载资源成功
    private preLoadJsonCompelete():void{
        var arr2d:any = Laya.loader.getRes("res/atlas/GameUI/main.atlas");
        Laya.loader.load(arr2d,Laya.Handler.create(this,this.onPre2DLoaded))
    }
    //
    private onPre2DLoaded():void{
        console.log("资源加载成功~~~~~~~~~~~~");
    }
}