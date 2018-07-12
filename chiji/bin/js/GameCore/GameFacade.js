/**
 * name
 */
var gamefacede;
(function (gamefacede) {
    var gameFacede = (function () {
        function gameFacede() {
        }
        gameFacede.registerMediator = function (med) {
            if (this.medDic[med.name])
                return;
            this.medDic[med.name] = med;
        };
        gameFacede.registerComModel = function (model) {
            if (this.comModel[model.name])
                return;
            this.comModel[model.name] = model;
        };
        gameFacede.sendReq = function (ReqName, meds, args) {
            var med;
            if (meds) {
                for (var i = 0; i < meds.length; i++) {
                    med = this.medDic[meds[i]];
                    if (med)
                        med.accpetReq(ReqName, args);
                }
            }
        };
        return gameFacede;
    }());
    gameFacede.medDic = new Object(); //mediator
    gameFacede.comModel = new Object(); //model
    var Facade = (function () {
        function Facade() {
        }
        Facade.registerMediator = function (med) {
            gameFacede.registerMediator(med);
        };
        Facade.registerComModel = function (model) {
            gameFacede.registerComModel(model);
        };
        return Facade;
    }());
    gamefacede.Facade = Facade;
    // mediator模板
    var GameMediator = (function () {
        function GameMediator(name, models) {
            this._name = name;
            this.model = new Object();
            if (models) {
                for (var i = 0; i < models.length; i++) {
                    var item = models[i];
                    this.model[item.name] = item;
                }
            }
        }
        Object.defineProperty(GameMediator.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        //需要复写
        GameMediator.prototype.accpetReq = function (ReqName, args) {
        };
        GameMediator.prototype.sendReq = function (ReqName, meds, args) {
            gameFacede.sendReq(ReqName, meds, args);
        };
        GameMediator.prototype.getmodel = function (name) {
            return this.model[name];
        };
        GameMediator.prototype.getCommodel = function (name) {
            return gameFacede.comModel[name];
        };
        return GameMediator;
    }());
    gamefacede.GameMediator = GameMediator;
    //model  模板
    var GameModel = (function () {
        // private _models:Object;
        function GameModel(name) {
            this._modelname = name;
        }
        // public getmodel(name:string):GameModel{
        //     return this._models[name];
        // }
        GameModel.prototype.getCommodel = function (name) {
            return gameFacede.comModel[name];
        };
        Object.defineProperty(GameModel.prototype, "name", {
            get: function () {
                return this._modelname;
            },
            enumerable: true,
            configurable: true
        });
        return GameModel;
    }());
    gamefacede.GameModel = GameModel;
})(gamefacede || (gamefacede = {}));
//# sourceMappingURL=GameFacade.js.map