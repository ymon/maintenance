enchant();

    var ITEM1_WIDTH		= 58;   // ドリンク,ハート幅 
    var ITEM1_HEIGHT		= 58;   // ドリンク,ハート高
    var ITEM2_WIDTH		= 50;   // ファウンダー幅
    var ITEM2_HEIGHT		= 100;   // ファウンダー高さ
    var ITEM1_FRAME		= 40;
    var ITEM2_FRAME		= 40;
    var HEART_POINT		= 50;  // ハートのポイント
    var HEART_FRAME		= 29;   // ハートのフレームインデックス
    var DRINK_POINT  	   	= 100; // ドリンクのポイント
    var DRINK_FRAME  	   	= 64;   // ドリンクのフレームインデックス    
    var FOUNDER_POINT		= 1000; // ファウンダーのポイント
    var ITEM_SPEED 		= GAME_SPEED;
    var FOUNDER_FRAME		= 64;   // ファウンダーのフレームインデックス
    var ITEM_HIT_LENGTH		= 42;  //アイテムの半径
    var ITEM_HIT_LENGTH		= 75;

/*
 * アイテム
 */
var Item = Class.create(Sprite, {
    // 初期化処理
    initialize: function() {
        Sprite.call( this, ITEM1_WIDTH, ITEM1_HEIGHT);
    },
    // 更新処理
    onenterframe: function() {
        // 移動

        this.x -= ITEM_SPEED;
               
        
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
    }
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
        this.x -= ITEM_SPEED;
	console.log('ファウンダー');
        
        // 衝突判定
        if (this.within( global.player, ITEM_HIT_LENGTH )) {
            // ヒットイベントを発行する
	    console.log('hitif');
            var e = new enchant.Event("hit");
            this.dispatchEvent(e);
        }
        
    },
    // ヒット時処理
    onhit: function() {
        this.parentNode.removeChild(this);
	console.log('hitonhit');
    
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
    
    console.log(global.score);
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
	console.log('ふぁうんだー');
    },
    // ヒット時処理
    onhit: function() {
	this.parentNode.removeChild(this);
        Item.call(this);
	global.score += FOUNDER_POINT;
	global.founder = global.founder + 2;
    }
});
    //大前さんFOUNDER
var Founder2 = Class.create(Itemfounder, {
    // 初期化処理
    initialize: function() {
        Itemfounder.call(this);
	global.game.assets[IMAGE_ITEM4];
        this.frame = FOUNDER_FRAME;
    },
    // ヒット時処理
    onhit: function() {
        
        Item.call(this);
    global.score += FOUNDER_POINT;
    global.founder = global.founder + 4;
    }
});

    //鹿島さんFOUNDER
var Founder3 = Class.create(Itemfounder, {
    // 初期化処理
    initialize: function() {
        Itemfounder.call(this);
	global.game.assets[IMAGE_ITEM5];
        this.frame = FOUNDER_FRAME;
    },
    // ヒット時処理
    onhit: function() {
        
        Item.call(this);
    global.score += FOUNDER_POINT;
    global.founder = global.founder + 1;
    }
});



//ハートとドリンクの取得
/*var Item1 = Class.create(Item, {
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
	if (Math.floor(global.progress * 100) == 25 ) {
	    this.image = global.game.assets[IMAGE_ITEM3];
	    console.log('ふぁうんだー読む');
	} else if ( Math.floor(global.progress * 100) == 50 ) {
	    this.image = global.game.assets[IMAGE_ITEM4];
	} else if ( Math.floor(global.progress * 100) == 75 ) {
	    this.image = global.game.assets[IMAGE_ITEM5];
	} else {}
	}
});*/

