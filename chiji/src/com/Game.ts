class Game{
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
        
    }
}