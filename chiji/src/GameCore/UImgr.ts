class UImgr{
    public static instance:UImgr;
    constructor(){
        UImgr.instance = this;
    }
    private objList:any = [];//对象列表
    //
    public addUI(view:laya.ui.Component,top:number = 0,right:number = 0,bottom:number = 0,left:number = 0):void{
        if(view) Laya.stage.addChild(view);
        view.dataSource = {top:top,right:right,bottom:bottom,left:left};
    }
    //
    public removeUI(view:laya.ui.Component):void{
        view.dataSource = null;
        Laya.stage.removeChild(view);
    }
    //添加对象到场景
    public addObject(obj:any):void{
        if(obj){
            Laya.stage.addChild(obj);
            this.objList.push(obj);
        }
    }
    
    public removeObj(obj:any):void{
        for(var i=0; i<this.objList.length; i++){
            if(this.objList[i] && obj && this.objList[i] == obj){
                Laya.stage.removeChild(obj);
            }
        }
        console.log('没有当前对象');
    }

}