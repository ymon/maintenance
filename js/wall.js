var WALL1_WIDTH     = 58;
var WALL1_HEIGHT    = 58;
var WALL_HIT_LENGTH = 58;
var WALL2_WIDTH     = 81;
var WALL2_HEIGHT    = 67;

/*
item 58 58
barrier 58 58 (corn)
81 67
*/

var Wall = Class.create(Sprite, {
    // 初期化処理
    initialize: function( width, height ) {
        Sprite.call( this, width, height );
    },
    // 更新処理
    onenterframe: function() {
    	// 移動
    	this.x -= GAME_SPEED;

    	// フレームアニメーション

        // 衝突判定
        if ( this.within( global.player, WALL_HIT_LENGTH ) ) {
        	// TODO ゲームオーバー処理
            console.log( "HIT!" );
        }

        // 削除処理
        if ( this.x < -100 ) {
            this.parentNode.removeChild( this );
        }
    },
    // ヒット時処理
    onhit: function( e ) {
        console.log( "hit!" );
    }
});


// sample of Wall object.

var Wall1 = Class.create( Wall, {
	initialize: function() {
		Wall.call( this, WALL1_WIDTH, WALL1_HEIGHT );
        this.image = global.game.assets[ IMAGE_WALL1 ];
	}
});

var Wall2 = Class.create( Wall, {
    initialize: function() {
        Wall.call( this, WALL2_WIDTH, WALL2_HEIGHT );
        this.image = global.game.assets[ IMAGE_WALL2 ];
    }
});
