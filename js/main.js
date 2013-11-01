
enchant();

/*
 * 定数
 */
var IMAGE_PLAYER         = "./img/panda.png";
var IMAGE_ITEM1          = "./img/img_item01.png";
var IMAGE_ITEM2          = "./img/img_item02.png";
var IMAGE_ITEM3          = "./img/img_item03.png";
var IMAGE_ITEM4          = "./img/img_item04.png";
var IMAGE_ITEM5          = "./img/img_item05.png";
var IMAGE_WALL1          = "./img/img_barrier01.png";
var IMAGE_WALL2          = "./img/img_barrier02.png";
var IMAGE_BACKGROUND1    = "./img/img_back1.png";
var IMAGE_BACKGROUND2    = "./img/img_back2.png";
var IMAGE_BACKGROUND3    = "./img/img_back3.png";
var IMAGE_BACKGROUND4    = "./img/img_back4.png";
var IMAGE_PROGRESS_PANDA = "./img/img_progress_panda.png";
var IMAGE_PROGRESS_BAR   = "./img/img_progress_bar.png";
var IMAGE_PROGRESS_BACK  = "./img/img_progress02.png";
var IMAGE_PROGRESS_BOX   = "./img/img_bubble.png";
var IMAGE_START          = "./img/img_start.png";
var ASSETS = [
	IMAGE_PLAYER,
	IMAGE_WALL1,
	IMAGE_WALL2,
	IMAGE_ITEM1,
	IMAGE_ITEM2,
	IMAGE_ITEM3,
	IMAGE_ITEM4,
	IMAGE_ITEM5,
	IMAGE_BACKGROUND1,
	IMAGE_BACKGROUND2,
	IMAGE_BACKGROUND3,
	IMAGE_BACKGROUND4,
	IMAGE_PROGRESS_PANDA,
	IMAGE_PROGRESS_BAR,
	IMAGE_PROGRESS_BACK,
	IMAGE_PROGRESS_BOX,
	IMAGE_START

];
//var IMAGE_= "";
var SCREEN_WIDTH		= 960;		// スクリーン幅
var SCREEN_HEIGHT		= 640;		// スクリーン高さ
var BACKGROUND_WIDTH	= 960 * 3;		// 背景幅
var BACKGROUND_HEIGHT 	= 640;		// 背景高さ
var BACKGROUND_COLLOR 	= "#000";	// 背景色
var GAME_SPEED			= 6;		// ゲーム全体のスピード
var GAME_FPS			= 24;		// Frame / Sec
var GAME_TIME_LIMIT		= GAME_FPS * 80;

// グローバル変数定義
var global = {
	game		: null,
	player		: null,
	score		: null,
	founder		: 0
};

/*
 * 汎用処理
 */
// ランダム値生成
var randfloat = function( min, max ) {
    return Math.random() * ( max - min ) + min;
};

window.onload = function() {
	global.game = new Game( SCREEN_WIDTH, SCREEN_HEIGHT );
	global.game.preload( ASSETS );
	global.game.fps = GAME_FPS;

	global.game.onload = function() {
//		global.game.replaceScene( createTitleScene() );
		global.game.replaceScene( createGameScene() );
	};

	console.log( "game start" );
	global.game.start();

};
