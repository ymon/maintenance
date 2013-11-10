/*
 *　タイトル
 */
var createTitleScene = function() {

	// BGMを無限ループ再生
	global.sound.bgm.play( "none", 0, 0, -1 );

	var scene = new Scene();
	scene.backgroundColor = BACKGROUND_COLLOR; // シーンの背景色を設定

	var startImage = new Sprite( SCREEN_WIDTH, SCREEN_HEIGHT ); //スタート画像のスプライト	
	startImage.image = global.game.assets[ IMAGE_START ];
	startImage.addEventListener( Event.TOUCH_START, function(e) { // シーンにタッチイベントを設定
		global.game.replaceScene( createGameScene() );
	});
	scene.addChild(startImage); // シーンにスプライトに追加

	return scene;

};

/*
 *　ゲームオーバー
 */

var createGameoverScene = function() {

	var SUCCESS = 3;
	var FAILD   = 2;

	var overlayElm             = document.getElementById( 'overlay' );
	var scoreTextElm           = document.getElementById( 'scoreText' );
	var replayButton           = document.getElementById( 'replaybutton' );
	var shareScoreCloseElm     = document.getElementById( 'shareScoreClose' );
	var shareScoreOverlayElm   = document.getElementById( 'shareScoreOverlay' );
	var twitterShareButtonElm  = document.getElementById( 'twitterShareButton' );
	var facebookShareButtonElm = document.getElementById( 'facebookShareButton' );
	
	var textMessageSuccess = '<p>おめでとう！<br>あなたは' + global.score + 'ポイントでメンテナンスに成功しました！<br>SNSでみんなに自慢しよう！</p>';
	var textMassageFaild   = '<p>残念！<br>あなたは' + global.score + 'ポイントでメンテナンスに失敗しました！<br>SNSでみんなに報告しよう！</p>';
	var postMessageSuccess = 'おめでとう！あなたは' + global.score + 'ポイントでメンテナンスに成功しました！SNSでみんなに自慢しよう！';
	var postMessageFaild   = '残念！あなたは' + global.score + 'ポイントでメンテナンスに失敗しました！SNSでみんなに報告しよう！';

	$('#overlay').show();
	$('#shareScoreOverlay').show();
	$('#shareScoreClose').show();
	replayButton.onclick = function() { closeMessageAndReplayGame(); }
	shareScoreCloseElm.onclick = function() { closeMessageAndReplayGame(); }

	switch ( global.player.state ) {
		case SUCCESS:
			$('.scoreText').html( textMessageSuccess );
			twitterShareButtonElm.onclick  = function() { openTweetPostWindow( postMessageSuccess ); }
			facebookShareButtonElm.onclick = function() { openFacebookPostWindow( postMessageSuccess ); }
			break;
		case FAILD:
			$('.scoreText').html( textMassageFaild );
			twitterShareButtonElm.onclick  = function() { openTweetPostWindow( postMessageFaild ); }
			facebookShareButtonElm.onclick = function() { openFacebookPostWindow( postMessageFaild ); }
			break;
		default:
			throw "GameStateError state:" + global.player.state;
			break;
	}
	

	var openTweetPostWindow = function( mes ){
		window.open(
			'https://twitter.com/intent/tweet?hashtags=picomon&original_referer=http%3A%2F%2Fmaintenance.picomon.jp%2F&text='
			+ mes
			+ '&tw_p=tweetbutton&url=http%3A%2F%2Fmaintenance.picomon.jp%2F&related=picomon_jp', null, 'width=400,height=300'
		);
	};

	var openFacebookPostWindow = function( mes ) {
		var func = function() {
			window.open(
				'https://www.facebook.com/sharer.php?src=bm&v=4&i=1374645413&u='
				+ encodeURIComponent( location.href )
				+ '&t=' + encodeURIComponent( mes ),
				'sharer',
				'toolbar=0,status=0,resizable=1,width=626,height=436'
			);
		};
		if ( /Firefox/.test( navigator.userAgent ) ) {
			setTimeout( func, 0 );
		} else {
			func();
		}
	};

	var closeMessageAndReplayGame = function () {
		overlayElm.style.display = 'none';
		shareScoreOverlayElm.style.display = 'none';
		global.game.replaceScene( createTitleScene() );
	};

};
