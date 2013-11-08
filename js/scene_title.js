/*
 *　タイトル
 */
var createTitleScene = function() {
	var scene = new Scene();
		
	//scene.backgroundColor = BACKGROUND_COLLOR;      // シーンの背景色を設定
		
	var startImage = new Sprite( SCREEN_WIDTH, SCREEN_HEIGHT );  //スタート画像のスプライト
		
	startImage.image = global.game.assets[ IMAGE_START ];  

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
	
	var overlayElm             = document.getElementById( 'overlay' );
	var shareScoreOverlayElm   = document.getElementById( 'shareScoreOverlay' );
	var shareScoreCloseElm     = document.getElementById( 'shareScoreClose' );
	
	var scoreTextElm           = document.getElementById( 'scoreText' );
	
	var twitterShareButtonElm  = document.getElementById( 'twitterShareButton' );
	var facebookShareButtonElm = document.getElementById( 'facebookShareButton' );
	
	var replayButton = document.getElementById('replaybutton');
	
	
	$('#overlay').show();
	$('#shareScoreOverlay').show();
	$('#shareScoreClose').show();
	$('.scoreText').html('<p>残念！<br>あなたは' + global.score + 'ポイントでメンテナンスに失敗しました！<br>SNSでみんなに報告しよう！</p>');

	
	shareScoreCloseElm.onclick = function ( event ) {
		overlayElm.style.display = 'none';
		shareScoreOverlayElm.style.display = 'none';
		global.game.replaceScene( createTitleScene() );
	};

	var postMessageFalse	= '残念！あなたは' + global.score + 'ポイントでメンテナンスに失敗しました！SNSでみんなに報告しよう！';
	var postMessageTrue	= 'おめでとう！あなたは' + global.score + 'ポイントでメンテナンスに成功しました！SNSでみんなに自慢しよう！';
	
	
	twitterShareButtonElm.onclick = function ( event ) {
		if ( global.player.state == 2 ) {
		$('.scoreText').html('<p>残念！<br>あなたは' + global.score + 'ポイントでメンテナンスに失敗しました！<br>SNSでみんなに報告しよう！</p>');
		window.open( 'https://twitter.com/intent/tweet?hashtags=picomon&original_referer=http%3A%2F%2F404.picomon.jp%2F&text=' + postMessageFalse + '&tw_p=tweetbutton&url=http%3A%2F%2Fmaintenance.picomon.jp%2F&related=picomon_jp', null, 'width=400,height=300' );
		} else if ( global.player.state == 1 ) {
		$('.scoreText').html('<p>おめでとう！<br>あなたは' + global.score + 'ポイントでメンテナンスに成功しました！<br>SNSでみんなに自慢しよう！</p>');
		window.open( 'https://twitter.com/intent/tweet?hashtags=picomon&original_referer=http%3A%2F%2Fmaintenance.picomon.jp%2F&text=' + postMessageTrue + '&tw_p=tweetbutton&url=http%3A%2F%2Fmaintenance.picomon.jp%2F&related=picomon_jp', null, 'width=400,height=300' );
		} else {}
	};
	
	facebookShareButtonElm.onclick = function ( event ) {
		var a = function() {
			console.log('click');
			if ( global.player.state == 2 ) {
			window.open(
				'https://www.facebook.com/sharer.php?src=bm&v=4&i=1374645413&u='
				+ encodeURIComponent( location.href )
				+ '&t=' + encodeURIComponent( postMessageFalse ),
				'sharer',
				'toolbar=0,status=0,resizable=1,width=626,height=436'
				);
			} else if ( global.player.state == 1 ) {
			window.open(
				'https://www.facebook.com/sharer.php?src=bm&v=4&i=1374645413&u='
				+ encodeURIComponent( location.href )
				+ '&t=' + encodeURIComponent( postMessageTrue ),
				'sharer',
				'toolbar=0,status=0,resizable=1,width=626,height=436'
				);				
			}
		}
		if ( /Firefox/.test( navigator.userAgent ) ) {
			setTimeout( a, 0 );
		} else {
			a();
		}
	};
	
	replayButton.onclick = function (event) {
		overlayElm.style.display = 'none';
		shareScoreOverlayElm.style.display = 'none';
		global.game.replaceScene( createTitleScene() );
	}

	

};
