var FOUNDER_WIDTH  = 81;    // 幅
var FOUNDER_HEIGHT = 140;   // 高さ
var FOUNDER_POS_Y  = PLAYER_POS_Y - 50;


Founder = Class.create(Sprite, { //自作クラスBearの定義
	initialize:function(){ //クラスの初期化(コンストラクタ)
		Sprite.call(this,81,140); //スプライトの初期化
		this.image = game.assets[ IMAGE_FOUNDER_KASHIMA ]; //画像の指定
		this.moveTo( 300, 300 );
	}
});