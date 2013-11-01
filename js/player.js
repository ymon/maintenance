var PLAYER_WIDTH     = 90;   // 幅
var PLAYER_HEIGHT    = 90;   // 高さ
var PLAYER_JUMP      = 150;   // ジャンプの高さ
var PLAYER_JUMP_TIME = 18;	 // 滞空時間
var PLAYER_POS_X     = SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2;
var PLAYER_POS_Y     = 360;

var FOUNDER_WIDTH	= 0;
var FOUNDER_HEIGHT	= 0;

var Player = Class.create( Sprite, {
	initialize : function() {
		Sprite.call( this, PLAYER_WIDTH, PLAYER_HEIGHT );
		this.image = global.game.assets[ IMAGE_PLAYER ];
		this.frame = 0;
		this.framecount = 0;
		this.moveTo( PLAYER_POS_X, PLAYER_POS_Y );
	},
	onenterframe : function() {
		this.framecount = ++this.framecount % 12;
		this.frame = ( this.framecount < 6 ) ? 0 : 1;
		if ( this.y != PLAYER_POS_Y ) this.frame += 2;
	},
	jump : function() {
		this.tl.moveBy( 0, -1 * PLAYER_JUMP, PLAYER_JUMP_TIME, enchant.Easing.CUBIC_EASEOUT )
			   .moveBy( 0, PLAYER_JUMP, PLAYER_JUMP_TIME, enchant.Easing.CUBIC_EASEIN );
	},
	isJump : function() {
		return this.y != PLAYER_POS_Y;
	}
});
