class JoystickView extends ui.main.JoystickUI{
    private initX:number; 
    private initY:number;
    private startX:number;
    private startY:number;
    private lastX:number;
    private lastY:number;
    private touchId:number;
    private tweener:Laya.Tween;  //缓动
    private curPos:Laya.Point;  //当前位置

    private jsModel:JoystickModel;//
    constructor(model:JoystickModel){
        super();
        this.jsModel = model;
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.downImg);
        this.initView();
    }
    /**
     * 初始化界面
     */
    private initView():void{
        this.initX = Laya.Browser.width/2;
        this.initY = Laya.Browser.height/2;
    }
    
    //按下
    private downImg(e:Laya.Event):void{

        
    }

}