
	// 進捗バー（しましま）を表示
    var ProgressBack = Class.create( Sprite, {
        initialize : function(){
            Sprite.call( this, 423, 33 )
            this.image = global.game.assets[ IMAGE_PROGRESS_BACK ];
            this.frame = 0;
            this.framecount = 0;
            this.moveTo( 510, 570 );
        },
        onenterframe : function() {
            this.framecount = ++this.framecount % 10;
            this.frame = Math.floor( this.framecount / 2 );
        },
    });

    // 進捗バー（パンダ）を表示
    var ProgressPanda = Class.create( Sprite, {
        initialize : function(){
            Sprite.call( this, 70, 53 );
            this.image = global.game.assets[ IMAGE_PROGRESS_PANDA ];
            this.frame = 0;
            this.framecount = 0;
            this.moveTo( 510, 570 - 15 );
        },
        onenterframe : function() {
            this.framecount = ++this.framecount % 10;
            this.frame = Math.floor( this.framecount / 5 );
            this.moveTo( 510 + Math.floor( global.progress * 293 ), 570 - 15 );
        }
    });

    // 進捗バーを表示
    var ProgressBar = Class.create( Sprite, {
        initialize : function() {
            Sprite.call( this, 1, 53 );
            this.image = global.game.assets[ IMAGE_PROGRESS_BAR ];
            this.frame = 0;
            this.moveTo( 510, 570 - 15 );
        },
        onenterframe : function() {
            this.image = global.game.assets[ IMAGE_PROGRESS_BAR ];
            this.scale( 1, 1 );
            this.scale( Math.floor( game.global.progress * 293 ) + 1, 1);
        }
    });

    // 進捗ふきだしを作成   
    var ProgressBox = Class.create( Sprite, {
        initialize : function() {
            Sprite.call( this, 233, 82 );
            this.image = global.game.assets[IMAGE_PROGRESS_BOX ];
            this.frame = 0;
            this.moveTo( 705, 490 );
        }

    });

