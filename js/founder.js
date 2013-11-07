var FOUNDER_WIDTH  = 81;    // 幅
var FOUNDER_HEIGHT = 140;   // 高さ
var FOUNDER_POS_Y  = PLAYER_POS_Y - 50;


var FounderPet = Class.create( Sprite, {
    initialize : function() {
		Sprite.call( this, FOUNDER_WIDTH, FOUNDER_HEIGHT );
		this.moveTo( -300, -300 );
		this.frame = 0;
		this.framecount = 0;
		this.exist = false;
		this.position = 0;
	},
	onenterframe : function() {
		this.framecount = ++this.framecount % 12;
		this.frame = ( this.framecount < 6 ) ? 0 : 1;
		if ( this.y != PLAYER_POS_Y ) this.frame += 2;
	},
	insert : function( position ) {
		this.exist = true;
		this.position = position;
		this.moveTo( PLAYER_POS_X - 100 * this.position, -200 );
		this.tl.moveBy( 0, FOUNDER_POS_Y + 200, 30, enchant.Easing.CUBIC_EASEIN );
	},
	jump : function() {
		this.tl.moveBy( 0, 0, this.position * 10 , enchant.Easing.CUBIC_EASEIN )
			   .moveBy( 0, -1 * PLAYER_JUMP, PLAYER_JUMP_TIME, enchant.Easing.CUBIC_EASEOUT )
			   .moveBy( 0, PLAYER_JUMP, PLAYER_JUMP_TIME, enchant.Easing.CUBIC_EASEIN );
	},
	isJump : function() {
		return this.y != FOUNDER_POS_Y;
	}
});

var KashimaPet = Class.create( FounderPet, {
	initialize : function() {
		FounderPet.call( this );
		this.image = global.game.assets[ IMAGE_FOUNDER_KASHIMA ];
	}
});

var KitazawaPet = Class.create( FounderPet, {
	initialize : function() {
		FounderPet.call( this );
		this.image = global.game.assets[ IMAGE_FOUNDER_KITAZAWA ];
	}
});

var OhmaePet = Class.create( FounderPet, {
	initialize : function() {
		FounderPet.call( this );
		this.image = global.game.assets[ IMAGE_FOUNDER_OHMAE ];
	}
});
