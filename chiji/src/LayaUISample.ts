class GameMain{
	constructor(){
		GameWorld.init(Game,Laya.Browser.clientWidth,Laya.Browser.clientHeight);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;

		// Laya.Stat.show();
		// Laya.DebugPanel.init();
	}
}
new GameMain();