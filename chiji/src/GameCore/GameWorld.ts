class GameWorld{
    constructor(){
    }
    public static init(gameMain:any,gameWidth:number,gameHeight:number):void{
        Laya.init(gameWidth,gameHeight);

        //系统层

        
        new gameMain();
    }
}