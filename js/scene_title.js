/*
 *　タイトル
 */
var createTitleScene = function() {
	var scene = new Scene();
		
		//scene.backgroundColor = BACKGROUND_COLLOR;      // シーンの背景色を設定
		
		var startImage = new Sprite(300, 100);  //スタート画像のスプライト
		
		startImage.image = global.game.assets[IMAGE_START];  
		
		startImage.x = SCREEN_WIDTH / 2;	// 横位置調整
		startImage.y = SCREEN_HEIGHT /2;	// 縦位置調整  

		scene.addChild(startImage);                  // シーンにラベルに追加
		
		console.log(10);
		
		
		startImage.addEventListener(Event.TOUCH_START, function(e) { // シーンにタッチイベントを設定
			
			
		console.log(2);
		//global.game.replaceScene(createGameScene());
    });
	return scene;
};


/*
 *　ゲームオーバー
 */
var createGameoverScene = function() {
	var scene = new Scene();

	// 色々処理を書いてください

	return scene;
};
