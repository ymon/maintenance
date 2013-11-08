
enchant();

/*
 * 定数
 */
//var DEBUG = 1;

var SOUND_BGM   = "./sounds/mp3/bgm.mp3|./sounds/ogg/bgm.ogg";
var SOUND_CLEAR = "./sounds/mp3/clear.mp3|./sounds/ogg/clear.ogg";
var SOUND_DEAD  = "./sounds/mp3/dead.mp3|./sounds/ogg/dead.ogg";
var SOUND_ITEM  = "./sounds/mp3/item.mp3|./sounds/ogg/item.ogg";
var SOUND_JUMP  = "./sounds/mp3/jump.mp3|./sounds/ogg/jump.ogg";
var SOUND_START = "./sounds/mp3/start.mp3|./sounds/ogg/start.ogg";

var IMAGE_PLAYER           = "./img/panda.png";
var IMAGE_FOUNDER_KASHIMA  = "./img/img_founder_kashima.png";
var IMAGE_FOUNDER_KITAZAWA = "./img/img_founder_kitazawa.png";
var IMAGE_FOUNDER_OHMAE    = "./img/img_founder_ohmae.png";
var IMAGE_ITEM1            = "./img/img_item01.png";
var IMAGE_ITEM2            = "./img/img_item02.png";
var IMAGE_ITEM3            = "./img/img_item03.png";
var IMAGE_ITEM4            = "./img/img_item04.png";
var IMAGE_ITEM5            = "./img/img_item05.png";
var IMAGE_WALL1            = "./img/img_barrier01.png";
var IMAGE_WALL2            = "./img/img_barrier02.png";
var IMAGE_WALL3            = "./img/img_barrier03.png";
var IMAGE_BACKGROUND1      = "./img/img_back1.png";
var IMAGE_BACKGROUND2      = "./img/img_back2.png";
var IMAGE_BACKGROUND3      = "./img/img_back3.png";
var IMAGE_BACKGROUND4      = "./img/img_back4.png";
var IMAGE_PROGRESS_PANDA   = "./img/img_progress_panda.png";
var IMAGE_PROGRESS_BAR     = "./img/img_progress_bar.png";
var IMAGE_PROGRESS_BACK    = "./img/img_progress02.png";
var IMAGE_PROGRESS_BOX     = "./img/img_bubble.png";
var IMAGE_START            = "./img/img_start.png";
var ASSETS = [
	IMAGE_PLAYER,
	IMAGE_FOUNDER_KASHIMA,
	IMAGE_FOUNDER_KITAZAWA,
	IMAGE_FOUNDER_OHMAE,
	IMAGE_WALL1,
	IMAGE_WALL2,
	IMAGE_WALL3,
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
var SCREEN_WIDTH      = 960;		// スクリーン幅
var SCREEN_HEIGHT     = 640;		// スクリーン高さ
var BACKGROUND_WIDTH  = 960 * 3;	// 背景幅
var BACKGROUND_HEIGHT = 640;		// 背景高さ
var BACKGROUND_COLLOR = "#000";		// 背景色
var GAME_SPEED        = 6;			// ゲーム全体のスピード
var GAME_FPS          = 24;			// Frame / Sec
var GAME_TIME_LIMIT   = GAME_FPS * 80;

// グローバル変数定義
var global = {
	game     : null,
	player   : null,
	sound    : null,
	score    : 0,
	founder  : 0,
	progress : 0,
	keybindFlag : true
};

/*
 * 汎用処理
 */
// ランダム値生成
var randfloat = function( min, max ) {
    return Math.random() * ( max - min ) + min;
};

var randInt = function( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

var debug = {
	isDebug : function() {
		return typeof DEBUG != "undefined";
	},
	log : function( string ){
		if ( this.isDebug() ) {
			console.log( string );
		}
	}
}

window.onload = function() {
	gameInit();
};

var gameInit = function() {

	var queue = new createjs.LoadQueue( true );
	queue.installPlugin( createjs.Sound );

	var manifest = [
	 	{ "src" : SOUND_BGM,   "id" : "bgm"},
	 	{ "src" : SOUND_CLEAR, "id" : "clear"},
	 	{ "src" : SOUND_DEAD,  "id" : "dead" },
	 	{ "src" : SOUND_JUMP,  "id" : "jump" },
	 	{ "src" : SOUND_ITEM,  "id" : "item" },
	 	{ "src" : SOUND_START, "id" : "start" }
	];
	queue.loadManifest( manifest, true );
	queue.addEventListener('complete', gameStart );
/* 
	function handleFileLoad(event){
		var item = event.item;
		var type = item.type;
		if(createjs.LoadQueue.SOUND === type){
			startSound(item.id);
		}
	}
*/
};

var gameStart = function() {

	// ゲーム準備
	global.game = new Game( SCREEN_WIDTH, SCREEN_HEIGHT );
	global.game.preload( ASSETS );
	global.game.fps = GAME_FPS;
	global.game.onload = function() {
		global.game.replaceScene( createTitleScene() );
//		global.game.replaceScene( createGameScene() );
	};

	// 音声ファイルのインスタンスを作成
	createjs.Sound.createInstance("bgm").play( "none", 0, -1 );

	debug.log( "game start" );
	global.game.start();

};
/*
	function setupSound () {
		var isSound        = getCookie( 'sound' );
		var soundElm       = document.getElementById( 'sound' );
		var switchSoundElm = document.getElementById( 'switchSound' );
		soundElm.onclick = function ( event ) {
			if ( soundElm.getAttribute( 'data-status' ) === 'on' ) {
				setCookie( 'sound', 'off', 1, '/', 1 );
				createjs.Sound.setMute( true );
				soundElm.setAttribute( 'data-status', 'off' );
				switchSoundElm.checked = false;
				return false;
			}
			setCookie( 'sound', 'on', 1, '/', 1 );
			createjs.Sound.setMute( false );
			soundElm.setAttribute( 'data-status', 'on' );
			switchSoundElm.checked = true;
			return false;
		};
		if ( isSound === null || isSound === 'on' ) {
			createjs.Sound.setMute( false );
			soundElm.setAttribute( 'data-status', 'on' );
			switchSoundElm.checked = true;
		} else if ( isSound === 'off' ) {
			createjs.Sound.setMute( true );
			soundElm.setAttribute( 'data-status', 'off' );
			switchSoundElm.checked = false;
		}
	}
*/
