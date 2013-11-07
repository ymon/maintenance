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
		
		//global.game.replaceScene( createGameoverScene() );
	});
	return scene;
};


/*
 *　ゲームオーバー
 */

var state = 1;

var createGameoverScene = function() {
	var scene = new Scene();
	
	//global.game.end(seane, );
	
	//global.game.replaceScene();
	
	/*end: function(score, result) {
	        this.pushScene(this.endScene);
	        if (location.hostname == 'r.jsgames.jp') {
		var submit = function() {
                var id = location.pathname.match(/^\/games\/(\d+)/)[1]; 
                location.replace([
                    'http://9leap.net/games/', id, '/result',
                    '?score=', encodeURIComponent(score),
                    '&result=', encodeURIComponent(result)
                ].join(''));
            }
            this.endScene.addEventListener('touchend', submit);
            window.setTimeout(submit, 3000);
        }*/
    //}
	
	
	
	
	
	
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
		if ( state == 2 ) {
		var postMessageFailed = encodeURIComponent( '残念！<br>あなたは' + document.getElementById( 'global.score' ).value + 'ポイントでメンテナンスに失敗してしまいました！<br>SNSでみんなに自慢しよう！' );
		window.open( 'https://twitter.com/intent/tweet?hashtags=picomon&original_referer=http%3A%2F%2F404.picomon.jp%2F&text=' + postMessage + '&tw_p=tweetbutton&url=http%3A%2F%2F404.picomon.jp%2F&related=picomon_jp', null, 'width=400,height=300' );
		} else if ( global.player.state == 1 ) {
		var postMessageClear = encodeURIComponent( 'おめでとう！<br>あなたは' + document.getElementById( 'global.score' ).value + 'ポイントでメンテナンスに成功した！<br>SNSでみんなに自慢しよう！' );
		window.open( 'https://twitter.com/intent/tweet?hashtags=picomon&original_referer=http%3A%2F%2F404.picomon.jp%2F&text=' + postMessage + '&tw_p=tweetbutton&url=http%3A%2F%2F404.picomon.jp%2F&related=picomon_jp', null, 'width=400,height=300' );
		} else {}
	};
	
	facebookShareButtonElm.onclick = function ( event ) {
		var a = function() {
			if ( state == 2 ) {
			window.open(
				'https://www.facebook.com/sharer.php?src=bm&v=4&i=1374645413&u='
				+ encodeURIComponent( location.href )
				+ '&t=' + encodeURIComponent( '残念<br>あなたは' + document.getElementById( 'scoreInput' ).value + 'ポイントでメンテナンスに失敗してしまいました！<br>SNSでみんなに自慢しよう！' ),
				'sharer',
				'toolbar=0,status=0,resizable=1,width=626,height=436'
				);
			} else if ( state == 1 ) {
			window.open(
				'https://www.facebook.com/sharer.php?src=bm&v=4&i=1374645413&u='
				+ encodeURIComponent( location.href )
				+ '&t=' + encodeURIComponent( 'おめでとう<br>あなたは' + document.getElementById( 'scoreInput' ).value + 'ポイントでメンテナンスに成功した！<br>SNSでみんなに自慢しよう！' ),
				'sharer',
				'toolbar=0,status=0,resizable=1,width=626,height=436'
				);				
			} else{}
			
			
		};
		if ( /Firefox/.test( navigator.userAgent ) ) {
			setTimeout( a, 0 );
		} else {
			a();
		}
	};

	

	return scene;
};
