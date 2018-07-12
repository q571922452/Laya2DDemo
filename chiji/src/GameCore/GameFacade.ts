/**
 * name
 */
module gamefacede{
    class gameFacede{
        private static medDic:Object = new Object();//mediator
        public static comModel:Object = new Object();//model
        public static registerMediator(med:GameMediator):void{
            if(this.medDic[med.name]) return;
            this.medDic[med.name] = med;
        }
        public static registerComModel(model:GameModel):void{
            if(this.comModel[model.name]) return;
            this.comModel[model.name] = model;
        }
        public static sendReq(ReqName:string,meds:Array<string>,args?:Array<any>):void{
            var med:GameMediator;
            if(meds){
                for(var i = 0; i< meds.length; i++){
                    med = this.medDic[meds[i]]
                    if(med) med.accpetReq(ReqName,args);
                }
            }
        }
    }
    export class Facade{
        public static registerMediator(med:GameMediator):void{
            gameFacede.registerMediator(med);
        }
        public static registerComModel(model:GameModel):void{
            gameFacede.registerComModel(model);
        }
    }
    // mediator模板
    export class GameMediator{
        private _name:string;
        private model:Object;
        constructor(name:string,models?:Array<GameModel>){
            this._name = name;
            this.model = new Object();
            if(models){
                for(var i = 0; i < models.length; i++){
                    var item = models[i];
                    this.model[item.name] = item;
                }
            }
        }
        get name():string{
            return this._name;
        }
        //需要复写
        public accpetReq(ReqName:string,args?:Array<any>):void{
        }

        public sendReq(ReqName:string,meds:Array<string>,args?:Array<any>):void{
            gameFacede.sendReq(ReqName,meds,args);
        }
        public getmodel(name:string):GameModel{
            return this.model[name];
        }
        public getCommodel(name:string):GameModel{
            return gameFacede.comModel[name];
        }

    }
    //model  模板
    export class GameModel{
        private _modelname:string;
        // private _models:Object;
        constructor(name:string){
            this._modelname = name;
        }
        // public getmodel(name:string):GameModel{
        //     return this._models[name];
        // }
        public getCommodel(name:string):GameModel{
            return gameFacede.comModel[name];
        }
        get name():string{
            return this._modelname;
        }
    }
}