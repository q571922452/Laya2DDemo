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

    public radius:number; //半径
    private jsModel:JoystickModel;//
    constructor(model:JoystickModel){
        super();
        this.jsModel = model;
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.downImg);
        this.initView();
    }
    /**
     * 初始化界面
     */
    private initView():void{
        this.initX = this.width / 2;
        this.initY = this.height / 2;
        this.touchId = -1;
        this.radius = 51;
        this.curPos = new Laya.Point();

        this.on(Laya.Event.MOUSE_DOWN,this,this.downImg);
        this.on(Laya.Event.MOUSE_MOVE,this,this.moveImg);
        this.on(Laya.Event.MOUSE_UP,this,this.upImg);
        this.on(Laya.Event.MOUSE_OUT,this,this.upImg);
    }
    
    //按下
    private downImg(e:Laya.Event):void{
        if(this.touchId == -1){
            this.touchId = e.touchId;

            if(this.tweener !=null){
            this.tweener.clear();
            this.tweener = null;
            }
            this.startX = this.width / 2;
            this.startY = this.height / 2;
            this.lastX = this.width / 2;
            this.lastY = this.height / 2;
            var rad:number = this.joystickRad();

            this.event(JoystickEvent.MOVE_ROLE,rad);

        }


        
        // console.log(rad+"=========");
        // this.jsModel.setDir(rad);

        // Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        // Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        // Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    }
    private deltaDegree:number = -1000;
    //移动
    private moveImg(e:Laya.Event):void{
        if(this.touchId != -1 && e.touchId == this.touchId){
            var rad:number = this.joystickRad();
            if(Math.abs(rad - this.deltaDegree) > 0.2){
                this.deltaDegree = rad;
                console.log(this.deltaDegree+' --------- --------- ');
            }
        }
    }
    //弹起
    private upImg(e:Laya.Event):void{
        if(this.touchId != -1 && e.touchId == this.touchId){
            this.touchId = -1;
            this.deltaDegree = -1000;
            this.joystickImg.x = this.width / 2;
            this.joystickImg.y = this.height / 2;
            this.tweener = Laya.Tween.to(this.joystickImg, {x: this.initX, y: this.initY},200, Laya.Ease.circOut,
                            Laya.Handler.create(this, function(): void {this.tweener = null;}));
       
        }
    }

    private joystickRad():number {
        this.curPos = this.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY), false);
        var bx:number = this.curPos.x;
        var by:number = this.curPos.y;
        var movex:number = bx - this.lastX;
        var movey:number = by - this.lastY;
        this.lastX = bx;
        this.lastY = by;
        var joystickx:number = this.joystickImg.x + movex;
        var joysticky:number = this.joystickImg.y + movey;

        var offsetx:number = joystickx - this.startX;
        var offsety:number = joysticky - this.startY;

        var rad:number = Math.atan2(offsety, offsetx);
        var maxx:number = this.radius * Math.cos(rad);
        var maxy:number = this.radius * Math.sin(rad);
        if (Math.abs(offsetx) > Math.abs(maxx)) {
            offsetx = maxx;
        }
        if (Math.abs(offsety) > Math.abs(maxy)) {
            offsety = maxy;
        }

        joystickx = this.startX + offsetx;
        joysticky = this.startY + offsety;
        this.joystickImg.x = joystickx;
        this.joystickImg.y = joysticky;
        
        return rad;
    }

}