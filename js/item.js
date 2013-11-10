
    var ITEM1_WIDTH      = 58;   // ドリンク,ハート幅 
    var ITEM1_HEIGHT     = 58;   // ドリンク,ハート高
    var ITEM2_WIDTH      = 81;   // ファウンダー幅
    var ITEM2_HEIGHT     = 140;   // ファウンダー高さ
    var ITEM1_FRAME      = 40;
    var ITEM2_FRAME      = 40;
    var HEART_POINT	     = 50;  // ハートのポイント
    var HEART_FRAME	     = 29;   // ハートのフレームインデックス
    var DRINK_POINT	     = 100; // ドリンクのポイント
    var DRINK_FRAME      = 64;   // ドリンクのフレームインデックス    
    var FOUNDER_POINT    = 1000; // ファウンダーのポイント
    var FOUNDER_FRAME    = 64;   // ファウンダーのフレームインデックス
    var ITEM_SPEED 		 = GAME_SPEED * -1;
    var ITEM_HIT_LENGTH  = 40;  //アイテムの半径
    var ITEM2_HIT_LENGTH = 70;

/*
 * アイテム
 */
var Item = Class.create(Sprite, {
    // 初期化処理
    initialize: function() {
        Sprite.call( this, ITEM1_WIDTH, ITEM1_HEIGHT );

    },
    // 更新処理
    onenterframe: function() {
        // 移動
	if (global.player.state == 1)
        this.x += ITEM_SPEED;
               
        
        // 衝突判定
        if ( this.within( global.player, ITEM_HIT_LENGTH ) && global.player.state == 1 ) {
            // ヒットイベントを発行する
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }
    },
    // ヒット時処理
    onhit: function() {
        this.parentNode.removeChild(this);
    }
    
});

var Itemfounder = Class.create(Sprite, {
    // 初期化処理
    initialize: function() {
        Sprite.call(this, ITEM2_WIDTH, ITEM2_HEIGHT);
    },
    // 更新処理
    onenterframe: function() {
        // 移動
	if (global.player.state == 1)
        this.x += ITEM_SPEED;
        
        // 衝突判定
        if ( this.within( global.player, ITEM2_HIT_LENGTH)  && global.player.state == 1 ) {
            // ヒットイベントを発行する
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }
        
    }
});



/*
 * ハート
 */
 
var Heart = Class.create(Item, {
    // 初期化処理
    initialize: function() {
        Item.call(this );
        this.frame = HEART_FRAME;
        this.image = global.game.assets[IMAGE_ITEM1];
    },
    // 更新処理
    onhit: function(e) {
        // スコアアップ生成
        Item.call(this)
        global.score += HEART_POINT;
        global.sound.item.play();
    }
});


/*
 * ドリンク
 */
 
var Drink = Class.create(Item, {
    // 初期化処理
    initialize: function() {
	Item.call( this );
        this.image = global.game.assets[IMAGE_ITEM2];
        this.frame = DRINK_FRAME;
    },
    // ヒット時処理
    onhit: function() {        
        Item.call(this);
        global.score += DRINK_POINT;
        global.sound.item.play();
    }
});


/*
 * ファウンダー
 */
    //北澤さんFOUNDER
var Founder1 = Class.create(Itemfounder, {
    // 初期化処理
    initialize: function() {
        Itemfounder.call(this);
    	this.image = global.game.assets[IMAGE_ITEM3];
        this.frame = FOUNDER_FRAME;
    }
});
    //大前さんFOUNDER
var Founder2 = Class.create(Itemfounder, {
    // 初期化処理
    initialize: function() {
        Itemfounder.call(this);
    	this.image = global.game.assets[IMAGE_ITEM4];
        this.frame = FOUNDER_FRAME;
    }
});

    //鹿島さんFOUNDER
var Founder3 = Class.create(Itemfounder, {
    // 初期化処理
    initialize: function() {
        Itemfounder.call(this);
        this.image = global.game.assets[IMAGE_ITEM5];
        this.frame = FOUNDER_FRAME;
    }
});


