/*
 *　タイトル
 */
var createTitleScene = function() {
	var scene = new Scene();
		
	//scene.backgroundColor = BACKGROUND_COLLOR;      // シーンの背景色を設定
		
	var startImage = new Sprite( SCREEN_WIDTH, SCREEN_HEIGHT );  //スタート画像のスプライト
		
	startImage.image = global.game.assets[ IMAGE_START ];  
		
	//startImage.x = SCREEN_WIDTH / 2;	// 横位置調整
	//startImage.y = SCREEN_HEIGHT /2;	// 縦位置調整  

	scene.addChild(startImage);                  // シーンにラベルに追加
		
	startImage.addEventListener(Event.TOUCH_START, function(e) { // シーンにタッチイベントを設定
				
		global.game.replaceScene( createGameScene() );
	});
	return scene;
};


/*
 *　ゲームオーバー
 */
var createGameoverScene = function() {
	var scene = new Scene();
	
	//global.game.replaceScene();
	
	var overlayElm             = document.getElementById( 'overlay' );
	var shareScoreOverlayElm   = document.getElementById( 'shareScoreOverlay' );
	var shareScoreCloseElm     = document.getElementById( 'shareScoreClose' );
	
	var scoreTextElm           = document.getElementById( 'scoreText' );
	
	var twitterShareButtonElm  = document.getElementById( 'twitterShareButton' );
	var facebookShareButtonElm = document.getElementById( 'facebookShareButton' );
	
	
	shareScoreOverlayElm.style.display = 'block';
	overlayElm.style.display           = 'block';
	scoreTextElm			   = 'block';
	
	twitterShareButtonElm.onclick = function ( event ) {
		var postMessage = encodeURIComponent( 'おめでとう<br>あなたは' + document.getElementById( 'global.score' ).value + 'ポイントでメンテナンスに成功した！<br>SNSでみんなに自慢しよう！' );
		window.open( 'https://twitter.com/intent/tweet?hashtags=picomon&original_referer=http%3A%2F%2F404.picomon.jp%2F&text=' + postMessage + '&tw_p=tweetbutton&url=http%3A%2F%2F404.picomon.jp%2F&related=picomon_jp', null, 'width=400,height=300' );
	};
	
	facebookShareButtonElm.onclick = function ( event ) {
		var a = function() {
			window.open(
				'https://www.facebook.com/sharer.php?src=bm&v=4&i=1374645413&u='
				+ encodeURIComponent( location.href )
				+ '&t=' + encodeURIComponent( 'おめでとう<br>あなたは' + document.getElementById( 'scoreInput' ).value + 'ポイントでメンテナンスに成功した！<br>SNSでみんなに自慢しよう！' ),
				'sharer',
				'toolbar=0,status=0,resizable=1,width=626,height=436'
				);
		};
		if ( /Firefox/.test( navigator.userAgent ) ) {
			setTimeout( a, 0 );
		} else {
			a();
		}
	};

	

	return scene;
};
