class JoystickMediator extends gamefacede.GameMediator{
    private static NAME:string = "JoystickMediator";
    constructor(){
        super(JoystickMediator.NAME,[new JoystickModel()]);
        this.joystickmodel = this.getmodel(JoystickModel.NAME) as JoystickModel;
        this.showPanel();
    }
    private joystickmodel:JoystickModel;

    private joystick:JoystickView;//摇杆
    /**
     * 显示摇杆
     */
    private showPanel():void{
        this.joystick = new JoystickView(this.joystickmodel);
        this.joystick.on(JoystickEvent.MOVE_ROLE,this,this.moveRole);
        this.joystick.on(JoystickEvent.STOP_ROLE,this,this.stopMove);
        // UImgr.instance.addObject(this.joystick);
        this.sendReq(SceneEvent.ADD_UI,[Scene.NAME],[this.joystick]);
    }
    //移动人物
    private moveRole(rad:number):void{
        this.sendReq(SceneEvent.MOVE_ROLE,[Scene.NAME],[rad]);
    }

    private stopMove():void{
        this.sendReq(SceneEvent.STOP_MOVE,[Scene.NAME],[]);
    }
}