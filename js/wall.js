var WALL1_WIDTH     = 58;
var WALL1_HEIGHT    = 58;
var WALL1_HIT_LENGTH = 50;
var WALL2_WIDTH     = 81;
var WALL2_HEIGHT    = 67;
var WALL2_HIT_LENGTH = 58;
var WALL3_WIDTH     = 58;
var WALL3_HEIGHT    = 58;
var WALL3_HIT_LENGTH = 50;

/*
item 58 58
barrier 58 58 (corn)
81 67
*/

var Wall = Class.create( Sprite, {
    // 初期化処理
    initialize : function( width, height ) {
        Sprite.call( this, width, height );
    },
    // 更新処理
    onenterframe: function() {

    	// 移動
        if (global.player.state == 1)
        	this.x -= GAME_SPEED;

        // 衝突判定
        if ( this.within( global.player, WALL1_HIT_LENGTH ) ) {
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }

        // 削除処理
        if ( this.x < -100 ) {
            this.parentNode.removeChild( this );
        }
    },
    // ヒット時処理
    onhit: function( e ) {
        global.player.state = 2;
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

var Wall3 = Class.create( Wall, {
    initialize: function() {
        Wall.call( this, WALL3_WIDTH, WALL3_HEIGHT );
        this.image = global.game.assets[ IMAGE_WALL3 ];
    },
    onenterframe: function() {

        // 移動
        this.x -= GAME_SPEED * 2;   
        this.rotate(-8);

        // 衝突判定
        if ( this.within( global.player, WALL3_HIT_LENGTH ) ) {
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }

        // 削除処理
        if ( this.x < -100 ) {
            this.parentNode.removeChild( this );
        }
    }
});
