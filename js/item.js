enchant();

    var ITEM1_WIDTH      = 58;   // ドリンク,ハート幅 
    var ITEM1_HEIGHT     = 58;   // ドリンク,ハート高
    var ITEM2_WIDTH      = 50;   // ファウンダー幅
    var ITEM2_HEIGHT     = 100;   // ファウンダー高さ
    var ITEM1_FRAME      = 40;
    var ITEM2_FRAME      = 40;
    var HEART_POINT      = 10;  // ハートのポイント
    var HEART_FRAME      = 29;   // ハートのフレームインデックス
    var DRINK_POINT     = 100; // ドリンクのポイント
    var DRINK_FRAME     = 64;   // ドリンクのフレームインデックス    
    var FOUNDER_POINT   = 1000; // ファウンダーのポイント
    var FOUNDER_FRAME   = 64;   // ファウンダーのフレームインデックス
    var ITEM_SPEED = GAME_SPEED * -1;
    var ITEM_HIT_LENGTH = 29;

/*
 * アイテム
 */
var Item = Class.create(Sprite, {
    // 初期化処理
    initialize: function() {
        Sprite.call(this, ITEM1_WIDTH, ITEM1_HEIGHT);
        //this.image = global.game.assets[IMAGE_ITEM1];
    },
    // 更新処理
    onenterframe: function() {
        // 移動
        this.x += ITEM_SPEED;
               
        
        // 衝突判定
        if (this.within(global.player, ITEM_HIT_LENGTH)) {
            // ヒットイベントを発行する
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }
    },
    // ヒット時処理
    onhit: function() {
        this.parentNode.removeChild(this);
    },
        //console.log(e);    
    
});

var Itemfounder = Class.create(Sprite, {
    // 初期化処理
    initialize: function() {
        Sprite.call(this, ITEM2_WIDTH, ITEM2_HEIGHT);
    },
    // 更新処理
    onenterframe: function() {
        // 移動
        this.x += ITEM_SPEED;
        
        // 衝突判定
        if (this.intersect(global.player,ITEM2_WIDTH,ITEM2_HEIGHT - 5)) {
            // ヒットイベントを発行する
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }
        
    },
    // ヒット時処理
    onhit: function() {
        this.parentNode.removeChild(this);
    
    },
});



/*
 * ハート
 */
 
var Heart = Class.create(Item, {
    // 初期化処理
    initialize: function() {
        Item.call(this);
        this.frame = HEART_FRAME;
        this.image = global.game.assets[IMAGE_ITEM1];
    },
    // 更新処理
    onhit: function(e) {
        // スコアアップ生成
        Item.call(this)
    global.score += HEART_POINT;
    
    console.log(global.score);
    },
});


/*
 * ドリンク
 */
 
var Drink = Class.create(Item, {
    // 初期化処理
    initialize: function() {
        Item.call(this);
        this.image = global.game.assets[IMAGE_ITEM2];
        this.frame = DRINK_FRAME;
    },
    // ヒット時処理
    onhit: function() {
        
        Item.call(this);
    global.score += DRINK_POINT;
    
    
    },
});


/*
 * ファウンダー
 */

var Founder = Class.create(Itemfounder, {
    // 初期化処理
    initialize: function() {
        Item.call(this);
        this.frame = FOUNDER_FRAME;
    },
    // ヒット時処理
    onhit: function() {
        
        Item.call(this);
    global.score += FOUNDER_POINT;
    },
});



//ハートとドリンクの取得
var Item1 = Class.create(Item, {
	initialize: function() {
        //Item.call(this, ITEM1_WIDTH, ITEM1_HEIGHT);
        //this.frame = ITEM1_FRAME;
        if ((randfloat(0, 2) | 0) == 0 ) {
        this.image = global.game.assets[IMAGE_ITEM1];
        
        } else if ((randfloat(0, 2) | 0) == 1) {
           this.image = global.game.assets[IMAGE_ITEM2];
        }else {}
        
    }
});

    //ファウンダー画像の取得
var Item2 = Class.create(Itemfounder, {
	initialize: function() {
        //Item.call(this, ITEM2_WIDTH, ITEM2_HEIGHT);
        //this.frame = ITEM2_FRAME;
        this.image = global.game.assets[IMAGE_ITEM3];
        this.image = global.game.assets[IMAGE_ITEM4];
        this.image = global.game.assets[IMAGE_ITEM5];
        
	}
});

