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
        UImgr.instance.addUI(this.joystick,0,0,10,0);
    }
}